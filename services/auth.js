import  http , {axiosInstance} from "../utils/http";


const signup = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Error during sign-up:", error);
    return error;
  }
};

const signin = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Error during sign-in:", error);
    return error;
  }
};

const forgotPassword = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/forgot-password", data);
    return response.data;
  } catch (error) {
    console.error("Error during forgot password:", error);
    return error;
  }
};

const resetPassword = async (data) => {
  try {
  const { token, password } = data;
    const response = await axiosInstance.put(`/auth/reset-password/${token}`, { password });
    return response.data;
  } catch (error) {
    console.error("Error during reset password:", error);
    return error;
  }
};

const getProfile = async (token) => {
  try {
    const response = await http.get(`/auth/profile/${token}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error("Error during get profile:", error);
    return error;
  }
};


export {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  getProfile  
};