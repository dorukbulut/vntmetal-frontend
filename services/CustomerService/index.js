import axios from "../../config/index.js";

class CustomerService {
  async getDefaultData() {
    return axios.get("/api/customer/get-page/0");
  }

  async getPage(pageNum) {
    return axios.get(`/api/customer/get-page/${pageNum}`);
  }

  async getFilteredData(params) {
    return axios.get("/api/customer/filter", { params: { ...params } });
  }

  async createCustomer(fields) {
    return axios.post("/api/customer/create", fields);
  }

  async updateCustomer(fields) {
    return axios.post("/api/customer/update", fields);
  }

  async getCustomer(account_id) {
    return axios.post("/api/customer/get", { account_id: account_id });
  }
}

export default new CustomerService();
