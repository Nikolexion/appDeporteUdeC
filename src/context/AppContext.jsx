import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [teams, setTeams] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([
        { id: 1, user: 'Juan Pérez', sport: 'Fútbol', missing: 2, going: [] },
        { id: 2, user: 'María González', sport: 'Tenis', missing: 1, going: [] },
    ]);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const addTeam = (team) => {
        setTeams([...teams, {
            ...team,
            id: Date.now(),
            members: [user?.name || 'Creador'],
            admin: user?.name || 'Creador'
        }]);
    };

    const deleteTeam = (teamId) => {
        setTeams(teams.filter(t => t.id !== teamId));
    };

    const addTournament = (tournament) => {
        setTournaments([...tournaments, { ...tournament, id: Date.now(), teams: [] }]);
    };

    const registerTeamToTournament = (tournamentId, teamId) => {
        setTournaments(tournaments.map(t => {
            if (t.id === tournamentId) {
                if (t.teams && t.teams.includes(teamId)) return t;
                return { ...t, teams: [...(t.teams || []), teamId] };
            }
            return t;
        }));
    };

    const addPost = (post) => {
        setPosts([...posts, { ...post, id: Date.now(), user: user?.name || 'Anónimo', going: [] }]);
    };

    const joinTeam = (teamId, userName) => {
        setTeams(teams.map(team => {
            if (team.id === teamId) {
                if (team.members.includes(userName)) return team;
                return { ...team, members: [...team.members, userName] };
            }
            return team;
        }));
    };

    const leaveTeam = (teamId, userName) => {
        setTeams(teams.map(team => {
            if (team.id === teamId) {
                return { ...team, members: team.members.filter(m => m !== userName) };
            }
            return team;
        }));
    };

    const joinPost = (postId, userName) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                const isGoing = post.going.includes(userName);
                return {
                    ...post,
                    going: isGoing
                        ? post.going.filter(u => u !== userName)
                        : [...post.going, userName]
                };
            }
            return post;
        }));
    };

    return (
        <AppContext.Provider value={{
            teams, addTeam, joinTeam, leaveTeam, deleteTeam,
            tournaments, addTournament, registerTeamToTournament,
            posts, addPost, joinPost,
            user, login, logout
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}
