import axios from "../../config/index.js";

class AnalysisService {
  async getAllAnalyze() {
    return axios.get("/api/analyze/getAll");
  }

  async createAnalayze(data) {
    return axios.post("/api/analyze/create", data);
  }

  async getAnalyze(analyze_id) {
    return axios.post("/api/analyze/get", { analyze_id: analyze_id });
  }

  async updateAnalysis(data, id) {
    return axios.post("/api/analyze/update", { analyze: data, analyze_id: id });
  }
}

export default new AnalysisService();
