import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // You can enable this for navigation after login
import authStore from '@/store/authStore'; // Update the path to your Zustand store

interface LoginPayload {
    email: string;
    password: string;
}

const useLogin = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL as string; // Use NEXT_PUBLIC for environment variables in Next.js
    const router = useRouter(); // Enable routing after successful login

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Access Zustand store methods
    const { setUserData } = authStore();

    const login = async (payload: LoginPayload): Promise<void> => {
        console.log("Login Payload:", payload); // Log the payload before sending it

        setIsLoading(true);
        setError(null);

        try {
            // const response = await axios.post(`${apiUrl}/user/login`, payload); // Directly using axios
            // if (response.status !== 200) {
            //     throw new Error(response.data.message || 'Login failed');
            // }
            const user = {
                id: 1,
                email: 'token@gmail.com',
                name: 'Token User',
                role: 'user',
            }
            const token = 'tokenalksdnf vsdmvf93w84ycrj9fwacbv';

            
            // Save token or handle authentication response
            // const { token, user } = response.data;
            
            // Update Zustand store with user data
            setUserData({ ...user, tokens: token });
            
            // Redirect to a dashboard or homepage after successful login
            router.push('/dashboard');
        } catch (error: any) {
            console.error(error);
            const errorMessage = error?.response?.data?.message || 'Error while logging in';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        error,
        isLoading,
        login,
    };
};

export default useLogin;
