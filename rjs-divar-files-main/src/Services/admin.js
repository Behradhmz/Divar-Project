import api from "../configs/api";

const addCategory = (data) => {
  return api.post("category", data);
};

const getCategory = () => {
  return api.get("category");
};

const deleteCategory = (id) => {
  return api.delete(`category/${id}`);
};

export { addCategory, getCategory , deleteCategory };
