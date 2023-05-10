import axios from "../../config/index.js";

class ProductionAtelierService {
  async getPage(pageNum) {
    return axios.get(`/api/production-atelier/get-page/${pageNum}`);
  }

  async getDefaultData() {
    return this.getPage(0);
  }

  async createProduct(data) {
    return axios.post("/api/production-atelier/create", data);
  }
  async updateProduct(data) {
    return axios.post("/api/production-atelier/update", data);
  }

  async getFilteredData(filters) {
    return axios.get("/api/production-atelier/filter", {
      params: { ...filters },
    });
  }
  async getProduct(workorder, page) {
    return axios.post(`/api/production-atelier/get/${page}`, {
      workorder: workorder,
    });
  }
}

export default new ProductionAtelierService();
