import axios from "axios";
class WorkOrderService {
  async getPage(pageNum) {
    return axios.get(`/api/work-order/get-page/${pageNum}`);
  }

  async getDefaultData() {
    return this.getPage(0);
  }

  async getFilteredData(filters) {
    return axios.get("/api/work-order/filter", { params: { ...filters } });
  }

  async createForm(data) {
    return axios.post("/api/work-order/create", data);
  }

  async updateForm(data) {
    return axios.post("/api/work-order/update", data);
  }

  async getByWorkOrder(id) {
    return axios.post("/api/work-order/get-work", { workorder_ID: id });
  }

  generateForm(e) {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/work-order/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: e.target.id.split(",")[0],
        type: e.target.id.split(",")[1],
      }),
    }).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "WorkOrder.docx";
        a.click();
      });
    });
  }
}

export default new WorkOrderService();