import { API_ROUTE } from "../config";

export const query = async(method, endpoint, content = {}, token) => {
    const url = `${apiRoute}/${endpoint}`;
    const params = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : ''
        },
        body: Object.keys(content).length > 0 ? JSON.stringify(content) : undefined
    };

    try{
        const response = await fetch(url, params);
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
    } catch(error) {
        throw new Error(error.message);
    }
}