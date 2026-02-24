import React, { useState, useEffect } from 'react';

export default function BookingModal({ car, isOpen, onClose }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [daysCount, setDaysCount] = useState(0);

    useEffect(() => {
        if (startDate && endDate && car) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const timeDiff = end - start;
            const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

            if (days > 0) {
                setDaysCount(days);
                setTotalPrice(days * car.price);
            } else {
                setDaysCount(0);
                setTotalPrice(0);
            }
        } else {
            setDaysCount(0);
            setTotalPrice(0);
        }
    }, [startDate, endDate, car]);

    const handleConfirm = () => {
        if (totalPrice > 0) {
            const newBooking = {
                id: Date.now(),
                carBrand: car.brand,
                carModel: car.model,
                carImage: car.image,
                startDate: startDate,
                endDate: endDate,
                totalPrice: totalPrice,
                date: new Date().toLocaleDateString()
            };

            const existingBookings = JSON.parse(localStorage.getItem('myBookings')) || [];

            const updatedBookings = [...existingBookings, newBooking];

            localStorage.setItem('myBookings', JSON.stringify(updatedBookings));

            alert(`Успішно! Ви забронювали ${car.brand} ${car.model}. Перевірте Кабінет.`);
            onClose();
        } else {
            alert("Будь ласка, виберіть коректні дати");
        }
    };

    if (!isOpen || !car) return null;

    return (
        <div className="modal" style={{display: 'block'}} onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>Бронювання {car.brand} {car.model}</h2>

                <div className="date-inputs">
                    <label>
                        Початок оренди:
                        <input
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                    </label>
                    <label>
                        Кінець оренди:
                        <input
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                        />
                    </label>
                </div>

                <div className="price-calculation">
                    <p>Ціна за добу: <b>{car.price} грн</b></p>
                    <p>Кількість днів: <b>{daysCount > 0 ? daysCount : 0}</b></p>
                    <hr />
                    <h3>Всього до сплати: <span style={{color: '#FCA311'}}>{totalPrice} грн</span></h3>
                </div>

                <button className="btn-rent" onClick={handleConfirm}>
                    Підтвердити бронювання
                </button>
            </div>
        </div>
    );
}