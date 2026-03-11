import React from 'react';

export default function CarCard({ car, onRent }) {
    return (
        <article className="car-card">
            <div className="car-image-placeholder">
                <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
            </div>

            <h3>{car.brand} {car.model}</h3>
            <p className="price">{car.price} грн/доба</p>
            <ul className="car-details">
                <li>Трансмісія: {car.transmission}</li>
                <li>Рейтинг: ⭐ {car.rating}</li>
            </ul>
            <button className="btn-rent" onClick={() => onRent(car)}>
                Орендувати
            </button>
        </article>
    );
}