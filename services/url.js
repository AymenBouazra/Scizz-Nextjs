import  http , {axiosInstance} from "../utils/http";


const create = async (data) => {
  try {
    const response = await axiosInstance.post("/shorten", data);
    return response;
  } catch (error) {
    console.error("Error during create:", error);
    return error;
  }
};

const findOne = async (id) => {
  try {
    const response = await http.get(`/shorten/${id}`);
    return response;
  } catch (error) {
    console.error("Error during findOne:", error);
    return error;
  }
};

const removeUrlFromUser = async (id, token) => {
  try {
    const response = await http.patch(`/shorten/${id}`, {token});
    return response;
  } catch (error) {
    console.error("Error during removeUrlFromUser:", error);
    return error;
  }
};

export {
  create,
  findOne,
  removeUrlFromUser
};