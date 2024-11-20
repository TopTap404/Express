const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;  // Port สำหรับรับข้อมูลจาก ESP32

let temperature = null;  // ตัวแปรเก็บข้อมูลอุณหภูมิ

// Middleware สำหรับแปลงข้อมูล JSON
app.use(bodyParser.json());

// Route สำหรับรับข้อมูลจาก ESP32
app.post("/updateTemperature", (req, res) => {
  const temp = req.body.temperature;
  temperature = temp;
  console.log(`Received temperature: ${temperature}`);
  res.status(200).send("Data received");
});

// Route สำหรับให้ React Web ดึงข้อมูลอุณหภูมิ
app.get("/getTemperature", (req, res) => {
  res.json({ temperature: temperature });
});

// เริ่มต้น Express Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});