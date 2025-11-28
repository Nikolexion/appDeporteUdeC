import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

describe('User Flow Integration Test', () => {
    it('should isolate user state between sessions', async () => {
        render(<App />);

        // 1. Register User A
        fireEvent.click(screen.getByText(/Regístrate/i));

        fireEvent.change(screen.getByPlaceholderText('Juan Pérez'), { target: { value: 'User A' } });
        fireEvent.change(screen.getByPlaceholderText('ejemplo@udec.cl'), { target: { value: 'usera@udec.cl' } });

        const passwordInputs = screen.getAllByPlaceholderText('********');
        fireEvent.change(passwordInputs[0], { target: { value: 'password' } });
        fireEvent.change(passwordInputs[1], { target: { value: 'password' } });

        fireEvent.click(screen.getByText('Registrarse'));

        // Verify Home shows User A
        await waitFor(() => {
            expect(screen.getByText('User A')).toBeInTheDocument();
        });

        // 2. Go to Matches (formerly Find Team) and Join
        fireEvent.click(screen.getByText('Partidos'));

        // Find the first "Jugar" button and click it
        const playButtons = screen.getAllByText(/Jugar/i);
        fireEvent.click(playButtons[0]);

        // Verify it changes to "Voy"
        expect(screen.getByText(/Voy/i)).toBeInTheDocument();

        // 3. Logout
        fireEvent.click(screen.getByText('Volver al Inicio'));
        fireEvent.click(screen.getByText('Salir'));

        // 4. Register User B
        fireEvent.click(screen.getByText(/Regístrate/i));

        fireEvent.change(screen.getByPlaceholderText('Juan Pérez'), { target: { value: 'User B' } });
        fireEvent.change(screen.getByPlaceholderText('ejemplo@udec.cl'), { target: { value: 'userb@udec.cl' } });

        const passwordInputsB = screen.getAllByPlaceholderText('********');
        fireEvent.change(passwordInputsB[0], { target: { value: 'password' } });
        fireEvent.change(passwordInputsB[1], { target: { value: 'password' } });

        fireEvent.click(screen.getByText('Registrarse'));

        // Verify Home shows User B
        await waitFor(() => {
            expect(screen.getByText('User B')).toBeInTheDocument();
        });

        // 5. Go to Matches
        fireEvent.click(screen.getByText('Partidos'));

        // Verify User B sees "Jugar" (not "Voy") for the same post
        const playButtonsUserB = screen.getAllByText(/Jugar/i);
        expect(playButtonsUserB.length).toBeGreaterThan(0);

        // Ensure "Voy" is NOT present
        expect(screen.queryByText(/Voy/i)).not.toBeInTheDocument();
    });
});
