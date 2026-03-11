import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1>PolitechDrive</h1>
                <p>Твоя свобода руху. Обери найкраще авто для своїх подорожей Львовом та областю.</p>

                <Link to="/catalog" className="btn-hero">
                    Обрати автомобіль
                </Link>

                <div className="hero-features">
                    <div className="feature">
                        Швидка подача
                    </div>
                    <div className="feature">
                        Зручний сервіс
                    </div>
                    <div className="feature">
                        Кращі ціни
                    </div>
                </div>
            </div>
        </section>
    );
}