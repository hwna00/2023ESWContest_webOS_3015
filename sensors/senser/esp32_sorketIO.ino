

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

// 서버 접속 정보
char path[] = "/";
char host[] = "localhost";
int port = 3000;

// Use WiFiClient class to create TCP connections
WiFiClient client;
//WebSocketClient webSocketClient;

//StaticJsonDocument<200> jsonObj;
void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            USE_SERIAL.printf("[IOc] Disconnected!\n");
            break;
        case sIOtype_CONNECT:
            USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);

            // join default namespace (no auto join in Socket.IO V3)
            socketIO.send(sIOtype_CONNECT, "/");
            if(1){
              DynamicJsonDocument doc(1024);
              JsonArray array = doc.to<JsonArray>();
              array.add("enter");
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
            if(payload[2]=='t'){
              DynamicJsonDocument doc(1024);
              JsonArray array = doc.to<JsonArray>();
              array.add("temp_result");
              array.add("room");
              //array.add("event rec!");
              JsonObject param1 = array.createNestedObject();
              param1["temp"] = String("3999999.94");
              String output;
              serializeJson(doc, output);

//               Send event
              socketIO.sendEVENT(output);

              // Print JSON for debugging
              USE_SERIAL.println(output);
              }
            break;  
        case sIOtype_ACK:
            USE_SERIAL.printf("[IOc] get ack: %u\n", length);
            //hexdump(payload, length);
            break;
        case sIOtype_ERROR:
            USE_SERIAL.printf("[IOc] get error: %u\n", length);
            //hexdump(payload, length);
            break;
        case sIOtype_BINARY_EVENT:
            //USE_SERIAL.printf("[IOc] get binary: %u\n", length);
            //hexdump(payload, length);
            break;
        case sIOtype_BINARY_ACK:
            USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
            //hexdump(payload, length);
            break;
    }
}
int i=0;

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
  /*if(mlx.begin()){
      USE_SERIAL.println("connecting mlx");
    }
  else{
      USE_SERIAL.println("mlx is no connect");
      while(1){
        USE_SERIAL.println("oh no!!!!!!!!!!!!!");
      }
    }*/
  socketIO.begin("192.168.76.225", 3000, "/socket.io/?EIO=4");
    // event handler
  socketIO.onEvent(socketIOEvent);
}
unsigned long messageTimestamp = 0;
void loop() {
  // put your main code here, to run repeatedly:
  socketIO.loop();
  uint64_t now = millis();

    if(now - messageTimestamp > 3000) {
        messageTimestamp = now;

        // creat JSON message for Socket.IO (event)
        DynamicJsonDocument doc(1024);
        JsonArray array = doc.to<JsonArray>();

        // add evnet name
        // Hint: socket.on('event_name', ....
        array.add("setup_sensor");
//        array.add("hmm");
        //array.add("35");
        //array.add("bpm");
        //array.add("99");
        //doc["temp"]=35;
        //doc["bpm"]=99;
        //array.add(readTempC().c_str());
        //array.add(readBPM().c_str());
        
        // add payload (parameters) for the event
        JsonObject param1 = array.createNestedObject();
        param1["now"] = (uint32_t) now;
//        array.add("sebitdungdungsum");
//         JSON to String (serializion)
        String output;
        serializeJson(doc, output);

        // Send event
        socketIO.sendEVENT(output);

        // Print JSON for debugging
        USE_SERIAL.println(output);
    }
}