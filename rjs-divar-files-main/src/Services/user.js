import api from "../configs/api";

const getProfile = () => api.get("user/whoami").then((res) => res || false);

const getPosts = () => api.get("post/my");

const getAllPosts = () => api.get("");

const getPostinfo = (id) => api.get(`post/${id}`);

export { getProfile, getPosts, getAllPosts, getPostinfo };
