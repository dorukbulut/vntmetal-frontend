import axios from "../../config/index"

class QCService {
    async getPage(pageNum) {
        return axios.get(`/api/qc-production/get-page/${pageNum}`);
    }

    async getDefaultData() {
        return this.getPage(0);
    }

    async getFilteredData(filters) {
        return axios.get("/api/qc-production/filter", {
            params: { ...filters },
        });
    }

    async setQC(product_id, qcValue) {
        return axios.post("/api/qc-production/set-qc", {product_id, qcValue});
    }

    async getPageAtelier(pageNum) {
        return axios.get(`/api/qc-atelier/get-page/${pageNum}`);
    }

    async getDefaultDataAtelier() {
        return this.getPage(0);
    }

    async getFilteredDataAtelier(filters) {
        return axios.get("/api/qc-atelier/filter", {
            params: { ...filters },
        });
    }

    async setQCAtelier(atelier_id, qcValue) {
        return axios.post("/api/qc-atelier/set-qc", {atelier_id, qcValue});
    }
}


export default new QCService();
