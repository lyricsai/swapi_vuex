<template>
    <div v-if="isLoading">Loading...</div>
    {{ currentPerson }}

    <div v-if="error">
        <p>{{ error }}</p>
        <router-link to="/">Return Home</router-link>
    </div>

    <router-link to="/people">Go back to People</router-link>

    <div v-if="person" class="person">
        <h1>
            <strong>{{ person.name }}</strong>
        </h1>

        <ul>
            <li>
                <items-list-item
                    :itemClass="'homeworld'"
                    :links="person.homeworld"
                />
            </li>

            <li><b>gender:</b> {{ person.gender }}</li>
            <li><b>birth year:</b> {{ person.birth_year }}</li>
            <li><b>height:</b> {{ person.height }}cm</li>
            <li><b>mass:</b> {{ person.mass }}kg</li>
            <li><b>eye color:</b> {{ person.eye_color }}</li>

            <items-list-item :itemClass="'films'" :links="person.films" />
            <items-list-item :itemClass="'species'" :links="person.species" />
            <items-list-item
                :itemClass="'starships'"
                :links="person.starships"
            />
            <items-list-item :itemClass="'vehicles'" :links="person.vehicles" />
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import ItemsListItem from "@/components/ListItem.vue";

export default defineComponent({
    name: "PersonView",
    components: { ItemsListItem },
    data() {
        return {
            isLoading: false,
            person: null,
            error: "",
        };
    },
    methods: {
        ...mapActions(["person/GET_CURRENT_PERSON_ACTION"]),
        handleSuccess() {
            this.isLoading = false;
            this.person = this.$store.state.person.currentPerson;
        },
        handleFail() {
            this.isLoading = false;
        },
    },
    created() {
        this.isLoading = true;
        this["person/GET_CURRENT_PERSON_ACTION"]({
            // call the actions we define
            resolve: this.handleSuccess,
            reject: this.handleFail,
            id: this.id,
        });
    },
    computed: {
        ...mapState({ currentPerson: (state) => (state as any).person.state }),
        ...mapGetters(["person/GET_CURRENT_PERSON"]),
        id() {
            return this.$route.params.id;
        },
    },
});
</script>

<style lang="scss" scoped>
.person {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 1rem auto;
    min-height: 10rem;
    max-width: 30rem;
    min-width: 20rem;
    box-shadow: 1px 2px 4px gray;
    padding: 1rem;

    & ul {
        align-items: flex-start;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: baseline;
    }
    @media screen and (max-width: 500px) {
        margin: 1rem;
    }
}
</style>
