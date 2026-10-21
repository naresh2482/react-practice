import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import userEvent from '@testing-library/user-event';

import DoctorSearch from '../../src/excercises/01-doctor-search/DoctorSearch';

describe('DoctorSearch Component', () => {
    it('renders the search input', () => {
        render(<DoctorSearch />);
        const inputElement = screen.getByRole('textbox');

        expect(inputElement).toBeInTheDocument();
    });

    it('filters doctors based on search input', async () => {
        render(<DoctorSearch />);
        const inputElement = screen.getByRole('textbox');

        await userEvent.type(inputElement, 'Rahul');

        const doctorElement = screen.getByText(/Rahul Sharma/i);
        expect(doctorElement).toBeInTheDocument();
    });

    it('displays "No doctors found" when no matches', async () => {
        render(<DoctorSearch />);
        const inputElement = screen.getByRole('textbox');

        await userEvent.type(inputElement, 'NonExistentDoctor');

        const noDoctorsElement = screen.getByText(/No doctors found/i);
        expect(noDoctorsElement).toBeInTheDocument();
    });

    it('clears the search input when Clear Search button is clicked', async () => {
        render(<DoctorSearch />);
        const inputElement = screen.getByRole('textbox');
        const clearButton = screen.getByRole('button', { name: /Clear Search/i });

        await userEvent.type(inputElement, 'Rahul');
        expect(inputElement).toHaveValue('Rahul');

        await userEvent.click(clearButton);
        expect(inputElement).toHaveValue('');
    });
});