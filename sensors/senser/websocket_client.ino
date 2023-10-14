#include <Base64.h>
#include <global.h>
#include <MD5.h>
#include <sha1.h>
#include <WebSocketClient.h>
/*#include <WebSocketServer.h>

#include <ESP8266HTTPClient.h>

#include <SocketIOclient.h>
#include <WebSockets.h>
#include <WebSockets4WebServer.h>
#include <WebSocketsClient.h>
#include <WebSocketsServer.h>
#include <WebSocketsVersion.h>

//#include <WebSocketStreamClient.h>

#include <PubSubClient.h>

#include <WebSocketStreamClient.h>*/

#include <ESP8266WiFi.h>
#include <WebSocketClient.h>
//#include "WebSocketsServer.h"
#include <ArduinoJson.h>
#include <string.h>

// wifi 연결 정보
const char* ssid     = "Seoultech_dream";
const char* password = "";

// 서버 접속 정보
char path[] = "/";
char host[] = "10.50.51.32";
int port = 9999;

// Use WiFiClient class to create TCP connections
WiFiClient client;
WebSocketClient webSocketClient;

StaticJsonDocument<200> jsonObj;

int i=0;

void setup() {
  Serial.begin(115200);
  delay(10);

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
  
  // Connect to the websocket server
  if (client.connect(host, port)) {
    Serial.println("Connected");
  } else {
    Serial.println("Connection failed.");
    while(1) {} // hang on failure
  }

  // Handshake with the server
  webSocketClient.path = path;
  webSocketClient.host = host;
  if (webSocketClient.handshake(client)) {
    Serial.println("Handshake successful");
  } else {
    Serial.println("Handshake failed.");
    while(1) {} // Hang on failure
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.println("hi");
}