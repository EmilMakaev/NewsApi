import React from 'react';
import 'react-native-gesture-handler';

import Navigator from './src/navigations';
import StoreProvider from './src/stores/storeProvider';

const App = () => (
  <StoreProvider>
    <Navigator />
  </StoreProvider>
);

export default App;
