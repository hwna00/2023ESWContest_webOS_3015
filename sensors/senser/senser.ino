#include <WiFi.h>
#include <PubSubClient.h>
//#include "DHT.h"
//#define DHTTYPE DHT11
//#define DHTPIN 4

#define led1 15
#define led2 2

//WiFi공유기의 아이디 비밀번호
const char* ssid = "abc";
const char* password = "99991234";
//브로커의 주소
const char* mqtt_server = "192.168.1.74";

//DHT dht(DHTPIN, DHTTYPE);
WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE  (50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

//인터넷 공유기와 접속해라
void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

//데이터 수신 처리부
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
  //topic : char배열
  //payload : byte배열
  //length : payload의 길이
  /*if(payload[0] == '0'){
    digitalWrite(led1,LOW);
  }else if(payload[0] == '1'){
    digitalWrite(led1,HIGH);
  }else if(payload[0] == '2'){
    digitalWrite(led2,LOW);
  }else if(payload[0] == '3'){
    digitalWrite(led2,HIGH);
  }*/
}

//나의 ESP32가 MQTT서버와 접속하는 부분!
void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP32Client-";
    clientId += String(random(0xffff), HEX);
    //Serial.println(clientId);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      //ESP32가 서버와 연결을 완전이 확정하는 부분
      Serial.println("connected");
      //서버와 연결되었으니 구독신청을 하겠다!
      client.subscribe("my_topic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  //pinMode(led1,OUTPUT);
  //pinMode(led2,OUTPUT);
  //dht.begin();
  setup_wifi(); //인터넷 공유기와 접속할것!
  client.setServer(mqtt_server, 1883);//MQTT서버의 설정!
  client.setCallback(callback); //데이터수신함수 등록
}

void loop() {
  //ESP32와 MQTT서버가 연결을 유지하기 위한 부분(삭제불가)
  if (!client.connected()) {
    //서버와 ESP32간에 연결이 되어있지 않다면 연결하겠다!
    reconnect();
  }
  client.loop();

  //2초간격으로 test메시지를 발행하는 예제
  unsigned long now = millis();
  if (now - lastMsg > 2000) {
    lastMsg = now;

    //온습도값을 측정하기!
    //float h = dht.readHumidity();
    //float t = dht.readTemperature();
    /*
    Serial.print(F("Humidity: "));
    Serial.print(h);
    Serial.print(F("%  Temperature: "));
    Serial.print(t);
    Serial.println(F("°C "));
    */
    //측정값을 CSV로 만들기!
    String mydata = String(040514);
    
    //TOPIC하고 PAYLOAD를 발행하겠다!
    client.publish("my_topic", mydata.c_str());
  }
}
