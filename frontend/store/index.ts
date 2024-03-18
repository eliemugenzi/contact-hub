import { createStore } from 'vuex';
import { VuexPersistence } from 'vuex-persist';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const vuexLocal = new VuexPersistence({
    storage: process.server ? undefined : window.localStorage,
})

const store = createStore({
  state: {
    currentUser: {},
    contacts: {
        loading: false,
        data: [],
        error: null
    }
  },
  mutations: {
    ...mutations,
  },
  modules: {},
  getters: {
    ...getters,
  },
  actions: {
   ...actions,
  },
  plugins: [vuexLocal.plugin]
})

export default store;
