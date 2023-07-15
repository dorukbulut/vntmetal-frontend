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



}

export default new ShipmentPackagingService();
