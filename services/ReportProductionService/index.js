import axios from "../../config/index.js";


class ReportProductionService {
    async getPage(pageNum) {
        return axios.get(`/api/report-production/get-page/${pageNum}`);
    }

    async getDefaultData() {
        return this.getPage(0);
    }

    async getFilteredData(filters) {
        return axios.get("/api/report-production/filter", {
            params: { ...filters },
        });
    }
}


export default new ReportProductionService();
