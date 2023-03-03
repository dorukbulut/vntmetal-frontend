import axios from "../../config/index.js";

class OrderConfirmationService {
  async getDefaultData() {
    return this.getPage(0);
  }

  async getPage(pageNum) {
    return axios.get(`/api/sale-confirmation/get-page/${pageNum}`);
  }

  async getFilteredData(filters) {
    return axios.get("/api/sale-confirmation/filter", {
      params: { ...filters },
    });
  }

  async createForm(data) {
    return axios.post("/api/sale-confirmation/create", data);
  }
  async getByConfirmation(id) {
    return axios.post("/api/sale-confirmation/get-conf", { sale_ID: id });
  }

  async getByCustomer(id) {
    return axios.post("/api/sale-confirmation/get", { Customer_ID: id });
  }

  async updateForm(data) {
    return axios.post("/api/sale-confirmation/update", data);
  }

  generateForm(e) {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/sale-confirmation/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: e.target.id }),
    }).then((response) => {
      response.blob().then((blob) => {
        console.log(blob);
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "SaleConfirmation.docx";
        a.click();
      });
    });
  }
}

export default new OrderConfirmationService();
