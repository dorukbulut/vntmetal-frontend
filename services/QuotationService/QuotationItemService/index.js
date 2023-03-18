import axios from "../../../config/index.js";

class QuotationItemService {
  async getDefaultData() {
    return this.getPage(0);
  }

  async getPage(pageNum) {
    return axios.get(`/api/quotation-items/get-page/${pageNum}`);
  }

  async getFilteredData(params) {
    return axios.get("/api/quotation-items/filter", { params: { ...params } });
  }

  async getByID(id) {
    return axios.post("/api/quotation-items/get-id", { item_id: id });
  }

  async createItem(data) {
    return axios.post("/api/quotation-items/create", data);
  }
  async updateItem(data) {
    return axios.post("/api/quotation-items/update", data);
  }

  async fetchFormItems(data, url) {
    return axios.post(`/api/quotation-items/${url}`, data);
  }
}

export default new QuotationItemService();
