const projects = [
  {
    title: "RFID-BASED ATTENDANCE SYSTEM",
    description: "An automated student attendance system using RFID technology and Arduino.",
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
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) return;
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
    stack: ["PHP + MySQL for result storage", "Arduino IDE"],
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

void loop() {
  getFingerprintID();
  delay(1000);
}

uint8_t getFingerprintID() {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK) return p;
  p = finger.image2Tz();
  if (p != FINGERPRINT_OK) return p;
  p = finger.fingerFastSearch();
  if (p == FINGERPRINT_OK) {
    Serial.print("ID found: "); Serial.println(finger.fingerID);
  } else {
    Serial.println("No match found");
  }
  return p;
}`
  },
  {
    title: "THEFT DETECTION WITH SMS ALERT",
    description: "Detects vibration or motion and sends an SMS alert using SIM800L.",
    hardware: ["Vibration Sensor", "SIM800L GSM Module", "Arduino Uno"],
    stack: ["Arduino IDE"],
    image: "assets/img/3.png",
    code: `#include <SoftwareSerial.h>

SoftwareSerial sim800(7, 8);
int vibrationPin = 2;

void setup() {
  pinMode(vibrationPin, INPUT);
  sim800.begin(9600);
  Serial.begin(9600);
}

void loop() {
  int state = digitalRead(vibrationPin);
  if (state == HIGH) {
    sendSMS();
    delay(10000);
  }
}

void sendSMS() {
  sim800.println("AT+CMGF=1");
  delay(1000);
  sim800.println("AT+CMGS=\\"+1234567890\\"");
  delay(1000);
  sim800.println("Theft detected!");
  sim800.write(26);
}`
  },
  {
    title: "WIRELESS NOTICE BOARD",
    description: "Remote message display using NodeMCU and OLED, synced with Firebase or a Web App.",
    hardware: ["NodeMCU ESP8266", "OLED Display (0.96\")"],
    stack: ["Firebase or Web App", "Arduino IDE"],
    image: "assets/img/4.png",
    code: `#include <ESP8266WiFi.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0,0);
  display.println("Welcome!");
  display.display();
}

void loop() {
  // Fetch message from Firebase or web and display
}`
  },
  {
    title: "FIRE AND SMOKE ALARM SYSTEM",
    description: "Detects fire and smoke with MQ2/flame sensors, activates buzzer.",
    hardware: ["MQ-2 Smoke Sensor", "Flame Sensor", "Buzzer", "Arduino Uno"],
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
  int smokeValue = analogRead(smokeSensor);
  int flameValue = digitalRead(flameSensor);
  if (smokeValue > 400 || flameValue == LOW) {
    digitalWrite(buzzer, HIGH);
  } else {
    digitalWrite(buzzer, LOW);
  }
  delay(1000);
}`
  },
  {
    title: "SMART IRRIGATION SYSTEM",
    description: "Automatically irrigates when soil moisture drops below threshold.",
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
  Serial.println(moisture);
  if (moisture < 400) {
    digitalWrite(pumpRelay, HIGH);
  } else {
    digitalWrite(pumpRelay, LOW);
  }
  delay(1000);
}`
  },
  {
    title: "HOME AUTOMATION WITH MOBILE APP",
    description: "Control home appliances via mobile app using NodeMCU and Blynk.",
    hardware: ["NodeMCU ESP8266", "Relay Module", "Lamp or Fan"],
    stack: ["Blynk App", "Arduino IDE"],
    image: "assets/img/7.png",
    code: `#define BLYNK_PRINT Serial
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>

char auth[] = "YourAuthToken";
char ssid[] = "YourWiFi";
char pass[] = "YourPass";

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
    title: "ALCOHOL SYSTEM FOR DRIVER DETECTION",
    description: "Prevents car ignition if alcohol is detected in driver’s breath.",
    hardware: ["MQ-3 Alcohol Sensor", "Relay Module", "Arduino Uno"],
    stack: ["Arduino IDE"],
    image: "assets/img/8.png",
    code: `int alcoholSensor = A0;
int relay = 8;

void setup() {
  pinMode(relay, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int level = analogRead(alcoholSensor);
  Serial.println(level);
  if (level > 400) {
    digitalWrite(relay, LOW); // Prevent ignition
  } else {
    digitalWrite(relay, HIGH);
  }
  delay(1000);
}`
  },
  {
    title: "SMART TRASH BIN (AUTO LID)",
    description: "Lid opens automatically using ultrasonic sensor and servo motor.",
    hardware: ["Ultrasonic Sensor", "Servo Motor", "Arduino Uno"],
    stack: ["Arduino IDE"],
    image: "assets/img/9.png",
    code: `#include <Servo.h>
Servo lid;
int trigPin = 9;
int echoPin = 10;

void setup() {
  lid.attach(3);
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
  int distance = duration * 0.034 / 2;

  if (distance < 20) {
    lid.write(90);
    delay(3000);
    lid.write(0);
  }
  delay(500);
}`
  },
  {
    title: "FINGERPRINT DOOR LOCK SYSTEM",
    description: "Unlocks door with registered fingerprints using R305 and servo.",
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
  if (finger.verifyPassword()) {
    Serial.println("Sensor ready");
  } else {
    Serial.println("Sensor error");
    while (1);
  }
}

void loop() {
  if (getFingerprintID() == FINGERPRINT_OK) {
    doorLock.write(90);
    delay(5000);
    doorLock.write(0);
  }
}

uint8_t getFingerprintID() {
  if (finger.getImage() != FINGERPRINT_OK) return -1;
  if (finger.image2Tz() != FINGERPRINT_OK) return -1;
  if (finger.fingerFastSearch() != FINGERPRINT_OK) return -1;
  return FINGERPRINT_OK;
}`
  }
];
