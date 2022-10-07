import http from "../http-common";

class AuthService {
    login(data) {
        return http.post("auth/login", JSON.stringify(data))
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
      });
    }

    logout() {
    return http.post("auth/logout", JSON.parse(localStorage.getItem('user').token))
    .then(response => {
            if(response === []) {
                localStorage.removeItem("user");
            }
        });
    }

    register(username, email, password) {
        return http.post("auth/register", {
        username,
        email,
        password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();