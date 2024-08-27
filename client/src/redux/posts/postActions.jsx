import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/posts`;

// Create New Post
export const createPost = async (formData) => {
  const response = await axios.post(API_URL + "/create-post", formData);
  return response.data;
};

// Get all Post
export const getPosts = async () => {
  const response = await axios.get(API_URL + "/all-posts");
  return response;
};
// Get all Post BY ADMIN
export const adminGetPosts = async () => {
  const response = await axios.get(API_URL + "/");
  return response;
};
// Get my Post
export const getMyPosts = async () => {
  const response = await axios.get(API_URL + "/my-posts");
  return response;
};

// Get my appointments
export const getMyAppointments = async () => {
  const response = await axios.get(API_URL + "/received-appointments");
  return response;
};

// Get my oders
export const getMyOrders = async () => {
  const response = await axios.get(API_URL + "/received-orders");
  return response;
};
// Get my placed oders
export const getMyPlacedOrders = async () => {
  const response = await axios.get(API_URL + "/placed-orders");
  return response;
};
// Get my booked appointments
export const getMyBookedAppointments = async () => {
  const response = await axios.get(API_URL + "/booked-appointments");
  return response;
};

// Delete a Post
export const deletePost = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

// Get a post
export const getPost = async (id) => {
  const response = await axios.get(API_URL + "/post/" + id);
  return response;
};
// Get a post info
export const getPostInfo = async (id) => {
  const response = await axios.get(API_URL + "/post-info/" + id);
  return response;
};

// Update Post
export const updatePost = async (id, formData) => {
  const response = await axios.put(`${API_URL}${id}`, formData);
  return response.data;
};

// Add comment
export const addComment = async (id, comment) => {
  const response = await axios.put(API_URL + "/add-comment/" + id, comment);
  return response;
};

// Remove comment
export const removeComment = async (id) => {
  const response = await axios.put(API_URL + "/remove-comment/" + id);
  return response.data;
};

// Add like
export const addLke = async (id) => {
  const response = await axios.put(API_URL + "/add-like/" + id);
  return response.data;
};

// Remove like
export const removeLike = async (id) => {
  const response = await axios.put(API_URL + "/remove-like/" + id);
  return response.data;
};
// Block Post
export const adminBlockPost = async (id, formData) => {
  const response = await axios.put(API_URL + "/block-post/" + id, formData);
  return response.data;
};
// Unblock Post
export const adminUnblockPost = async (id, formData) => {
  const response = await axios.put(API_URL + "/unblock-post/" + id, formData);
  return response.data;
};
