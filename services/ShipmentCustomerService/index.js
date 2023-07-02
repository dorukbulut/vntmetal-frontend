import axios from "../../config/index.js";

class ShipmentCustomerService {
    async getPage(pageNum) {
        return axios.get(`/api/shipment-customer/get-page/${pageNum}`);
    }

    async getDefaultData() {
        return this.getPage(0);
    }

    async getFilteredData(filters) {
        return axios.get("/api/shipment-customer/filter", {
            params: { ...filters },
        });
    }

}

export default new ShipmentCustomerService();
