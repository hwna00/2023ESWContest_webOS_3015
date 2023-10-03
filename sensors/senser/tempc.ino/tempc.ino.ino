#include <Wire.h>
#include <Adafruit_MLX90614.h>

// mlx90614 라이브러리 생성
Adafruit_MLX90614 mlx = Adafruit_MLX90614();

void setup() {
  Serial.begin(9600);
  //온도 센서 시작.
  mlx.begin();  
}

void loop() {
  //외부 온도 섭씨로 읽어 모니터링 프로그램에 출력
  /*Serial.print("Ambient = "); 
  Serial.print(mlx.readAmbientTempC());*/

  //문제 온도 섭씨로 읽어 모니터링 프로그램에 출력
  Serial.print("*C\tObject = "); 
  Serial.print(mlx.readObjectTempC()); 
  Serial.println("*C");
  
  Serial.println();
  //0.5초 대기후 다시 시작.
  delay(500);
}
