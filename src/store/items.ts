import { getItems, getItem } from "@/services/api";

export class actionParams {
    resolve?: (unknown) => void;
    reject?: (unknown) => void;
    itemClass?: string;
    id?: string | number | null = null;
    page?: number = 1;
    searchFor?: string | null = null;
}

const actions = {
    GET_ITEMS_ACTION(
        { commit, getters },
        {
            resolve,
            reject,
            itemClass = "people",
            page = getters["GET_CURRENT_PAGE"],
            searchFor = getters["GET_SEARCH_QUERY"],
        }: actionParams = {}
    ) {
        getItems(
            (response) => {
                commit(`SET_${itemClass.toUpperCase()}`, response.data.results);
                commit("SET_NEXT_PAGE", response.data.next);
                commit("SET_PREV_PAGE", response.data.previous);
                commit("SET_TOTAL_ITEMS", response.data.count);
                resolve && resolve(response);
            },
            (err) => reject && reject(err),
            { itemClass, page, searchFor }
        );
    },

    async GET_CURRENT_ITEM_ACTION(
        { commit },
        { resolve, reject, itemClass = "planets", id = 1 }: actionParams = {}
    ) {
        getItem(
            async (response) => {
                commit("SET_CURRENT_ITEM", await response.data);
                resolve && resolve(response);
            },
            (err) => reject && reject(err),
            { itemClass, id }
        );
    },
    GET_SEARCH_QUERY_ACTION({ commit }, { searchQuery }) {
        commit("SET_SEARCH_QUERY", searchQuery);
    },
};

const mutations = {
    SET_PEOPLE(state, people) {
        state.people = [...people];
    },
    SET_PLANETS(state, planets) {
        state.planets = [...planets];
    },
    SET_FILMS(state, films) {
        state.films = [...films];
    },
    SET_SPECIES(state, species) {
        state.species = [...species];
    },
    SET_VEHICLES(state, vehicles) {
        state.vehicles = [...vehicles];
    },
    SET_STARSHIPS(state, starships) {
        state.starships = [...starships];
    },
    SET_CURRENT_ITEM(state, payload) {
        state.currentItem = { ...payload };
    },
    SET_SEARCH_QUERY(state, payload) {
        state.searchQuery = payload;
    },
    SET_CURRENT_PAGE(state, payload) {
        state.currentPage = payload;
    },
    SET_NEXT_PAGE(state, payload) {
        state.next = payload;
    },
    SET_PREV_PAGE(state, payload) {
        state.prev = payload;
    },
    SET_TOTAL_ITEMS(state, payload) {
        state.totalItems = payload;
    },
};

const items = {
    namespaced: true,
    state: {
        people: [],
        currentItem: null,
        films: [],
        species: [],
        planets: [],
        starships: [],
        vehicles: [],
        searchQuery: "",
        currentPage: 1,
        next: null,
        prev: null,
        totalItems: null,
        limit: 10,
    },
    getters: {
        GET_PEOPLE: (state) => state.people,
        GET_CURRENT_ITEM: (state) => state.currentItem,
        GET_FILMS: (state) => state.films,
        GET_PLANETS: (state) => state.planets,
        GET_STARSHIPS: (state) => state.starships,
        GET_VEHICLES: (state) => state.vehicles,
        GET_SPECIES: (state) => state.species,
        GET_SEARCH_QUERY: (state) => state.searchQuery,
        GET_CURRENT_PAGE: (state) => state.currentPage,
        GET_NEXT_PAGE: (state) => state.next,
        GET_PREV_PAGE: (state) => state.prev,
        GET_TOTAL_PAGES: (state) => Math.ceil(state.totalItems / state.limit),
    },
    mutations,
    actions,
};

export default items;
