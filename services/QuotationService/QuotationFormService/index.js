import axios from "../../../config/index.js";

class QuotationFormService {
  async getDefaultData() {
    return this.getPage(0);
  }

  async getFilteredData(filters) {
    return axios.get("/api/quotation-form/filter", { params: { ...filters } });
  }

  async getPage(pageNum) {
    return axios.get(`/api/quotation-form/get-page/${pageNum}`);
  }

  async createForm(data) {
    return axios.post("/api/quotation-form/create", data);
  }

  async getForm(id) {
    return axios.post("/api/quotation-form/get-quo", { quotation_ID: id });
  }

  async updateForm(data) {
    return axios.post("/api/quotation-form/update", data);
  }

  async getFormByCustomer(customerid) {
    return axios.post("/api/quotation-form/get", { Customer_ID: customerid });
  }

  generateForm(e) {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/quotation-form/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: e.target.id }),
    }).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "QuotationForm.docx";
        a.click();
      });
    });
  }
}

export default new QuotationFormService();
