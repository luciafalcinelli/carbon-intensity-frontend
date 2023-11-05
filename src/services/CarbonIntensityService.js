import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const CarbonIntensityService = {
  async getData(formData) {
    const response = await axios.post(`${BASE_URL}/getData`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
  // Add other service methods as needed
};

export default CarbonIntensityService;
