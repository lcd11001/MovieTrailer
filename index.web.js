import React from 'react';
import { render } from 'react-dom';
import App from './App';

const wrapper = document.getElementById('react-app');

wrapper ? render(<App />, wrapper) : false;
