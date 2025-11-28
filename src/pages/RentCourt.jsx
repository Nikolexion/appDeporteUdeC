import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock } from 'lucide-react';

export default function RentCourt() {
    const navigate = useNavigate();
    const [selectedGym, setSelectedGym] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const gyms = [
        { id: 1, name: 'Gimnasio A - Casa del Deporte', sport: 'Multiuso' },
        { id: 2, name: 'Gimnasio B - Casa del Deporte', sport: 'Básquetbol' },
        { id: 3, name: 'Cancha de Fútbol', sport: 'Fútbol' },
    ];

    const handleRent = (e) => {
        e.preventDefault();
        alert(`Reserva confirmada para ${selectedGym.name} el ${date} a las ${time}`);
        navigate('/home');
    };

    return (
        <div className="container">
            <button onClick={() => navigate('/home')} className="btn" style={{ padding: 0, justifyContent: 'flex-start', marginBottom: 'var(--spacing-lg)' }}>
                <ChevronLeft size={24} color="var(--color-primary)" />
                <span style={{ color: 'var(--color-primary)', marginLeft: '4px' }}>Volver al Inicio</span>
            </button>

            <h1 style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-md)' }}>Arrendar Cancha</h1>

            {!selectedGym ? (
                <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                    <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>Selecciona un recinto:</p>
                    {gyms.map(gym => (
                        <button
                            key={gym.id}
                            onClick={() => setSelectedGym(gym)}
                            className="card"
                            style={{ textAlign: 'left', border: 'none', cursor: 'pointer' }}
                        >
                            <h3 style={{ color: 'var(--color-primary)' }}>{gym.name}</h3>
                            <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>{gym.sport}</p>
                        </button>
                    ))}
                </div>
            ) : (
                <form onSubmit={handleRent} className="card">
                    <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-primary)' }}>{selectedGym.name}</h3>

                    <div className="input-group">
                        <label className="input-label"><Calendar size={16} style={{ display: 'inline', marginRight: '4px' }} /> Fecha</label>
                        <input
                            type="date"
                            className="input-field"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label"><Clock size={16} style={{ display: 'inline', marginRight: '4px' }} /> Hora</label>
                        <input
                            type="time"
                            className="input-field"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                        <button type="button" onClick={() => setSelectedGym(null)} className="btn btn-outline">
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Confirmar Reserva
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
