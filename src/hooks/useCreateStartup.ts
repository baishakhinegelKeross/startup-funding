import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 

interface FormData {
    campaignTitle: string;
    campaignDescription: string;
    campaignCategory: string;
    proofOfEligibility: string;
    motivationLetter: string;
    personalizedMessage: string;
    name: string;
    phone: string;
    address: string;
    email: string;
    fundingType: string;
    targetAmount: string;
    deadline: string;
    minInvestment: string;
}

const useCreateStartup = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL as string; // Use NEXT_PUBLIC for environment variables in Next.js
    // const router = useRouter(); // Enable routing to redirect after successful startup creation

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const createStartup = async (payload: FormData): Promise<void> => {
        console.log("Startup Payload:", payload); // Log the payload before sending it

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${apiUrl}/startup/create`, payload); // Sending request using axios
            if (response.status !== 201) {
                throw new Error(response.data.message || 'Startup creation failed');
            }
            // Redirect to a success page or dashboard after successful startup creation
            // router.push('/startups/dashboard');
        } catch (error: any) {
            console.error(error);
            const errorMessage = error?.response?.data?.message || 'Error while creating startup';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        error,
        isLoading,
        createStartup,
    };
};

export default useCreateStartup;
