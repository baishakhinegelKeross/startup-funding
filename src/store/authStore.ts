import { create } from 'zustand';

interface UserData {
    tokens?: string;
    [key: string]: any;
}

interface AuthStore {
    userData: UserData | null;
    setUserData: (userData: UserData) => void;
    clearUserData: () => void;
}

const authStore = create<AuthStore>((set) => ({
    userData: (() => {
        const storedValue = localStorage.getItem('userData');
        try {
            return storedValue ? JSON.parse(storedValue) : null;
        } catch (e) {
            console.error('Error parsing localStorage item:', e);
            return null;
        }
    })(),
    setUserData: (userData) => {
        set({ userData });
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('User Data:', userData);
    },
    clearUserData: () => {
        set({ userData: null });
        localStorage.removeItem('userData');
    },
}));

export default authStore;
