const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "dist")));


app.get("/api/bookings", async (req, res) => {
    try {
        const userEmail = req.query.email;

        if (!userEmail) {
            return res.status(400).json({ message: "Email обов'язковий" });
        }

        const snapshot = await db.collection("bookings").where("userEmail", "==", userEmail).get();
        const bookings = [];

        snapshot.forEach(doc => {
            bookings.push({ id: doc.id, ...doc.data() });
        });

        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Помилка сервера при отриманні бронювань" });
    }
});

app.post("/api/bookings", async (req, res) => {
    try {
        const { carId, userEmail, startDate, endDate, carName } = req.body;

        const carRef = db.collection("cars").doc(String(carId));
        const carDoc = await carRef.get();

        if (!carDoc.exists) {
            return res.status(404).json({ message: "Автомобіль не знайдено в базі" });
        }

        const carData = carDoc.data();

        if (carData.availableCount <= 0) {
            return res.status(400).json({ message: "На жаль, це авто зараз недоступне" });
        }

        await carRef.update({
            availableCount: carData.availableCount - 1
        });

        const newBooking = {
            carId,
            carName,
            userEmail,
            startDate,
            endDate,
            totalPrice: req.body.totalPrice,
            status: "Підтверджено",
            createdAt: new Date().toISOString()
        };

        const bookingRef = await db.collection("bookings").add(newBooking);

        res.status(201).json({ message: "Бронювання успішно оформлено!", bookingId: bookingRef.id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Помилка при бронюванні" });
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});