import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Помилка при виході:", error);
        }
    };

    return (
        <header className="site-header" style={{ background: '#14213d', padding: '15px 0' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="logo">
                    <Link to="/" style={{color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold'}}>
                        PolytechDrive
                    </Link>
                </div>
                
                <nav className="main-nav" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                    <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0 }}>
                        <li><Link to="/catalog" style={{ color: 'white', textDecoration: 'none' }}>Автомобілі</Link></li>
                        
                        {user && <li><Link to="/cabinet" style={{ color: 'white', textDecoration: 'none' }}>Мій кабінет</Link></li>}
                        
                        <li><Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>Про нас</Link></li>
                    </ul>
                    
                    <div className="auth-menu" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        {user ? (
                            <>
                                <span style={{ color: 'white', fontSize: '14px', opacity: 0.8 }}>{user.email}</span>
                                <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #FCA311', color: '#FCA311', padding: '5px 15px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>
                                    Вийти
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }}>Увійти</Link>
                                <Link to="/register" style={{ background: '#FCA311', color: 'white', textDecoration: 'none', padding: '7px 15px', borderRadius: '4px', fontWeight: 'bold', fontSize: '15px' }}>Реєстрація</Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}