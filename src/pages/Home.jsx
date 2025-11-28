import { Bell, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Home() {
    const { user, logout } = useApp();
    const navigate = useNavigate();

    const userName = user ? user.name : "Invitado";

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const options = [
        { id: 1, title: 'Arrendar una cancha', icon: '🎾', color: '#003366', path: '/rent' },
        { id: 2, title: 'Partidos', icon: '🔍', color: '#004080', path: '/matches' },
        { id: 3, title: 'Equipos', icon: 'users', color: '#0059b3', path: '/teams' },
        { id: 4, title: 'Torneos', icon: '🏆', color: '#0073e6', path: '/tournaments' },
    ];

    return (
        <div className="container">
            {/* Header */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-xl)', paddingTop: 'var(--spacing-md)' }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <User size={40} />
                    <div>
                        <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>Hola,</p>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-text)', maxWidth: '200px', lineHeight: '1.2' }}>
                            {userName}
                        </h2>
                        <div style={{ height: '4px', width: '40px', background: 'var(--color-secondary)', marginTop: '4px' }}></div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <button className="btn" style={{ width: 'auto', padding: 'var(--spacing-sm)', border: '1px solid var(--color-secondary)', borderRadius: 'var(--radius-md)' }}>
                        <Bell size={24} color="var(--color-primary)" />
                    </button>
                    <button onClick={handleLogout} className="btn" style={{ width: 'auto', padding: 'var(--spacing-sm)', background: 'var(--color-danger)', color: 'white', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontSize: '0.8rem' }}>
                        Salir
                    </button>
                </div>
            </header>

            <p style={{ color: 'var(--color-primary)', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>
                ¿Qué deseas hacer hoy?
            </p>

            <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                {options.map((opt) => (
                    <Link
                        to={opt.path}
                        key={opt.id}
                        className="card"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 'var(--spacing-lg)',
                            cursor: 'pointer',
                            border: 'none',
                            textAlign: 'left',
                            width: '100%',
                            textDecoration: 'none'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'var(--color-background)',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                {opt.icon === 'users' ? '👥' : opt.icon}
                            </div>
                            <span style={{ fontWeight: '600', color: 'var(--color-primary)', fontSize: '1rem' }}>
                                {opt.title}
                            </span>
                        </div>
                        <span style={{ color: 'var(--color-text-light)' }}>→</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
