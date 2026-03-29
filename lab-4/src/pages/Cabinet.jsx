import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';

export default function Cabinet() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async (email) => {
            try {
                const response = await fetch(`/api/bookings?email=${email}`);
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error(error);
            }
        };
        
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchBookings(user.email);
            } else {
                setBookings([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const cancelBooking = (id) => {
        if (window.confirm("Ви впевнені, що хочете скасувати це бронювання?")) {
            setBookings(bookings.filter(booking => booking.id !== id));
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
                                    <h3>{item.carName || `${item.carBrand} ${item.carModel}`}</h3>
                                    <p>{item.startDate} — {item.endDate}</p>
                                    {item.totalPrice && <p><span className="price">{item.totalPrice} грн</span></p>}
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