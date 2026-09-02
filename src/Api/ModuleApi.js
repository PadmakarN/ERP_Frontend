import axias from 'axios';
import { API_BASE_URL } from '../config';
export const getModules = async () => {
 try{
    const response=await axias.get(`${API_BASE_URL}/api/menu`);
    return response.data.menuData;
 }catch(error){        
    console.error("Error fetching modules:", error);
    throw error;
 }  

}