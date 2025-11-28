import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Trophy, Calendar, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Tournaments() {
    const navigate = useNavigate();
    const { tournaments, addTournament, teams, registerTeamToTournament, user } = useApp();
    const currentUser = user ? user.name : "Invitado";

    const [view, setView] = useState('list'); // 'list', 'create', 'details'
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [newTournament, setNewTournament] = useState({
        name: '',
        sport: 'Fútbol',
        date: '',
        prize: ''
    });
    const [selectedTeamId, setSelectedTeamId] = useState('');

    const handleCreate = (e) => {
        e.preventDefault();
        addTournament(newTournament);
        setView('list');
        setNewTournament({ name: '', sport: 'Fútbol', date: '', prize: '' });
    };

    const handleRegister = () => {
        if (!selectedTeamId) return;
        registerTeamToTournament(selectedTournament.id, parseInt(selectedTeamId));
        setSelectedTeamId('');
        // Refresh selected tournament data
        const updated = tournaments.find(t => t.id === selectedTournament.id);
        // Note: In a real app with async updates, we'd wait. Here we rely on re-render or just close.
        setView('list');
    };

    const myTeams = teams.filter(t => t.members?.includes(currentUser) && t.admin === currentUser);

    return (
        <div className="container">
            <button onClick={() => navigate('/home')} className="btn" style={{ padding: 0, justifyContent: 'flex-start', marginBottom: 'var(--spacing-lg)' }}>
                <ChevronLeft size={24} color="var(--color-primary)" />
                <span style={{ color: 'var(--color-primary)', marginLeft: '4px' }}>Volver al Inicio</span>
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                <h1 style={{ color: 'var(--color-primary)' }}>Torneos</h1>
                {view === 'list' && (
                    <button
                        onClick={() => setView('create')}
                        className="btn btn-primary"
                        style={{ width: 'auto', padding: '8px 12px', borderRadius: 'var(--radius-full)' }}
                    >
                        <Plus size={20} />
                    </button>
                )}
            </div>

            {view === 'create' && (
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
                        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Nuevo Torneo</h2>
                        <button onClick={() => setView('list')} style={{ background: 'none', border: 'none' }}><X size={24} /></button>
                    </div>
                    <form onSubmit={handleCreate}>
                        <div className="input-group">
                            <label className="input-label">Nombre del Torneo</label>
                            <input
                                type="text"
                                className="input-field"
                                value={newTournament.name}
                                onChange={(e) => setNewTournament({ ...newTournament, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Deporte</label>
                            <select
                                className="input-field"
                                value={newTournament.sport}
                                onChange={(e) => setNewTournament({ ...newTournament, sport: e.target.value })}
                            >
                                <option value="Fútbol">Fútbol</option>
                                <option value="Básquetbol">Básquetbol</option>
                                <option value="Vóleibol">Vóleibol</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label className="input-label">Fecha</label>
                            <input
                                type="date"
                                className="input-field"
                                value={newTournament.date}
                                onChange={(e) => setNewTournament({ ...newTournament, date: e.target.value })}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Premio (Opcional)</label>
                            <input
                                type="text"
                                className="input-field"
                                value={newTournament.prize}
                                onChange={(e) => setNewTournament({ ...newTournament, prize: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Crear Torneo</button>
                    </form>
                </div>
            )}

            {view === 'details' && selectedTournament && (
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
                        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>{selectedTournament.name}</h2>
                        <button onClick={() => setView('list')} style={{ background: 'none', border: 'none' }}><X size={24} /></button>
                    </div>
                    <p><strong>Deporte:</strong> {selectedTournament.sport}</p>
                    <p><strong>Fecha:</strong> {selectedTournament.date}</p>
                    <p><strong>Premio:</strong> {selectedTournament.prize || 'Honor y Gloria'}</p>
                    <p><strong>Equipos Inscritos:</strong> {selectedTournament.teams?.length || 0}</p>

                    <hr style={{ margin: '20px 0', borderColor: '#eee' }} />

                    <h3>Inscribir Equipo</h3>
                    {myTeams.length > 0 ? (
                        <div className="input-group">
                            <label className="input-label">Selecciona tu equipo</label>
                            <select
                                className="input-field"
                                value={selectedTeamId}
                                onChange={(e) => setSelectedTeamId(e.target.value)}
                            >
                                <option value="">-- Seleccionar --</option>
                                {myTeams.map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                            <button onClick={handleRegister} className="btn btn-primary" disabled={!selectedTeamId}>
                                Inscribir
                            </button>
                        </div>
                    ) : (
                        <p style={{ color: 'var(--color-danger)' }}>Necesitas ser administrador de un equipo para inscribirte.</p>
                    )}
                </div>
            )}

            {view === 'list' && (
                <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                    {tournaments.length === 0 && <p style={{ textAlign: 'center', color: '#999' }}>No hay torneos activos.</p>}
                    {tournaments.map(t => (
                        <div key={t.id} className="card" onClick={() => { setSelectedTournament(t); setView('details'); }} style={{ cursor: 'pointer' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Trophy size={24} color="var(--color-secondary)" />
                                <div>
                                    <h3 style={{ margin: 0, color: 'var(--color-primary)', fontSize: '1.1rem' }}>{t.name}</h3>
                                    <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>{t.sport} • {t.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
