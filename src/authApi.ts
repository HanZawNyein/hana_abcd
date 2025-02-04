import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define Types
interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    session_id: string;
    uid: number;
    user_context: Record<string, any>;
    company_id: number;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8069', // Adjust to your Odoo server URL
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
        responseHandler: async (response) => {
            const data = await response.json(); // Get the response body
            const sessionId = response.headers.get('Set-Cookie'); // Extract cookie from headers
            console.log('Response Headers:', response.headers);
            console.log('Session ID:', sessionId);
            return { data, headers: response.headers };
        },// Ensures cookies (session_id) are stored
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/api/login',
                method: 'POST',
                body: {login:credentials.email, password:credentials.password},
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi;
