import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import data from './modules/data';
import user from "./modules/users"

import * as getters from './getters';
Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    app,
    data,
    user
  },
  state: {},
  mutations: {}
})

export default store