import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Акаунт успішно створено!");
            navigate('/catalog');
        } catch (error) {
            alert("Помилка реєстрації: " + error.message);
        }
    };

    return (
        <div className="auth-container" style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', textAlign: 'center' }}>
            <h2>Реєстрація</h2>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                <input 
                    type="email" 
                    placeholder="Ваш Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <input 
                    type="password" 
                    placeholder="Пароль (мінімум 6 символів)" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <button type="submit" className="btn-rent" style={{ padding: '10px', fontSize: '16px', background: '#FCA311', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                    Зареєструватися
                </button>
            </form>
            <p style={{ marginTop: '15px' }}>
                Вже є акаунт? <Link to="/login" style={{ color: '#FCA311' }}>Увійти</Link>
            </p>
        </div>
    );
}