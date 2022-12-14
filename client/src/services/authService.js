import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/auth/";

class AuthService {
    login(username, password) {
        const loginConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        return axios.post(API_URL + "login", {username, password}, loginConfig)
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
      });
    }

    logout() {
        const logoutConfig = {
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem('user')).token
            }
        } 
        return axios.post(API_URL + "logout", null, logoutConfig)
    }

    register(username, email, password) {
        const registerConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        return axios.post(API_URL + "register", {
        username,
        email,
        password
        }, registerConfig);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();