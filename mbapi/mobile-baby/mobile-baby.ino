#include <Servo.h>
#include <SPI.h>
#include <Ethernet.h>

#define PINO_SERVO 6
int ledPin = 3; // choose the pin for the LED
int inPin = 4; // choose the input pin (for a pushbutton)
int inSen = 5; // choose the input pin (for a sensor)
int inMic = 7; // choose the input pin (for a sound sensor)

Servo servo;

// MOVIMNTO SERVO
unsigned long ultimo_movimento = 0;
unsigned long atual = 0;
unsigned long servo_ultimo_movimento = 0;
int graus = 0;

// Sensores
int val_button = 0;     // variable for reading the pin status
int val_sensor = 0; //variavel para leitura do estado do sensor
int val_mic = 0; // variavel para leitura do estado do microfone

// Estado
bool estado = false;
unsigned long ultimo_estado = 0;

// Rede
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
char server[] = "0.tcp.ngrok.io";
int port = 10191;
EthernetClient client;
unsigned long ultimo_envio = 0;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);  // declare LED as output
  pinMode(inPin, INPUT);    // declare pushbutton as input
  pinMode(inSen, INPUT);  //declara sensor como input
  pinMode(inMic, INPUT); // declara sensor sonoro como input
  servo.attach(PINO_SERVO);

  Serial.println("Tentando obter um IP: ");
  while (!Ethernet.begin(mac)) {
    Serial.println("Erro ao conectar");
  }
  Serial.print("Meu endereco:");
  Serial.println(Ethernet.localIP());
  delay(1000);
}

void loop() {
  ler_valores ();
  atualiza_estado ();
  
  if(estado){movimenta_mobile ();
  }
  
  ler_dados_rede ();
  envia_dados_rede ();
}

void ler_valores () {
  val_button = digitalRead(inPin);
  val_mic = digitalRead(inMic);
  val_sensor = digitalRead(inSen);
}

void atualiza_estado () {
  //unsigned long atual = millis();
    atual = millis();
  
  if (val_button == 1 || val_mic == 1) {
    estado = true;
    ultimo_estado = atual; // temporizador 
  } else if (atual - ultimo_estado >= 20000 && val_mic == 0 && val_button == 0) {
    estado = false;
  }
}

void movimenta_mobile () {
  unsigned long servo_atual = millis();
  if (servo_atual - servo_ultimo_movimento >= 400) {
    servo_ultimo_movimento = servo_atual;
    graus += 20;
    if (graus > 180) graus = 0;
    if (estado) servo.write(graus);
  }
}

void ler_dados_rede () {
  if (client.connected()) {
    if (client.available()) {
      Serial.write(client.read());
    }
  }
}

void envia_dados_rede () {
  unsigned long atual = millis();
  Serial.print("atual: ");
  Serial.println(atual);
  Serial.print("ultimo envio: ");
  Serial.println(ultimo_envio);
  if (atual - ultimo_envio >= 15000) {
    ultimo_envio = atual;
    if (client.connect(server, port)) {
      client.print("GET /dadosenv?choro=");
      client.print(val_mic);
      client.print("&movimento=");
      client.print(val_sensor);
      client.println(" HTTP/1.1");
      client.println("Host: localhost:3000");
      client.println();
      client.stop();
      Serial.println("Enviou");

    } else {
      Serial.println("connection failed");
    }
  }
}






