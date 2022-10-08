import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/locations/";

class DataDataservice {
    getAll() {
        return axios.get("");
    }

    get(id) {
        return axios.get('${id}');
    }

    create(data) {
        return axios.post("", data);
    }

    update(id, data) {
        return axios.put('${id}', data);
    }

    delete(id) {
        return axios.delete('${id}');
    }

}

export default new DataDataservice