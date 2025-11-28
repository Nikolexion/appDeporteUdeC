import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, UserPlus, Check, Plus, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Matches() {
    const navigate = useNavigate();
    const { posts, joinPost, addPost, user } = useApp();
    const currentUser = user ? user.name : "Invitado";
    const [showCreate, setShowCreate] = useState(false);
    const [newPost, setNewPost] = useState({ sport: 'Fútbol', missing: 1, description: '' });

    const handleCreate = (e) => {
        e.preventDefault();
        addPost(newPost);
        setShowCreate(false);
        setNewPost({ sport: 'Fútbol', missing: 1, description: '' });
    };

    return (
        <div className="container">
            <button onClick={() => navigate('/home')} className="btn" style={{ padding: 0, justifyContent: 'flex-start', marginBottom: 'var(--spacing-lg)' }}>
                <ChevronLeft size={24} color="var(--color-primary)" />
                <span style={{ color: 'var(--color-primary)', marginLeft: '4px' }}>Volver al Inicio</span>
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                <div>
                    <h1 style={{ color: 'var(--color-primary)' }}>Partidos</h1>
                    <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>Únete o crea una solicitud.</p>
                </div>
                <button
                    onClick={() => setShowCreate(true)}
                    className="btn btn-primary"
                    style={{ width: 'auto', padding: '8px 12px', borderRadius: 'var(--radius-full)' }}
                >
                    <Plus size={20} />
                </button>
            </div>

            {showCreate && (
                <div className="card" style={{ marginBottom: 'var(--spacing-lg)', border: '1px solid var(--color-secondary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>Crear Solicitud</h3>
                        <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                    </div>
                    <form onSubmit={handleCreate}>
                        <div className="input-group">
                            <label className="input-label">Deporte</label>
                            <select
                                className="input-field"
                                value={newPost.sport}
                                onChange={(e) => setNewPost({ ...newPost, sport: e.target.value })}
                            >
                                <option value="Fútbol">Fútbol</option>
                                <option value="Básquetbol">Básquetbol</option>
                                <option value="Vóleibol">Vóleibol</option>
                                <option value="Tenis">Tenis</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label className="input-label">Faltan Jugadores</label>
                            <input
                                type="number"
                                min="1"
                                className="input-field"
                                value={newPost.missing}
                                onChange={(e) => setNewPost({ ...newPost, missing: parseInt(e.target.value) })}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Publicar</button>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                {posts.map(post => {
                    const isGoing = post.going.includes(currentUser);
                    return (
                        <div key={post.id} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-sm)' }}>
                                <div>
                                    <h3 style={{ color: 'var(--color-primary)', fontSize: '1rem' }}>{post.sport}</h3>
                                    <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>Organiza: {post.user}</p>
                                </div>
                                <span style={{ background: 'var(--color-secondary)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                    Faltan {post.missing}
                                </span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--spacing-md)' }}>
                                <div className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                                    {post.going.length > 0 ? `${post.going.length} apuntados` : 'Sé el primero'}
                                </div>
                                <button
                                    onClick={() => joinPost(post.id, currentUser)}
                                    className={`btn ${isGoing ? 'btn-outline' : 'btn-primary'}`}
                                    style={{ width: 'auto', padding: 'var(--spacing-sm) var(--spacing-md)', fontSize: '0.9rem' }}
                                >
                                    {isGoing ? (
                                        <>
                                            <Check size={16} style={{ marginRight: '4px' }} /> Voy
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus size={16} style={{ marginRight: '4px' }} /> Jugar
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
