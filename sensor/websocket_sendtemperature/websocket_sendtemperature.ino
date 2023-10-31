#include <Adafruit_MLX90614.h>
#include <Arduino.h>
#include <ArduinoJson.h>
#include <SocketIOclient.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <string.h>
#define USE_SERIAL Serial
Adafruit_MLX90614 mlx = Adafruit_MLX90614();
SocketIOclient socketIO;
// wifi 연결 정보
const char *ssid = "koss";
const char *password = "a123456789!";
// bpm sensor code
//  Use WiFiClient class to create TCP connections
unsigned long Timestamp = 0;
WiFiClient client;
void hexdump(const void *mem, uint32_t len, uint8_t cols = 16) {
  const uint8_t *src = (const uint8_t *)mem;
  USE_SERIAL.printf("\n[HEXDUMP] Address: 0x%08X len: 0x%X (%d)",
                    (ptrdiff_t)src, len, len);
  for (uint32_t i = 0; i < len; i++) {
    if (i % cols == 0) {
      USE_SERIAL.printf("\n[0x%08X] 0x%08X: ", (ptrdiff_t)src, i);
    }
    USE_SERIAL.printf("%02X ", *src);
    src++;
  }
  USE_SERIAL.printf("\n");
}
float readTempC() { return mlx.readObjectTempC(); }
void start_temp() {
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();
  array.add("temp_end");
  array.add("room");
  array.add("5");
  String output;
  serializeJson(doc, output);
  socketIO.sendEVENT(output);
}
bool sendTempC() {
  unsigned long EndTime = millis() + 4500;
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();
  array.add("temp_end");
  array.add("room");
  JsonObject param1 = array.createNestedObject();
  float result = readTempC();
  /*if(result=="NaN"){
    return false;
  }*/
  while (millis() < EndTime) {
    float x = readTempC();
    if (x > result)
      result = x;
  }
  param1["temp"] = result;
  String output;
  serializeJson(doc, output);
  Serial.print("send temp : ");
  Serial.println(output);
  socketIO.sendEVENT(output);
  return true;

  //               Send event
  socketIO.sendEVENT(output);
}
void socketIOEvent(socketIOmessageType_t type, uint8_t *payload,
                   size_t length) {
  switch (type) {
  case sIOtype_DISCONNECT:
    USE_SERIAL.printf("[IOc] Disconnected!\n");
    break;
  case sIOtype_CONNECT:
    USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);

    // join default namespace (no auto join in Socket.IO V3)
    socketIO.send(sIOtype_CONNECT, "/");
    if (1) {
      DynamicJsonDocument doc(1024);
      JsonArray array = doc.to<JsonArray>();
      array.add("join_room");
      array.add("room");
      String output;
      serializeJson(doc, output);

      // Send event
      socketIO.sendEVENT(output);

      // Print JSON for debugging
      USE_SERIAL.println(output);
    }
    break;
  case sIOtype_EVENT:
    USE_SERIAL.printf("[IOc] get event: %s\n", payload);
    if (payload[2] == 't') {
      USE_SERIAL.println("temp ricived event");

      sendTempC();
    } else if (payload[2] == 'w') {
      DynamicJsonDocument doc(1024);
      JsonArray array = doc.to<JsonArray>();
      array.add("setup_senser");
      array.add("room");
      String output;
      serializeJson(doc, output);

      // Send event
      socketIO.sendEVENT(output);
      USE_SERIAL.print("w recived : ");
      // Print JSON for debugging
      USE_SERIAL.println(output);
    }
    break;
  case sIOtype_ACK:
    USE_SERIAL.printf("[IOc] get ack: %u\n", length);
    // hexdump(payload, length);
    break;
  case sIOtype_ERROR:
    USE_SERIAL.printf("[IOc] get error: %u\n", length);
    // hexdump(payload, length);
    break;
  case sIOtype_BINARY_EVENT:
    USE_SERIAL.printf("[IOc] get binary: %u\n", length);
    // hexdump(payload, length);
    break;
  case sIOtype_BINARY_ACK:
    USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
    // hexdump(payload, length);
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
  while (!mlx.begin()) {
    USE_SERIAL.println("mlx is no connect");
    delay(500);
  }
  USE_SERIAL.println("mlx is connect");
  socketIO.begin("192.168.1.74", 3000, "/socket.io/?EIO=4");
  // event handler
  socketIO.onEvent(socketIOEvent);
}
void loop() { socketIO.loop(); }
