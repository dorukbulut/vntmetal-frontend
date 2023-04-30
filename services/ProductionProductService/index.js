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

  async getProduct(workorder, page) {
    return axios.post(`/api/production-product/get/${page}`, {
      workorder: workorder,
    });
  }
  async createProduct(data) {
    return axios.post("/api/production-product/create", data);
  }
  async updateProduct(data) {
    return axios.post("/api/production-product/update", data);
  }

  async deleteProduct(product_id) {
    return axios.post("/api/production-product/delete", { product_id });
  }

  async getByID(product_id) {
    return axios.post("/api/production-product/getid", { product_id });
  }

  async finishProduct(workorder_ID) {
    return axios.post("/api/production-product/finish", { workorder_ID });
  }
}

export default new ProductionProductService();
