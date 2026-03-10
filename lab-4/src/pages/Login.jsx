import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Ви успішно увійшли!");
            navigate('/catalog');
        } catch (error) {
            alert("Помилка входу: " + error.message);
        }
    };

    return (
        <div className="auth-container" style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', textAlign: 'center' }}>
            <h2>Вхід в акаунт</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
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
                    placeholder="Пароль" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <button type="submit" className="btn-rent" style={{ padding: '10px', fontSize: '16px', background: '#FCA311', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                    Увійти
                </button>
            </form>
            <p style={{ marginTop: '15px' }}>
                Немає акаунту? <Link to="/register" style={{ color: '#FCA311' }}>Зареєструватися</Link>
            </p>
        </div>
    );
}