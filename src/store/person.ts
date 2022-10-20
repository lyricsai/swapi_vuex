import { getItem, fetchAdditionalData } from "@/services/api";
import { actionParams } from "@/store/items";

const state = {
    currentPerson: null,
    films: [],
    species: [],
    starships: [],
    vehicles: [],
    homeworld: null,
};
const mutations = {
    SET_CURRENT_PERSON(state, payload) {
        state.currentPerson = { ...payload };
    },
    SET_PERSON_FILMS(state, payload) {
        state.films.push(payload);
    },
    SET_PERSON_SPECIES(state, payload) {
        state.species.push(payload);
    },
    SET_PERSON_STARSHIPS(state, payload) {
        state.starships.push(payload);
    },
    SET_PERSON_VEHICLES(state, payload) {
        state.vehicles.push(payload);
    },
    SET_PERSON_HOMEWORLD(state, payload) {
        state.homeworld = payload;
    },
};
const actions = {
    GET_CURRENT_PERSON_ACTION(
        { commit },
        { resolve, reject, itemClass = "people", id = 1 }: actionParams = {}
    ) {
        getItem(
            (response) => {
                commit("SET_CURRENT_PERSON", response.data);
                resolve && resolve(response);
            },
            (err) => reject && reject(err),
            { itemClass, id }
        );
    },
    async GET_PERSON_PROP_ACTION(
        { commit },
        {
            resolve,
            reject,
            params: { itemClass = "homeworld", links },
        }: {
            resolve?: any;
            reject?: any;
            params: { itemClass?: string; links?: string | string[] };
        } = { params: {} }
    ) {
        //if no additional props
        if (!links?.length) {
            return reject(`no such prop ${itemClass}`);
        }
        if (!Array.isArray(links)) links = [links] as string[];

        links.forEach(async (url) => {
            fetchAdditionalData(
                (response) => {
                    commit(
                        `SET_PERSON_${itemClass.toUpperCase()}`,
                        response.data
                    );
                    resolve && resolve(response.data);
                },
                (err) => reject && reject(err),
                url
            );
        });
    },
};

const getters = {
    GET_CURRENT_PERSON: (state) => state.currentPerson,
    GET_PERSON_FILMS: (state) =>
        state.films?.map((e) => ({
            title: e.title,
            link: `films/${e.url.match(/\d/g).join(",")}`,
        })),
    GET_PERSON_SPECIES: (state) =>
        state.species?.map((e) => ({
            name: e.name,
            link: `species/${e.url.match(/\d/g).join(",")}`,
        })),
    GET_PERSON_STARSHIPS: (state) =>
        state.starships?.map((e) => ({
            name: e.name,
            link: `starships/${e.url.match(/\d/g).join(",")}`,
        })),
    GET_PERSON_VEHICLES: (state) =>
        state.vehicles?.map((e) => ({
            name: e.name,
            link: `vehicles/${e.url.match(/\d/g).join(",")}`,
        })),
    GET_PERSON_HOMEWORLD: (state) => [
        {
            name: state.homeworld?.name,
            link: `planets/${state.homeworld?.url.match(/\d/g).join(",")}`,
        },
    ],
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
