const projects = [
  {
    title: "RFID‑BASED ATTENDANCE SYSTEM",
    description: "Automated student attendance using RFID technology and Arduino.",
    hardware: ["MFRC522 RFID Module", "RFID tags", "Arduino Uno"],
    stack: ["Firebase or PHP + MySQL", "Arduino IDE"],
    image: "assets/img/1.png",
    code: `#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9
MFRC522 mfrc522(SS_PIN, RST_PIN);

void setup() {
  Serial.begin(9600);
  SPI.begin();
  mfrc522.PCD_Init();
  Serial.println("Scan your RFID card");
}

void loop() {
  if (!mfrc522.PICC_IsNewCardPresent() ||
      !mfrc522.PICC_ReadCardSerial()) return;

  Serial.print("Card UID: ");
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    Serial.print(mfrc522.uid.uidByte[i], HEX);
  }
  Serial.println();
  delay(2000);
}`
  },
  {
    title: "FINGERPRINT VOTING SYSTEM",
    description: "Secure voting system using a fingerprint sensor and Arduino.",
    hardware: ["R305 Fingerprint Sensor", "LCD Display", "Keypad", "Arduino Uno"],
    stack: ["PHP + MySQL", "Arduino IDE"],
    image: "assets/img/2.png",
    code: `#include <Adafruit_Fingerprint.h>
#include <SoftwareSerial.h>

SoftwareSerial mySerial(2, 3);
Adafruit_Fingerprint finger(&mySerial);

void setup() {
  Serial.begin(9600);
  finger.begin(57600);
  if (finger.verifyPassword()) {
    Serial.println("Sensor found!");
  } else {
    Serial.println("Sensor not found.");
    while (1);
  }
}

uint8_t getFingerprintID() {
  if (finger.getImage() != FINGERPRINT_OK) return -1;
  if (finger.image2Tz() != FINGERPRINT_OK) return -1;
  if (finger.fingerFastSearch() != FINGERPRINT_OK) return -1;
  return FINGERPRINT_OK;
}

void loop() {
  if (getFingerprintID() == FINGERPRINT_OK) {
    Serial.println("Vote recorded!");
  }
  delay(1000);
}`
  },
  {
    title: "THEFT DETECTION WITH SMS ALERT",
    description: "Detects motion and sends SMS alert via SIM800L GSM module.",
    hardware: ["Vibration Sensor", "SIM800L GSM Module", "Arduino Uno"],
    stack: ["Arduino IDE"],
    image: "assets/img/3.png",
    code: `#include <SoftwareSerial.h>
SoftwareSerial sim800(7,8);
int vibrationPin = 2;

void setup() {
  pinMode(vibrationPin, INPUT);
  sim800.begin(9600);
  Serial.begin(9600);
}

void sendSMS() {
  sim800.println("AT+CMGF=1");
  delay(1000);
  sim800.println("AT+CMGS=\\"+1234567890\\"");
  delay(1000);
  sim800.println("Theft detected!");
  sim800.write(26);
}

void loop() {
  if (digitalRead(vibrationPin) == HIGH) {
    sendSMS();
    delay(10000);
  }
}`
  },
  {
    title: "WIRELESS NOTICE BOARD",
    description: "Displays messages wirelessly using NodeMCU and OLED synced with Firebase.",
    hardware: ["NodeMCU ESP8266", "OLED Display (0.96\")"],
    stack: ["Firebase or Web App", "Arduino IDE"],
    image: "assets/img/4.png",
    code: `#include <ESP8266WiFi.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define OLED_RESET -1
Adafruit_SSD1306 display(128, 64, &Wire, OLED_RESET);

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0,0);
  display.println("Connecting...");
  display.display();
  // Connect to WiFi and Firebase...
}

void loop() {
  // Retrieve and display message...
}`
  },
  {
    title: "FIRE & SMOKE ALARM SYSTEM",
    description: "Detects fire and smoke using MQ‑2 and flame sensors, triggers buzzer alert.",
    hardware: ["MQ‑2 Sensor", "Flame Sensor", "Buzzer", "Arduino Uno"],
    stack: ["Arduino IDE"],
    image: "assets/img/5.png",
    code: `int smokeSensor = A0;
int flameSensor = 2;
int buzzer = 9;

void setup() {
  pinMode(flameSensor, INPUT);
  pinMode(buzzer, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int smokeVal = analogRead(smokeSensor);
  int flameVal = digitalRead(flameSensor);
  if (smokeVal > 400 || flameVal == LOW) {
    digitalWrite(buzzer, HIGH);
  } else {
    digitalWrite(buzzer, LOW);
  }
  delay(1000);
}`
  },
  {
    title: "SMART IRRIGATION SYSTEM",
    description: "Automates watering when soil moisture drops below threshold.",
    hardware: ["Soil Moisture Sensor", "Relay Module", "Water Pump", "Arduino Uno"],
    stack: ["Arduino IDE"],
    image: "assets/img/6.png",
    code: `int moisturePin = A0;
int pumpRelay = 7;

void setup() {
  pinMode(pumpRelay, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int moisture = analogRead(moisturePin);
  if (moisture < 400) {
    digitalWrite(pumpRelay, HIGH);
  } else {
    digitalWrite(pumpRelay, LOW);
  }
  delay(1000);
}`
  },
  {
    title: "HOME AUTOMATION WITH BLYNK",
    description: "Control home appliances via mobile app using NodeMCU and Blynk.",
    hardware: ["NodeMCU ESP8266", "Relay Module", "Appliances"],
    stack: ["Blynk App", "Arduino IDE"],
    image: "assets/img/7.png",
    code: `#define BLYNK_PRINT Serial
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>

char auth[] = "YourAuthToken";
char ssid[] = "YourWiFi";
char pass[] = "YourPassword";

void setup() {
  Serial.begin(9600);
  Blynk.begin(auth, ssid, pass);
  pinMode(D1, OUTPUT);
}

void loop() {
  Blynk.run();
}`
  },
  {
    title: "BREATH ALCOHOL SYSTEM FOR DRIVERS",
    description: "Prevents engine ignition if alcohol is detected in driver’s breath.",
    hardware: ["MQ‑3 Alcohol Sensor", "Relay Module", "Arduino Uno"],
    stack: ["Arduino IDE"],
    image: "assets/img/8.png",
    code: `int alcoholSensor = A0;
int relayPin = 8;

void setup() {
  pinMode(relayPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int alcoholLevel = analogRead(alcoholSensor);
  if (alcoholLevel > 400) {
    digitalWrite(relayPin, LOW); // Stop ignition
  } else {
    digitalWrite(relayPin, HIGH);
  }
  delay(1000);
}`
  },
  {
    title: "SMART TRASH BIN (AUTO LID)",
    description: "Automatic lid opens using ultrasonic sensor and servo motor.",
    hardware: ["Ultrasonic Sensor", "Servo Motor", "Arduino Uno"],
    stack: ["Arduino IDE"],
    image: "assets/img/9.png",
    code: `#include <Servo.h>

Servo binServo;
const int trigPin = 9;
const int echoPin = 10;

void setup() {
  binServo.attach(3);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH);
  int dist = duration * 0.034 / 2;
  if (dist < 20) {
    binServo.write(90);
    delay(3000);
    binServo.write(0);
  }
  delay(500);
}`
  },
  {
    title: "FINGERPRINT DOOR LOCK SYSTEM",
    description: "Door unlocks via fingerprint scan using R305 and servo motor.",
    hardware: ["R305 Fingerprint Sensor", "Servo Motor", "Arduino Uno"],
    stack: ["Arduino IDE"],
    image: "assets/img/10.png",
    code: `#include <Adafruit_Fingerprint.h>
#include <Servo.h>
#include <SoftwareSerial.h>

SoftwareSerial mySerial(2, 3);
Adafruit_Fingerprint finger(&mySerial);
Servo doorLock;

void setup() {
  Serial.begin(9600);
  finger.begin(57600);
  doorLock.attach(9);
  if (!finger.verifyPassword()) {
    Serial.println("Sensor error");
    while (1);
  }
}

void loop() {
  if (finger.getImage() == FINGERPRINT_OK &&
      finger.image2Tz() == FINGERPRINT_OK &&
      finger.fingerFastSearch() == FINGERPRINT_OK) {
    doorLock.write(90);
    delay(3000);
    doorLock.write(0);
  }
}`
  }
];
