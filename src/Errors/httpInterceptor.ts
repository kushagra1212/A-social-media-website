import axios from "axios";

// Create an instance of axios
const axiosInstance = axios.create();

// Add an interceptor to catch and handle HTTP errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error response status is 429
    if (error.response && error.response.status === 429) {
      // Handle the 429 error here
      console.log("Too Many Requests Error (429)");
      window.location.href = "/limit-reached";
      // You can display an error message, redirect the user, or perform any other necessary action
    }

    // Propagate the error so that it can be handled further downstream
    return Promise.reject(error);
  }
);

export default axiosInstance;
