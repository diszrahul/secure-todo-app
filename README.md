# secure-todo-app

Basic Overview:

Uses Expo
Uses Expo-Local-Authentication to login securely.
You can add, delete and change the todo types.
Uses Async storage for persistance
Unit Test cases: Uses Jest with testing-library/react-native
Tested on ios simulators iphone 11-13
Tested on Android Mi 11x

Installing and how to use:

Clone the repo: 
https://github.com/diszrahul/secure-todo-app

`cd` into root directory of the project
run: `yarn` into the root directory, this will install all the dependencies

Make sure you have ios or android environment with simulators in your system
If you don't have the ios or android environment in your system:
run: `yarn start`
This will generate a QR code in the metro bundler, which can be scanned using Expo app available on app and play store. Make sure to be on the same wifi network while running via expo app

For ios:
run: `yarn ios`

For android:
run: `yarn android`

To run tests:
`yarn test`
