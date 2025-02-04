import React, { useState } from 'react';
import {View, Text, TextInput, Button, Alert, SafeAreaView} from 'react-native';
import { useLoginMutation } from './authApi';
import { useDispatch } from 'react-redux';
import { setUser } from './authSlice';
import { AppDispatch } from './store';

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [login, { isLoading }] = useLoginMutation();
    const dispatch: AppDispatch = useDispatch();

    const handleLogin = async () => {
        console.log('login now');
        try {
            const response = await login({ email, password }).unwrap();
            // @ts-ignore
            console.log('this is response', response);
            console.log(response);
            // @ts-ignore
            dispatch(setUser(response)); // Store user data & token
            Alert.alert(JSON.stringify(response.headers['map']['set-cookie']));
            console.log(response);
            console.log(response);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
       <SafeAreaView>
           <View style={{ padding: 20 }}>
               <Text>Email</Text>
               <TextInput
                   value={email}
                   onChangeText={setEmail}
                   style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
               />

               <Text>Password</Text>
               <TextInput
                   value={password}
                   onChangeText={setPassword}
                   secureTextEntry
                   style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
               />

               <Button title={isLoading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={isLoading} />
           </View>
       </SafeAreaView>
    );
};

export default LoginScreen;
