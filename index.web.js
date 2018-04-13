import { AppRegistry } from 'react-native';
import App from './App';
AppRegistry.registerComponent('MovieTrailer', () => App);
AppRegistry.runApplication('MovieTrailer', {
  rootTag: document.getElementById('react-app')
});
