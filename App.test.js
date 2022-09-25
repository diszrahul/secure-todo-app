import React from 'react';
import App from './App.js';
import {render} from '@testing-library/react-native';
import '@testing-library/jest-dom';
import { waitFor } from "@testing-library/react-native";


it("has the correct title in the button", () => {
    const { getByText } = render(<App />);
    expect(getByText("Today's tasks")).toBeTruthy();
});