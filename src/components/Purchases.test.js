import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import React from "react";


import { act } from "react-dom/test-utils";
import App from '../App';

test('renders purchases header', async () => {
    await act(async () => {
        render(<App />)
    })
  expect(screen.getByTestId("purchases")).toBeInTheDocument();
});

test('calls the api', async () => {
    const testProduct = {
        id: "1",
        name: "auxiliary"
    }

  global.fetch = jest.fn(() => 
    Promise.resolve({
        json: () => Promise.resolve(testProduct) 
    })
  )
    await act(async () => {
        render(<App />)
    })
    await expect(fetch).toHaveBeenCalledTimes(1)
})