import axios from "../../config/index.js";


class ReportOrdersService {
    async getCustomerReport() {
        return axios.get("/api/report-general/get-report")
    }
}


export default new ReportOrdersService()
