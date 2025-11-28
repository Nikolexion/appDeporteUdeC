import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useApp();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login logic - in real app would validate against backend
        // For now, just create a user object based on email
        const name = email.split('@')[0];
        login({ name: name, email: email });
        navigate('/home');
    };

    return (
        <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="text-center mb-4">
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'var(--color-primary)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--spacing-lg)'
                }}>
                    <User size={40} color="white" />
                </div>
                <h1 style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-sm)' }}>Bienvenido</h1>
                <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>Inicia sesión para continuar</p>
            </div>

            <form onSubmit={handleLogin} className="card">
                <div className="input-group">
                    <label className="input-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="input-field"
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label className="input-label">Contraseña</label>
                    <input
                        type="password"
                        className="input-field"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary mb-4">
                    Iniciar Sesión
                </button>

                <div className="text-center text-sm">
                    <Link to="/recovery" style={{ color: 'var(--color-primary)', textDecoration: 'none', display: 'block', marginBottom: 'var(--spacing-md)' }}>
                        ¿Olvidaste tu contraseña?
                    </Link>
                    <p>
                        ¿No tienes cuenta?{' '}
                        <Link to="/register" style={{ color: 'var(--color-secondary)', fontWeight: 'bold', textDecoration: 'none' }}>
                            Regístrate
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
