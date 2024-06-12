import React from 'react';
import { fireEvent,  logRoles, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Skills from './Skills';


describe('User component', () => {
  const skills = ['REACT', 'NODEJS', 'WEB3'];

  it('renders correctly', () => {
    render(<Skills skills={skills} />);

    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument()
  });

  it('renders a list of skills', () => {
    render(<Skills skills={skills} />);
    const listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(skills.length);
  });

  it('renders a login button', () => {
    render(<Skills skills={skills} />);
    const loginButton = screen.getByRole('button', {
      name: 'Log in',
    });
    expect(loginButton).toBeInTheDocument();
  });
  it('Log out button is not rendering', () => {
    render(<Skills skills={skills} />);
    const isLogged = false;
    const logOutButton = screen.queryByRole('button', {
      name: 'Log out',
    });
    expect(logOutButton).not.toBeInTheDocument();
  });
  it('Log out button is eventually displayed', async () => {
    const view = render(<Skills skills={skills} />);
    logRoles(view.container);
    screen.debug();
    const logInButton = screen.getByRole('button', { name: 'Log in' });
    fireEvent.click(logInButton);

    await waitFor(() => {
      const logOutButton = screen.getByRole('button', { name: 'Log out' });
      expect(logOutButton).toBeInTheDocument();
    });
    screen.debug();
  });

  it('Counter renders correctly', () => {
    render(<Skills skills={skills} />);

    const countElement = screen.getByText('0');
    const counterButtonElement = screen.getByRole('button', {
      name: 'Counter',
    });
    expect(countElement).toBeInTheDocument();
    expect(counterButtonElement).toBeInTheDocument();
  });

  it('Counter renders a count of 1 after clicking the counter button', async () => {
    render(<Skills skills={skills} />);

    const counterButtonElement = screen.getByRole('button', { name: 'Counter' });
    await userEvent.click(counterButtonElement);

    const countElement = screen.getByText('1');
    expect(countElement).toBeInTheDocument();
  });

  it('Counter renders a count of 2 after twice clicking the counter button', async () => {
    render(<Skills skills={skills} />);

    const counterButtonElement = screen.getByRole('button', { name: 'Counter' });
    await userEvent.click(counterButtonElement);
    await userEvent.click(counterButtonElement);

    const countElement = screen.getByText('2');
    expect(countElement).toBeInTheDocument();
  });

  it('Counter renders a count of 2 after twice clicking the counter button', async () => {
    render(<Skills skills={skills} />);

  });

  it('Renders a count of 10 after clicking the set button', async () => {
    render(<Skills skills={skills} />);

    const countElement = screen.getByText('0');
    const buttonElement = screen.getByRole('button', { name: 'Set' });
    const inputElement = screen.getByRole('textbox');


    expect(inputElement).toHaveValue('1');
    await userEvent.type(inputElement, '10');
    await userEvent.click(buttonElement);
    expect(countElement).toHaveTextContent('10');


  });

  it('Renders a counterButton have focus()', async () => {
    render(<Skills skills={skills} />);

    const counterButtonElement = screen.getByRole('button', {
      name: 'Counter',
    });
    const inputElement = screen.getByRole('textbox');
    const setButtonElement = screen.getByRole('button', {
      name: 'Set',
    });
    await userEvent.tab();
    expect(counterButtonElement).toHaveFocus();
    await userEvent.tab();
    expect(inputElement).toHaveFocus();
    await userEvent.tab();
    expect(setButtonElement).toHaveFocus()
  });

  it('Renders a inputElement has cleared', async () => {
    render(<Skills skills={skills} />);
    const inputElement = screen.getByRole('textbox');
    await userEvent.clear(inputElement);
    expect(inputElement).toHaveValue('')
  })
});