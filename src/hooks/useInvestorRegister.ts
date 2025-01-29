import { useState } from 'react';
import axios from 'axios';

interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  investmentFocus: string;
  investmentBudget: string;
  investmentSector: string;
  investmentExperience: string;
  linkedInProfile: string;
  role: string; // Role is now required
}

const useInvestorRegister = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const register = async (payload: RegisterPayload): Promise<void> => {

    setIsLoading(true);
    setError(null);

    try {
      // Add the investor role to the payload
      const payloadWithRole = { ...payload, role: 'investor' };
      

      // Log the payload to the console
      console.log('Payload being sent:', payloadWithRole);

      const response = await axios.post(`${apiUrl}/investor/register`, payloadWithRole);
      if (response.status !== 201) {
        throw new Error(response.data.message || 'Registration failed');
      }
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

export default useInvestorRegister;
