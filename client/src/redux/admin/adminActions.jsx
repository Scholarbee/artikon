import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


// Get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/admin`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Block user
export const adminBlockUser = async (id) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/admin/block-user/${id}`
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Unblock user
export const adminUnblockUser = async (id) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/admin/unblock-user/${id}`
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Delete user
export const adminDeleteUser = async (id) => {
  try {
    const response = await axios.delete(
      `${BACKEND_URL}/api/admin/delete-user/${id}`
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};