import React, { useState, useEffect } from 'react';

export default function Cabinet() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const savedBookings = JSON.parse(localStorage.getItem('myBookings')) || [];
        setBookings(savedBookings);
    }, []);

    const cancelBooking = (id) => {
        if (window.confirm("Ви впевнені, що хочете скасувати це бронювання?")) {
            const updatedBookings = bookings.filter(booking => booking.id !== id);

            setBookings(updatedBookings);
            localStorage.setItem('myBookings', JSON.stringify(updatedBookings));
        }
    };

    return (
        <div className="container">
            <section>
                <h2>Мій кабінет</h2>

                {bookings.length === 0 ? (
                    <p>У вас поки немає активних бронювань. Перейдіть у каталог, щоб обрати авто.</p>
                ) : (
                    <div className="booking-list">
                        {bookings.map((item) => (
                            <div key={item.id} className="booking-item">
                                <div className="booking-info">
                                    <h3>{item.carBrand} {item.carModel}</h3>
                                    <p>{item.startDate} — {item.endDate}</p>
                                    <p><span className="price">{item.totalPrice} грн</span></p>
                                </div>
                                <button
                                    className="btn-cancel"
                                    onClick={() => cancelBooking(item.id)}
                                >
                                    Скасувати
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}