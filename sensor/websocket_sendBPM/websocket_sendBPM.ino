#include <WiFi.h>
#include <WiFiClient.h>
#include <string.h>
#include <Arduino.h>
#include <ArduinoJson.h>
#include <SocketIOclient.h>
#include <MAX3010x.h>
#include "filters.h"
#define USE_SERIAL Serial
SocketIOclient socketIO;
// wifi 연결 정보
const char* ssid     = "abc";
const char* password = "99991234";
//bpm sensor code
MAX30101 sensor;
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

// Filter Instances
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
int average_bpm;
//bpm sensor code
// Use WiFiClient class to create TCP connections
unsigned long Timestamp = 0;
WiFiClient client;
void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    String sp=String((char*)payload);
    switch(type) {
        case sIOtype_DISCONNECT:
            USE_SERIAL.printf("[IOc] Disconnected!\n");
            break;
        case sIOtype_CONNECT:
            USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);
            socketIO.send(sIOtype_CONNECT, "/");
            send_message("join_room","room",0);
            break;
        case sIOtype_EVENT:
            USE_SERIAL.printf("[IOc] get event: %s\n", payload);
            if(sp.indexOf("bpm_start")!=-1){
              send_message("bpm_start","room",20);
              send_message("bpm_end","room",readBPM(20000).c_str(),"value");
            }
            else if(sp.indexOf("welcome")!=-1){
              send_message("setup_senser","room",0);
            }
            else{
              Serial.println("paylad no mac");
            }
            break;  
    }
}

void setup() {
  Serial.begin(9600);
  USE_SERIAL.setDebugOutput(true);
  delay(1000);

  // We start by connecting to a WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  delay(1000);
  if(sensor.begin() && sensor.setSamplingRate(kSamplingRate)) { 
    Serial.println("Sensor initialized");
  }
  else {
    Serial.println("Sensor not found");  
    while(1){
      Serial.println("oh no");
    }
  }
  socketIO.begin("18.117.97.128",3000,"/socket.io/?EIO=4");
    // event handler 
  socketIO.onEvent(socketIOEvent);
}
void loop() {
  socketIO.loop();
}
void send_message(char* event_name,char* id,const char* val,char* key){
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();
  array.add(event_name); //Please write the bmp event name
  array.add(id);
  String output;
  JsonObject param1 = array.createNestedObject();
  param1[key] = val;           
  serializeJson(doc, output);
  socketIO.sendEVENT(output);
  Serial.println("sm1 :");
  Serial.println(output);
}
void send_message(char* event_name,char* id,unsigned long measurement_time){
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();
  array.add(event_name);
  array.add(id);
  if(measurement_time>0) array.add(String(measurement_time));
  String output;
  serializeJson(doc, output);
  socketIO.sendEVENT(output);
  Serial.println("sm2 :");
  Serial.println(output);
}
String readBPM(unsigned long measurement_time){
  unsigned long ct= millis() + measurement_time;
  while(1){
    if(ct < millis()){
      //int average_bpm = averager.process(bpm);

      // Show if enough samples have been collected
      if(averager.count() > kSampleThreshold) {
           
           return String(average_bpm);
      }
      else{
        return String("다시 측정해 주세요");
      }
    }
    auto sample = sensor.readSample(1000);
    float current_value = sample.red;
  
    // Detect Finger using raw sensor value
    if(sample.red > kFingerThreshold) {
      if(millis() - finger_timestamp > kFingerCooldownMs) {
        finger_detected = true;
      }
    }
    else {
    // Reset values if the finger is removed
      differentiator.reset();
      averager.reset();
      low_pass_filter.reset();
      high_pass_filter.reset();
    
      finger_detected = false;
      finger_timestamp = millis();
    }

    if(finger_detected) {
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
                average_bpm = averager.process(bpm);
  
              // Show if enough samples have been collected
                if(averager.count() > kSampleThreshold) {
                  Serial.print("Heart Rate (avg, bpm): ");
                  Serial.println(average_bpm);
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
  }
}
void hexdump(const void *mem, uint32_t len, uint8_t cols = 16) {
  const uint8_t* src = (const uint8_t*) mem;
  USE_SERIAL.printf("\n[HEXDUMP] Address: 0x%08X len: 0x%X (%d)", (ptrdiff_t)src, len, len);
  for(uint32_t i = 0; i < len; i++) {
    if(i % cols == 0) {
      USE_SERIAL.printf("\n[0x%08X] 0x%08X: ", (ptrdiff_t)src, i);
    }
    USE_SERIAL.printf("%02X ", *src);
    src++;
  }
  USE_SERIAL.printf("\n");
}