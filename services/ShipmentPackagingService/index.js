import axios from "../../config/index.js";

class ShipmentPackagingService {
    async getPage(pageNum) {
        return axios.get(`/api/shipment-packaging/get-page/${pageNum}`);
    }

    async getDefaultData() {
        return this.getPage(0);
    }

    async getFilteredData(filters) {
        return axios.get("/api/shipment-packaging/filter", {
            params: { ...filters },
        });
    }

    async search(searchObject) {
        return axios.post("/api/shipment-packaging/search-workorder", searchObject);
    }

    reformatData(data) {
        return data.map(item => {
            return {
                label : item.reference + "-REV-" + item.revision,
                value : item.workorder_ID,
                key : item.workorder_ID,
            }
        })
    }


    async createPackage(data) {
        return axios.post("/api/shipment-packaging/create", data)
    }
    async updatePackage(data) {
        return axios.post("/api/shipment-packaging/update", data)
    }
    async deletePackage(data) {
        return axios.post("/api/shipment-packaging/delete", data)
    }

    async getPackage(data) {
        return axios.post("/api/shipment-packaging/get", data)
    }




}

export default new ShipmentPackagingService();
