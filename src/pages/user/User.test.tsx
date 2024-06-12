import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import User from './User';


describe('User component', () => {
  it('renders User', () => {


    render(<User name="User" age={36}/>);

    const nameElement = screen.getByLabelText('I agree to the terms and conditions')

    const jobLocationElement = screen.getByRole('combobox');
    const termsElement = screen.getByRole('checkbox');
    const submitButtonElement = screen.getByText('Submit')

    expect(nameElement).toBeInTheDocument();

    expect(jobLocationElement).toBeInTheDocument();
    expect(termsElement).toBeInTheDocument();
    expect(submitButtonElement).toBeInTheDocument();

  });
});
