import { API_ROUTE } from "../config";

export const query = async(method, endpoint, content = {}, token) => {
    const url = `${API_ROUTE}/${endpoint}`;
    const params = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : ''
        },
        body: Object.keys(content).length > 0 ? JSON.stringify(content) : undefined
    };

    try{
        const response = await fetch(url, params);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.error || response.statusText);
        }  

        return { data: responseData, error: null };
    } catch(error) {
        return { data: null, error: error.message };
    }
}