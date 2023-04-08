import axios from "../../config/index.js";

class ProductionProductService {
  async getPage(pageNum) {
    return axios.get(`/api/production-product/get-page/${pageNum}`);
  }

  async getDefaultData() {
    return this.getPage(0);
  }

  async getFilteredData(filters) {
    return axios.get("/api/production-product/filter", {
      params: { ...filters },
    });
  }
}

export default new ProductionProductService();
