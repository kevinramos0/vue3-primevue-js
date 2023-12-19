class TokenService {
    async getLocalRefreshToken() {
        const user = await JSON.parse(localStorage.getItem(import.meta.env.VITE_APP_USER));
        return user?.refreshToken;
    }
    async getLocalAccessToken() {
        const user = await JSON.parse(localStorage.getItem(import.meta.env.VITE_APP_USER));
        return user?.token;
    }
    async updateLocalAccessToken(token) {
        let user = await JSON.parse(localStorage.getItem(import.meta.env.VITE_APP_USER));
        user.token = token;
        localStorage.setItem(import.meta.env.VITE_APP_USER, JSON.stringify(user));
    }
    async getUser() {
        const user = await JSON.parse(localStorage.getItem(import.meta.env.VITE_APP_USER));
        return user;
    }
    setUser(user) {
        localStorage.setItem(import.meta.env.VITE_APP_USER, JSON.stringify(user));
    }
    removeUser() {
        localStorage.removeItem(import.meta.env.VITE_APP_USER);
    }
}
export default new TokenService();
