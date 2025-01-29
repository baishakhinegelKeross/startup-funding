import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Use useRouter here inside the hook

interface RegisterPayload {
    fullName: string;
    email: string;
    password: string;
    companyName: string;
    industry: string;
    role: string; // Added role field
}

const useRegister = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL as string; // Use NEXT_PUBLIC for environment variables in Next.js
    // const router = useRouter(); 

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const register = async (payload: RegisterPayload): Promise<void> => {
        console.log("Payload:", payload); // Log the payload before sending it

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${apiUrl}/user/register`, payload); // Directly using axios
            if (response.status !== 201) {
                throw new Error(response.data.message || 'Registration failed');
            }
            // router.push('/login');
        } catch (error: any) {
            console.error(error);
            const errorMessage = error?.response?.data?.message || 'Error while registering';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        error,
        isLoading,
        register,
    };
};

export default useRegister;
