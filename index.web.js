import { hot } from 'react-hot-loader';

import './src/utils/injectTap';

import React from 'react';
import { render } from 'react-dom';
// import App from './App';
import App from './src/LearningMaterialUI/App';

function init() {
  render(<App />, document.getElementById('react-app'))
}

init();

module.hot.accept(init);
