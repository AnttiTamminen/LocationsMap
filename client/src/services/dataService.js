import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/locations/";

class DataDataservice {
    
    create(data) {
        return axios.post(API_URL, data);
    }

    update(id, lat, lng) {
        const updateConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        return axios.put(API_URL + id, {"author": JSON.parse(localStorage.getItem('user')).user.username,"lat": lat, "lng": lng}, updateConfig);
    }

    delete(id) {
        return axios.delete(API_URL + id);
    }

}

export default new DataDataservice