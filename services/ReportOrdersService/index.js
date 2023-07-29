import axios from "../../config/index.js";


class ReportOrdersService {
    async getCustomerReport(data) {
        return axios.post("/api/report-order/customer-report", data)
    }
}


export default new ReportOrdersService()
