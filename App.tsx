import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import LoginScreen from './src/LoginScreen';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <LoginScreen />
        </Provider>
    );
};

export default App;
