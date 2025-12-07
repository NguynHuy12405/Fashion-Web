import axiosClient from "./axiosClient";

const productApi = {
  getAll: () => axiosClient.get("/products?limit=100"),

  getById: (id) => axiosClient.get(`/products/${id}`),

  search: (keyword) => axiosClient.get(`/products/search?q=${keyword}`),

  add: (data) => axiosClient.post("/products/add", data),

  update: (id, data) => axiosClient.put(`/products/${id}`, data),

  remove: (id) => axiosClient.delete(`/products/${id}`),

  getCategories: () => axiosClient.get("/products/categories"),
};

export default productApi;
