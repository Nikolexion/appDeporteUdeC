import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Mail } from 'lucide-react';

export default function Recovery() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        // Mock email sending
    };

    return (
        <div className="container">
            <button onClick={() => navigate(-1)} className="btn" style={{ padding: 0, justifyContent: 'flex-start', marginBottom: 'var(--spacing-lg)' }}>
                <ChevronLeft size={24} color="var(--color-primary)" />
                <span style={{ color: 'var(--color-primary)', marginLeft: '4px' }}>Volver</span>
            </button>

            <h1 style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-md)' }}>Recuperar Contraseña</h1>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-light)' }}>
                Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña.
            </p>

            {!sent ? (
                <form onSubmit={handleSubmit} className="card">
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

                    <button type="submit" className="btn btn-primary">
                        Enviar Correo
                    </button>
                </form>
            ) : (
                <div className="card text-center">
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-md)' }}>
                        <Mail size={48} color="var(--color-secondary)" />
                    </div>
                    <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>¡Correo Enviado!</h3>
                    <p className="text-sm mb-4">Revisa tu bandeja de entrada.</p>
                    <button onClick={() => navigate('/')} className="btn btn-outline">
                        Volver al Inicio
                    </button>
                </div>
            )}
        </div>
    );
}
