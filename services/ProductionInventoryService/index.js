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

    async updateInventory(data){
        return axios.post("/api/production-inventory/update", {...data});
    }
    async getStockInfo(data){
        return axios.post("/api/production-inventory/get-info", {...data});
    }


}

export default new ProductionInventoryService();
