import axios from "axios";


const API_BASE_URL = process.env.BASE_URL || "http://localhost:4000";

export const fecthDataFormApi=async(url)=>{
  try {
    const { data } = await axios.get(`${API_BASE_URL}${url}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postData = async (url, formData) => {
  try {
    // Axios returns data in the 'data' field
    const { data } = await axios.post(`${API_BASE_URL}${url}`, formData);
    return data; // Return the actual response data
  } catch (error) {
    console.error("Error during POST request:", error);
    return error;
  }
};

export const editData = async (url, updateData) => {
  try {
    const { data } = await axios.put(`${API_BASE_URL}${url}`, updateData);
    return data; // Return the actual response data
  } catch (error) {
    console.error("Error during PUT request:", error);
    return error;
  }
};

export const deleteData = async (url) => {
  try {
    const { data } = await axios.delete(`${API_BASE_URL}${url}`);
    return data; // Return the actual response data
  } catch (error) {
    console.error("Error during DELETE request:", error);
    return error;
  }
};








// import axios from "axios";
// // require('dotenv/config');

// export const fecthDataFormApi=async(url) =>{
//     try{
//         const {data} = await axios.get("http://localhost:4000"+url)
//         return data;
//     }
//     catch(error){
//         console.log(error);
//         return error;
//     }
// }

// export const postData = async (url, formData) => {
//         const { res } = await axios.post("http://localhost:4000" + url, formData);
//         return res;
    
// };

// export const editData = async (url, updateData) =>{
//     const { res } = await axios.put(`http://localhost:4000${url}`, updateData)
//     return res;
// }

// export const deleteData = async (url) =>{
//     const { res } =await axios.delete(`http://localhost:4000${url}`)
//     return res;
// }

