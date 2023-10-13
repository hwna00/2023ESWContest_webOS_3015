/*
 * WebSocketClientSocketIO.ino
 *
 *  Created on: 06.06.2016
 *
 */

#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ArduinoJson.h>

#include <WebSocketsClient.h>
#include <SocketIOclient.h>

#include <Hash.h>
#include <Adafruit_MLX90614.h>
#include <MAX3010x.h>
#include "filters.h"
ESP8266WiFiMulti WiFiMulti;
SocketIOclient socketIO;
Adafruit_MLX90614 mlx = Adafruit_MLX90614();
MAX30102 sensor;
const auto kSamplingRate = sensor.SAMPLING_RATE_400SPS;
const float kSamplingFrequency = 400.0;

// Finger Detection Threshold and Cooldown
const unsigned long kFingerThreshold = 10000;
const unsigned int kFingerCooldownMs = 500;

// Edge Detection Threshold (decrease for MAX30100)
const float kEdgeThreshold = -2000.0;

// Filters
const float kLowPassCutoff = 5.0;
const float kHighPassCutoff = 0.5;

// Averaging
const bool kEnableAveraging = true;
const int kAveragingSamples = 50;
const int kSampleThreshold = 5;
HighPassFilter high_pass_filter(kHighPassCutoff, kSamplingFrequency);
LowPassFilter low_pass_filter(kLowPassCutoff, kSamplingFrequency);
Differentiator differentiator(kSamplingFrequency);
MovingAverageFilter<kAveragingSamples> averager;

// Timestamp of the last heartbeat
long last_heartbeat = 0;

// Timestamp for finger detection
long finger_timestamp = 0;
bool finger_detected = false;

// Last diff to detect zero crossing
float last_diff = NAN;
bool crossed = false;
long crossed_time = 0;
#define USE_SERIAL Serial
String readTempC(){
  return String(mlx.readObjectTempC());
}
String readBPM(){
  while(1){
    auto sample = sensor.readSample(1000);
    float current_value = sample.red;
    if(sample.red > kFingerThreshold) {
      if(millis() - finger_timestamp > kFingerCooldownMs) {
        //finger_detected = true;
      }
    }
    else {
      // Reset values if the finger is removed
      differentiator.reset();
      averager.reset();
      low_pass_filter.reset();
      high_pass_filter.reset();
      
      //finger_detected = false;
      finger_timestamp = millis();
      USE_SERIAL.println("reseting ~~ wait plz");
      continue;
    }
    current_value = low_pass_filter.process(current_value);
    current_value = high_pass_filter.process(current_value);
    float current_diff = differentiator.process(current_value);

    // Valid values?
    if(!isnan(current_diff) && !isnan(last_diff)) {
      
      // Detect Heartbeat - Zero-Crossing
      if(last_diff > 0 && current_diff < 0) {
        crossed = true;
        crossed_time = millis();
      }
      
      if(current_diff > 0) {
        crossed = false;
      }
  
      // Detect Heartbeat - Falling Edge Threshold
      if(crossed && current_diff < kEdgeThreshold) {
        if(last_heartbeat != 0 && crossed_time - last_heartbeat > 300) {
          // Show Results
          int bpm = 60000/(crossed_time - last_heartbeat);
          if(bpm > 50 && bpm < 250) {
            // Average?
            if(kEnableAveraging) {
              int average_bpm = averager.process(bpm);
  
              // Show if enough samples have been collected
              if(averager.count() > kSampleThreshold) {
                Serial.print("Heart Rate (avg, bpm): ");
                Serial.println(average_bpm);
                return String(average_bpm);
              }
            }
            else {
              Serial.print("Heart Rate (current, bpm): ");
              Serial.println(bpm);  
            }
          }
        }
  
        crossed = false;
        last_heartbeat = crossed_time;
      }
  }
  last_diff = current_diff;
}
void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            USE_SERIAL.printf("[IOc] Disconnected!\n");
            break;
        case sIOtype_CONNECT:
            USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);

            // join default namespace (no auto join in Socket.IO V3)
            socketIO.send(sIOtype_CONNECT, "/");
            break;
        case sIOtype_EVENT:
            USE_SERIAL.printf("[IOc] get event: %s\n", payload);
            break;  
        case sIOtype_ACK:
            USE_SERIAL.printf("[IOc] get ack: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_ERROR:
            USE_SERIAL.printf("[IOc] get error: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_EVENT:
            USE_SERIAL.printf("[IOc] get binary: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_ACK:
            USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
            hexdump(payload, length);
            break;
    }
}

void setup() {
    // USE_SERIAL.begin(921600);
    USE_SERIAL.begin(9600);

    //Serial.setDebugOutput(true);
    USE_SERIAL.setDebugOutput(true);

    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

      for(uint8_t t = 4; t > 0; t--) {
          USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
          USE_SERIAL.flush();
          delay(1000);
      }

    // disable AP
    if(WiFi.getMode() & WIFI_AP) {
        WiFi.softAPdisconnect(true);
    }

    WiFiMulti.addAP("abc", "99991234");

    //WiFi.disconnect();
    while(WiFiMulti.run() != WL_CONNECTED) {
        delay(100);
    }

    String ip = WiFi.localIP().toString();
    USE_SERIAL.printf("[SETUP] WiFi Connected %s\n", ip.c_str());

    //connect mlx
    if(mlx.begin()){
      USE_SERIAL.println("connecting mlx");
    }
    else{
      USE_SERIAL.println("mlx is no connect");
      while(1);
    }
    if(sensor.begin() && sensor.setSamplingRate(kSamplingRate)) { 
      USE_SERIAL.println("BPM Sensor initialized");
    }
    else {
      Serial.println("BPM Sensor not found");  
      while(1);
    }

    // server address, port and URL
    socketIO.begin("192.168.76.239", 3000, "/socket.io/?EIO=4");

    // event handler
    socketIO.onEvent(socketIOEvent);

}

unsigned long messageTimestamp = 0;
void loop() {
    socketIO.loop();

    uint64_t now = millis();

    if(now - messageTimestamp > 30000) {
        messageTimestamp = now;

        // creat JSON message for Socket.IO (event)
        DynamicJsonDocument doc(1024);
        JsonArray array = doc.to<JsonArray>();

        // add evnet name
        // Hint: socket.on('event_name', ....
        array.add("enter");
        array.add(readTempC().c_str());
        array.add(readBPM().c_str());
        // add payload (parameters) for the event
        //JsonObject param1 = array.createNestedObject();
        //param1["now"] = (uint32_t) now;
        //array.add("sebitdungdungsum");
        // JSON to String (serializion)
        String output;
        serializeJson(doc, output);

        // Send event
        socketIO.sendEVENT(output);

        // Print JSON for debugging
        USE_SERIAL.println(output);
    }
}