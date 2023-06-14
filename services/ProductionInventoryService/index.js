import axios from "../../config/index.js";

class ProductionInventoryService {
    async getPage(pageNum) {
        return axios.get(`/api/production-inventory/get-page/${pageNum}`);
    }

    async getDefaultData() {
        return this.getPage(0);
    }



    async getFilteredData(filters) {
        return axios.get("/api/production-inventory/filter", {
            params: { ...filters },
        });
    }


}

export default new ProductionInventoryService();
