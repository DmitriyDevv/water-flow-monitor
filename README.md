# Мониторинг расхода воды

![project diagram.png](assets/images/project%20diagram.png)

---

### Описание:

Just for fun.

Счетчик воды (далее СВ) имеет импульсный выход, который замыкается каждые 10 литров.
Пин esp подключен к 3.3В через СВ, и подтянут через резистор 10кОм к земле для устранения дребезга. Когда выход СВ замыкается, на пин поступает высокий сигнал. После размыкания (когда высокий сигнал пропадает), отправляется сообщение в MQTT брокер. Даллее сервер подписанный на соответствующий MQTT топик, записывает данные в бд. На сервере реализовано простое REST API.

---

#### Внешний вид:

Реализован простой фронтенд для отображения базовой информации. Можно запросить информация с точностью до дня. Отображается колличество литров по часам.

![frontend.png](assets/images/frontend.png)

---

### Технологии:

#### Frontend:

![HTML](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Chart.js](https://img.shields.io/badge/chart.js-%23FF6384.svg?style=for-the-badge&logo=chart.js&logoColor=white)

#### Backend:

![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express-%23404B30.svg?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%23074046.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Mosquitto](https://img.shields.io/badge/mosquitto-%2342B72A.svg?style=for-the-badge&logo=mosquitto&logoColor=white)

#### Firmware:

![Arduino](https://img.shields.io/badge/arduino-%23007ACC.svg?style=for-the-badge&logo=arduino&logoColor=white)

---
