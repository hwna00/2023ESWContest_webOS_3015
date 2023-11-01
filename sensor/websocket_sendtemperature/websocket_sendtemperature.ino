

#include <WiFi.h>
#include <WiFiClient.h>
#include <string.h>
#include <Arduino.h>
#include <ArduinoJson.h>
#include <SocketIOclient.h>
#include <Adafruit_MLX90614.h>
#define USE_SERIAL Serial
Adafruit_MLX90614 mlx = Adafruit_MLX90614();
SocketIOclient socketIO;
// wifi 연결 정보
const char* ssid     = "abc";
const char* password = "99991234";
//bpm sensor code
// Use WiFiClient class to create TCP connections
unsigned long Timestamp = 0;
WiFiClient client;
float readTempC(){
  return mlx.readObjectTempC();
}
void sendTempC(unsigned long ct=4800){
  unsigned long EndTime=millis()+ct;
  float result=readTempC();
  while(millis()<EndTime){
    float x=readTempC();
    if(x>result) result=x;
  }
  send_message("temperature_end","room",String(result).c_str(),"value");
}
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
            if(sp.indexOf("temperature_start")!=-1){
              send_message("temperature_start","room",5);
              sendTempC();
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
  while (!mlx.begin()){
      USE_SERIAL.println("mlx is no connect");
      delay(500);
    }
  USE_SERIAL.println("mlx is connect");
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