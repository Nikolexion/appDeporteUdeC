import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Users, LogOut, Search, Filter, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Teams() {
    const navigate = useNavigate();
    const { teams, addTeam, joinTeam, leaveTeam, deleteTeam, user } = useApp();
    const currentUser = user ? user.name : "Invitado";

    const [view, setView] = useState('list'); // 'list' or 'create'
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSport, setFilterSport] = useState('Todos');
    const [newTeam, setNewTeam] = useState({ name: '', sport: 'Fútbol' });

    const handleCreate = (e) => {
        e.preventDefault();
        addTeam(newTeam);
        setView('list');
        setNewTeam({ name: '', sport: 'Fútbol' });
    };

    const filteredTeams = teams.filter(team => {
        const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSport = filterSport === 'Todos' || team.sport === filterSport;
        return matchesSearch && matchesSport;
    });

    return (
        <div className="container">
            <button onClick={() => navigate('/home')} className="btn" style={{ padding: 0, justifyContent: 'flex-start', marginBottom: 'var(--spacing-lg)' }}>
                <ChevronLeft size={24} color="var(--color-primary)" />
                <span style={{ color: 'var(--color-primary)', marginLeft: '4px' }}>Volver al Inicio</span>
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                <h1 style={{ color: 'var(--color-primary)' }}>Equipos</h1>
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

            {view === 'create' ? (
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
                        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Nuevo Equipo</h2>
                        <button onClick={() => setView('list')} style={{ background: 'none', border: 'none' }}><X size={24} /></button>
                    </div>
                    <form onSubmit={handleCreate}>
                        <div className="input-group">
                            <label className="input-label">Nombre del Equipo</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Ej: Los Leones"
                                value={newTeam.name}
                                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Deporte</label>
                            <select
                                className="input-field"
                                value={newTeam.sport}
                                onChange={(e) => setNewTeam({ ...newTeam, sport: e.target.value })}
                            >
                                <option value="Fútbol">Fútbol</option>
                                <option value="Básquetbol">Básquetbol</option>
                                <option value="Vóleibol">Vóleibol</option>
                                <option value="Tenis">Tenis</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Crear Equipo</button>
                    </form>
                </div>
            ) : (
                <>
                    {/* Search and Filter */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: 'var(--spacing-md)' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                            <input
                                type="text"
                                placeholder="Buscar equipo..."
                                className="input-field"
                                style={{ paddingLeft: '35px' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="input-field"
                            style={{ width: 'auto' }}
                            value={filterSport}
                            onChange={(e) => setFilterSport(e.target.value)}
                        >
                            <option value="Todos">Todos</option>
                            <option value="Fútbol">Fútbol</option>
                            <option value="Básquetbol">Básquetbol</option>
                            <option value="Vóleibol">Vóleibol</option>
                        </select>
                    </div>

                    <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                        {filteredTeams.length === 0 && <p style={{ textAlign: 'center', color: '#999' }}>No se encontraron equipos.</p>}
                        {filteredTeams.map(team => {
                            const isMember = team.members?.includes(currentUser);
                            const isAdmin = team.admin === currentUser;
                            return (
                                <div key={team.id} className="card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h3 style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>{team.name}</h3>
                                            <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                                                {team.sport} • {team.members?.length || 0} miembros
                                                {isAdmin && <span style={{ marginLeft: '8px', color: 'var(--color-secondary)', fontWeight: 'bold' }}>(Admin)</span>}
                                            </p>
                                        </div>
                                        {isAdmin ? (
                                            <button
                                                onClick={() => deleteTeam(team.id)}
                                                className="btn btn-outline"
                                                style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem', color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}
                                            >
                                                <LogOut size={16} style={{ marginRight: '4px' }} /> Eliminar
                                            </button>
                                        ) : isMember ? (
                                            <button
                                                onClick={() => leaveTeam(team.id, currentUser)}
                                                className="btn btn-outline"
                                                style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem', color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}
                                            >
                                                <LogOut size={16} style={{ marginRight: '4px' }} /> Salir
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => joinTeam(team.id, currentUser)}
                                                className="btn btn-primary"
                                                style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem' }}
                                            >
                                                <Users size={16} style={{ marginRight: '4px' }} /> Unirme
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
