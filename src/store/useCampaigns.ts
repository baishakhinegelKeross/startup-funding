import { create } from 'zustand'
import axios from 'axios'

const useCampaignStore = create((set) => ({
    campaigns: [],
    loading: false,
    error: null,
    setCampaigns: (campaignsData: any) => set({ campaigns: campaignsData }),
    fetchAllCampaigns: async () => {
        set({ loading: true, error: null })
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/campaigns`)
            console.log('total campaigns', response.data)
            if (response.status === 200) {
                console.log('successfully fetched campaigns')
                set({ campaigns: response.data, loading: false })
                // Extract the unique categories from the campaigns if needed
            }
        } catch (error: any) {
            console.error('Error fetching campaigns:', error)
            set({ error: error.message, loading: false })
        }
    }
}))

export default useCampaignStore
