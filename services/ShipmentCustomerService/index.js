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

    async getAllItems(data){
        return axios.post("/api/shipment-customer/get-all", data)
    }
    async getAllShipments(data){
        return axios.post("/api/shipment-customer/get-shipments", data)
    }

    async search(searchObject) {
        return axios.post("/api/shipment-customer/search-package", searchObject);
    }

    async create(data) {
        return axios.post("/api/shipment-customer/create", data);
    }

    async delete(data) {
        return axios.post("/api/shipment-customer/delete", data);
    }

    async finishAtelier(workorder_ID) {
        return axios.post("/api/shipment-customer/finish", { workorder_ID });
    }

    reformatData(data) {
        return data.map(item => {
            return {
                label : item.reference ,
                value : item.package_id,
                key : item.package_id,
            }
        })
    }

}

export default new ShipmentCustomerService();
