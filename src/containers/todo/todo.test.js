import React from 'react';
import Todo from './index';
import {render, fireEvent} from '@testing-library/react-native';
import '@testing-library/jest-dom';


it("has the correct title in the button", () => {
    const { getByText } = render(<Todo />);
    expect(getByText("Today's tasks")).toBeTruthy();
});

// create an item
it("should create an item", () => {
    // Get all the required details
    const { getByText, getByPlaceholderText } = render(<Todo />);
    const addItemButton = getByText("+");
    const textInput = getByPlaceholderText('Write a task');
    const createdText = 'first item';

    // fire events
    fireEvent.changeText(textInput, createdText);
    fireEvent.press(addItemButton);

    // check assertions
    const createdItem = getByText(createdText);
    expect(createdItem).toBeTruthy();
})

// create multiple items
it("should create multiple items", () => {
    // Get all the required details
    const { getByText, getByPlaceholderText } = render(<Todo />);
    const addItemButton = getByText("+");
    const textInput = getByPlaceholderText('Write a task');
    const createdText_1 = 'first item';
    const createdText_2 = 'second item';

    // fire events
    fireEvent.changeText(textInput, createdText_1);
    fireEvent.press(addItemButton);

    fireEvent.changeText(textInput, createdText_2);
    fireEvent.press(addItemButton);

    // check assertions
    const createdItem_1 = getByText(createdText_1);
    const createdItem_2 = getByText(createdText_2);
    expect(createdItem_1).toBeTruthy();
    expect(createdItem_2).toBeTruthy();
})

// delete an item
it("should delete an item", () => {
    // Get all the required details
    const { getByText, getByPlaceholderText, queryByText, getByTestId } = render(<Todo />);
    const addItemButton = getByText("+");
    const textInput = getByPlaceholderText('Write a task');
    const createdText = 'first item';

    // fire events
    fireEvent.changeText(textInput, createdText);
    fireEvent.press(addItemButton);

    const deleteItemButton = getByTestId("deleteIcon");
    fireEvent.press(deleteItemButton);

    // check assertions
    const deletedItem = queryByText(createdText);
    expect(deletedItem).toBeNull();
})


// Should throw error if adding todo without text
it("Should throw error if adding todo without text", () => {
    const { getByText} = render(<Todo />);
    const addItemButton = getByText("+");

    // fire events
    fireEvent.press(addItemButton);

    const errorTextItem = getByText('Please enter a valid text');

    // check assertions
    expect(errorTextItem).toBeTruthy();

})

// should remove error when valid text is entered
it("should remove error when valid text is entered", () => {
    const { getByText, getByPlaceholderText, queryByText} = render(<Todo />);
    const addItemButton = getByText("+");

    // fire events
    fireEvent.press(addItemButton);

    const textInput = getByPlaceholderText('Write a task');

    fireEvent.changeText(textInput, 'Valid text');
    const errorTextItem = queryByText('Please enter a valid text');

    // check assertions
    expect(errorTextItem).toBeNull();

})