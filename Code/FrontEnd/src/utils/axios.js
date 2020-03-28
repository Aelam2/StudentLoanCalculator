import axios from "axios";
import { notification } from "antd";

// Generic Error messages
const codeMessage = {
  400: "There was an error in the request, and the server did not create or modify data.",
  401: "The user does not have permissions (username, password incorrect).",
  403: "The user is authorized, but access is prohibited.",
  404: "The requested resource does not exist or has been deleted.",
  406: "The requested format is not available.",
  410: "The requested resource is permanently deleted and is no longer available.",
  422: "Requested input was invalid, and no data was modified",
  500: "A server error occurred. Please email James@alexelam.dev if the problem persists",
  502: "Gateway error.",
  503: "The service is unavailable and the server is temporarily overloaded or maintained.",
  504: "Gateway timed out."
};

// Add axios interceptor for error handling
axios.interceptors.response.use(
  response => {
    // Continue with response if status in 2xx range'
    return response;
  },
  error => {
    const { response } = error;
    if (response && response.status) {
      // If error message is provided by server otherwise use generic message
      const errorText = response.data.error || codeMessage[response.status];
      const { status } = response;

      // Display status code and error message to user.
      notification.error({
        message: `Error ${status}`,
        description: errorText
      });
    } else if (!response) {
      // If there was no response from server.
      notification.error({
        message: "Network Error",
        description: "Your network was unable to connect to our server. Please try again soon."
      });
    }

    // return error for further handling
    return Promise.reject(error);
  }
);

export default axios;
