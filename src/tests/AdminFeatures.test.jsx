import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AppProvider, useApp } from '../context/AppContext';
import Teams from '../pages/Teams';
import Tournaments from '../pages/Tournaments';
import { BrowserRouter } from 'react-router-dom';

// Mock components to simplify testing
const TestComponent = () => {
    const { addTeam, teams, user, login, deleteTeam } = useApp();
    return (
        <div>
            <button onClick={() => login({ name: 'Admin User', email: 'admin@test.com' })}>Login Admin</button>
            <button onClick={() => login({ name: 'Member User', email: 'member@test.com' })}>Login Member</button>
            <button onClick={() => addTeam({ name: 'Test Team', sport: 'Fútbol' })}>Create Team</button>
            <div data-testid="team-list">
                {teams.map(t => (
                    <div key={t.id} data-testid={`team-${t.name}`}>
                        {t.name} - Admin: {t.admin}
                        {t.admin === user?.name && <button onClick={() => deleteTeam(t.id)}>Delete</button>}
                    </div>
                ))}
            </div>
        </div>
    );
};

describe('Team Administration', () => {
    it('assigns creator as admin', () => {
        render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        );

        fireEvent.click(screen.getByText('Login Admin'));
        fireEvent.click(screen.getByText('Create Team'));

        const teamDiv = screen.getByTestId('team-Test Team');
        expect(teamDiv).toHaveTextContent('Admin: Admin User');
    });

    it('allows admin to delete team', () => {
        render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        );

        fireEvent.click(screen.getByText('Login Admin'));
        fireEvent.click(screen.getByText('Create Team'));

        const deleteBtn = screen.getByText('Delete');
        fireEvent.click(deleteBtn);

        expect(screen.queryByTestId('team-Test Team')).not.toBeInTheDocument();
    });

    it('does not allow non-admin to see delete button', () => {
        render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        );

        // Admin creates team
        fireEvent.click(screen.getByText('Login Admin'));
        fireEvent.click(screen.getByText('Create Team'));

        // Switch to Member
        fireEvent.click(screen.getByText('Login Member'));

        expect(screen.queryByText('Delete')).not.toBeInTheDocument();
    });
});
