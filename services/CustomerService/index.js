import axios from "../../config/index.js";

class CustomerService {
  async getDefaultData() {
    return this.getPage(0);
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

  async getAllCustomers() {
    return axios.get("/api/customer/all");
  }
}

export default new CustomerService();

// TODO WorkOrder Service
// TODO SaleConfirmation Service
// TODO Refactor All Pages anc Component Code to Services
// TODO Upgrade Create app folder format with loading and layout
// TODO QuicK link Component
// TODO Backend and frontend error handling class
// TODO Optimize Frontend Request quality.
// TODO Optimize Backend Code.
// TODO Optimize frontend Code.
