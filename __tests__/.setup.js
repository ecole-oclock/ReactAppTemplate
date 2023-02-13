// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

// Documentations
// CheatSheet RTL : https://testing-library.com/docs/react-testing-library/cheatsheet/
// Common mistakes with React Testing Library : https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
// Jest CheatSheet : https://devhints.io/jest
// Fix The Warning: An update inside a test was not wrapped in act(...): https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning

import 'dotenv-flow/config';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import '__mocks__/matchMedia.js';
import '__mocks__/keycloakMock';

global.URL.createObjectURL = jest.fn();
globalThis.ASYNC_VALIDATOR_NO_WARNING = 1;
