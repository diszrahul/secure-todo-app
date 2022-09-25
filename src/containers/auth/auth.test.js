import React from 'react';
import Auth from './index';
import {render, fireEvent} from '@testing-library/react-native';
import '@testing-library/jest-dom';


it("Auth rendering", () => {
    const { getByTestId } = render(<Auth />);
    expect(getByTestId("001")).toBeTruthy();
});