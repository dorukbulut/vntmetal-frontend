import axios from "../../config/index.js";

class ProductionAtelierService {
  async getPage(pageNum) {
    return axios.get(`/api/production-atelier/get-page/${pageNum}`);
  }

  async getDefaultData() {
    return this.getPage(0);
  }

  async getFilteredData(filters) {
    return axios.get("/api/production-atelier/filter", {
      params: { ...filters },
    });
  }
}

export default new ProductionAtelierService();
