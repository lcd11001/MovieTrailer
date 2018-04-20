import injectTapEventPlugin from 'react-tap-event-plugin';

try {
  injectTapEventPlugin();
} catch (e) {
  console.log(e);
}
