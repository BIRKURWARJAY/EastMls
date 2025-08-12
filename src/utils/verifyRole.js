import toast from "react-hot-toast";
import { api } from "./api";

export async function verifyRole(role) {

  try {
    const response = await api.get('/auth/verifyRole')

    console.log(response.status);
    
    if (role === 'all') {
      return true
    }

    if (response.status === 220  || !response) {
      return 'login required'
    }

    if (role !==  response.data.role) {
      return false;
    }


    return true;
  } catch (error) {
    console.error(error);
    return '/login'
  }
}