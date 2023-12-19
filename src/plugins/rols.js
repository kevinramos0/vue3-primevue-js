import store from '../store';
import Vue from 'vue';

const hasRole = (role) => {
    return store.state.profile.profileRols.some((rol) => rol.name === role || rol.name === 'Admin');
};

Vue.prototype.hasRole = hasRole;

export default hasRole;
