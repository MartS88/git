import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import {userEvent} from "@testing-library/user-event";


describe('App component', () => {
    test('should change input field', async () => {
        render(<App/>);
        const inputElement = screen.getByPlaceholderText('Enter todo, todo must contain more than 3 characters')
        expect(inputElement).toBeInTheDocument();
        await userEvent.type(inputElement, 'New Todo');
        expect(inputElement).toHaveDisplayValue('New Todo')
    })

    test('should add new todo then button is clicked', async () => {
        render(<App/>);
        const buttonElement = screen.getByRole('button', {name: 'Add todo'});
        const inputElement = screen.getByPlaceholderText('Enter todo, todo must contain more than 3 characters')
        expect(inputElement).toBeInTheDocument();
        await userEvent.type(inputElement, 'New Todo');
        expect(buttonElement).toBeInTheDocument();
        await userEvent.click(buttonElement);
        await waitFor(() => {
            expect(screen.getByText('New Todo'))
        }, {timeout: 1500});
    })


    test('should view InfoBlock then hoveredHandler is active and item.length > 25', async () => {
        const {container} = render(<App/>);
        const buttonElement = screen.getByRole('button', {name: 'Add todo'});
        const inputElement = screen.getByPlaceholderText('Enter todo, todo must contain more than 3 characters')
        expect(inputElement).toBeInTheDocument();
        await userEvent.type(inputElement, 'New Todooooooooooooooooooo');
        expect(buttonElement).toBeInTheDocument();
        await userEvent.click(buttonElement);
        await waitFor(() => {
            expect(screen.getByText('New Todoooooooooooooooooo...'))
        }, {timeout: 1500});

        const todoElement = screen.getByText('New Todoooooooooooooooooo...')
        expect(todoElement).toBeInTheDocument();

        fireEvent.mouseEnter(todoElement);
        await waitFor( () => {
            const infoBlock = container.querySelector('.info_block');
            expect(infoBlock).toBeInTheDocument();
        },{timeout: 500});

        fireEvent.mouseLeave(todoElement);
        await waitFor( () => {
            const infoBlock = container.querySelector('.info_block');
            expect(infoBlock).not.toBeInTheDocument();
        },{timeout: 500});
    })



})


//import axios from "axios";
// jest.mock('axios')
// test('fetches and displays data', async () => {
//
//     (axios.get as jest.Mock).mockResolvedValue({
//         data: [
//             { id: 1, email: 'Sincere@april.biz' },
//             { id: 2, email: 'Shanna@melissa.tv' },
//             { id: 3, email: 'Nathan@yesenia.net' },
//         ],
//     });
//
//     render(<App />);
//
//     await waitFor(() => {
//         expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();
//         expect(screen.getByText('Shanna@melissa.tv')).toBeInTheDocument();
//         expect(screen.getByText('Nathan@yesenia.net')).toBeInTheDocument();
//     });
// });