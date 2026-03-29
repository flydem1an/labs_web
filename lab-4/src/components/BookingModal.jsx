import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function BookingModal({ car, isOpen, onClose }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [daysCount, setDaysCount] = useState(0);

    const [showPayment, setShowPayment] = useState(false);
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardDate, setCardDate] = useState('');
    const [cardCvv, setCardCvv] = useState('');

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

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

    useEffect(() => {
        if (!isOpen) {
            setShowPayment(false);
            setStartDate('');
            setEndDate('');
            setCardName('');
            setCardNumber('');
            setCardDate('');
            setCardCvv('');
        }
    }, [isOpen]);

    const handleConfirmDates = () => {
        if (totalPrice > 0) {
            setShowPayment(true);
        } else {
            alert("Будь ласка, виберіть коректні дати");
        }
    };

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/(.{4})/g, "$1 ").trim();
        setCardNumber(value.substring(0, 19));
    };

    const handleCardDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 2) {
            value = value.substring(0, 2) + "/" + value.substring(2, 4);
        }
        setCardDate(value.substring(0, 5));
    };

    const processPayment = async () => {
        if (!cardName || !cardNumber || !cardDate || !cardCvv) {
            alert("Будь ласка, заповніть всі дані картки!");
            return;
        }

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    carId: car.id,
                    carName: `${car.brand} ${car.model}`,
                    userEmail: user.email,
                    startDate: startDate,
                    endDate: endDate,
                    totalPrice: totalPrice 
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Успішно оплачено! ${result.message}`);
                onClose();
            } else {
                alert(`Помилка: ${result.message}`);
            }
        } catch (error) {
            console.error("Помилка відправки:", error);
            alert("Помилка з'єднання з сервером.");
        }
    };

    if (!isOpen || !car) return null;

    if (!user) {
        return (
            <div className="modal" style={{display: 'block'}} onClick={onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()} style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <span className="close-btn" onClick={onClose}>&times;</span>
                    <h2 style={{ marginBottom: '20px' }}>Бронювання {car.brand} {car.model}</h2>
                    <p style={{ fontSize: '18px', marginBottom: '30px' }}>
                        Бронювання доступне лише для авторизованих користувачів.
                    </p>
                    <Link to="/register" className="btn-rent" style={{ background: '#FCA311', color: 'white', padding: '12px 25px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
                        Зареєструватися
                    </Link>
                </div>
            </div>
        );
    }

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
                            disabled={showPayment}
                        />
                    </label>
                    <label>
                        Кінець оренди:
                        <input
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            disabled={showPayment}
                        />
                    </label>
                </div>

                <div className="price-calculation">
                    <p>Ціна за добу: <b>{car.price} грн</b></p>
                    <p>Кількість днів: <b>{daysCount > 0 ? daysCount : 0}</b></p>
                    <hr />
                    <h3>Всього до сплати: <span style={{color: '#FCA311'}}>{totalPrice} грн</span></h3>
                </div>

                {!showPayment ? (
                    <button className="btn-rent" onClick={handleConfirmDates}>
                        Підтвердити бронювання
                    </button>
                ) : (
                    <div className="payment-section" style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '15px' }}>
                        <h3 style={{ marginBottom: '15px' }}>Оплата картою</h3>
                        
                        <input 
                            type="text" 
                            placeholder="Ім'я на карті (Ivan Ivanov)" 
                            value={cardName} 
                            onChange={(e) => setCardName(e.target.value)}
                            style={{ width: '100%', marginBottom: '10px', padding: '8px', boxSizing: 'border-box' }}
                        />
                        <input 
                            type="text" 
                            placeholder="Номер карти (0000 0000 0000 0000)" 
                            value={cardNumber} 
                            onChange={handleCardNumberChange}
                            style={{ width: '100%', marginBottom: '10px', padding: '8px', boxSizing: 'border-box' }}
                        />
                        
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                            <input 
                                type="text" 
                                placeholder="ММ/РР" 
                                value={cardDate} 
                                onChange={handleCardDateChange}
                                style={{ width: '50%', padding: '8px', boxSizing: 'border-box' }}
                            />
                            <input 
                                type="password" 
                                placeholder="CVV" 
                                value={cardCvv} 
                                onChange={(e) => setCardCvv(e.target.value)}
                                style={{ width: '50%', padding: '8px', boxSizing: 'border-box' }}
                            />
                        </div>
                        
                        <button 
                            onClick={processPayment} 
                            style={{ background: '#FCA311', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
                        >
                            Оплатити
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}