import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Register() {
    const navigate = useNavigate();
    const { login } = useApp();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email.endsWith('@udec.cl')) {
            alert('El correo debe ser institucional (@udec.cl)');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        login({ name: formData.name, email: formData.email });
        navigate('/home');
    };

    return (
        <div className="container">
            <button onClick={() => navigate(-1)} className="btn" style={{ padding: 0, justifyContent: 'flex-start', marginBottom: 'var(--spacing-lg)' }}>
                <ChevronLeft size={24} color="var(--color-primary)" />
                <span style={{ color: 'var(--color-primary)', marginLeft: '4px' }}>Volver</span>
            </button>

            <h1 style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-xl)' }}>Crear Cuenta</h1>

            <form onSubmit={handleSubmit} className="card">
                <div className="input-group">
                    <label className="input-label">Nombre Completo</label>
                    <input
                        type="text"
                        name="name"
                        className="input-field"
                        placeholder="Juan Pérez"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label className="input-label">Correo Electrónico</label>
                    <input
                        type="email"
                        name="email"
                        className="input-field"
                        placeholder="ejemplo@udec.cl"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label className="input-label">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        className="input-field"
                        placeholder="********"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label className="input-label">Confirmar Contraseña</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="input-field"
                        placeholder="********"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Registrarse
                </button>
            </form>
        </div>
    );
}
