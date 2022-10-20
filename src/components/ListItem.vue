<template>
    <div>
        <template v-if="isLoading">
            <div>Loading Data...</div>
        </template>

        <template v-if="items.length">
            <h5>{{ itemClass }}</h5>
            <ul>
                <li :key="item.link" v-for="item in items">
                    <h4>{{ item.name || item.title }}</h4>
                </li>
            </ul>
        </template>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapGetters, mapState } from "vuex";

export default defineComponent({
    data: () => {
        return {
            isLoading: false,
            fetched: null,
            items: [],
        };
    },
    props: {
        links: {
            type: [Array, String],
            required: true,
        },
        itemClass: {
            type: String,
            required: true,
        },
    },
    methods: {
        ...mapActions([`person/GET_PERSON_PROP_ACTION`]),
        async handleSuccess(res) {
            this.$nextTick(() => {
                this.items.push(res);
            });
            this.isLoading = false;
        },
        handleFail() {
            this.isLoading = false;
        },
    },

    async created() {
        try {
            this.isLoading = true;
            await this[`person/GET_PERSON_PROP_ACTION`]({
                resolve: this.handleSuccess,
                reject: this.handleFail,
                params: { itemClass: this.itemClass, links: this.links },
            });
        } catch (error) {
            Promise.reject(error);
        } finally {
            this.isLoading = false;
        }
    },
    computed: {
        ...mapState({ person: (state) => state.items.state }),
        ...mapGetters({
            starships: "person/GET_PERSON_STARSHIPS",
            species: "person/GET_PERSON_SPECIES",
            vehicles: "person/GET_PERSON_VEHICLES",
            films: "person/GET_PERSON_FILMS",
            homeworld: "person/GET_PERSON_HOMEWORLD",
        }),
    },
});
</script>

<style scoped>
li,
h5 {
    padding: 0.5rem 0;
    text-align: left;
}
h5 {
    text-decoration: underline;
}
ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
