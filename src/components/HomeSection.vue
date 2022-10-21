<template>
    <section :id="itemClass" :tabindex="tab">
        <h2>
            {{ heading }}
        </h2>
        <ul class="card__list" v-if="items?.length">
            <li
                class="card__item"
                v-for="item in items"
                :key="item?.name ?? item?.title"
            >
                <strong>{{ item?.name ?? item?.title }}</strong>
                <div>
                    {{
                        item.director ||
                        item.classification ||
                        item.terrain ||
                        item.model ||
                        item.birth_year
                    }}
                </div>
                <div>
                    <router-link
                        :to="{
                            path: `${itemClass}/${item.url
                                .match(/\d/g)
                                .join('')}`,
                        }"
                    >
                        Learn More</router-link
                    >
                </div>
            </li>
        </ul>
        <span v-else>Loading...</span>
        <router-link
            :to="{
                path: `${itemClass}`,
            }"
        >
            See more
        </router-link>
    </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
    components: {},
    data: () => {
        return { items: null };
    },
    props: {
        itemClass: {
            type: String,
            required: true,
        },
        heading: {
            type: String,
            required: true,
        },
        tab: { type: Number, required: true },
    },
    methods: {
        ...mapActions([`items/GET_ITEMS_ACTION`]),
        handleSuccess() {
            this.isLoading = false;
            this.items = this.$store.state.items[this.itemClass];
            this.items.length = 6;
        },
        handleFail() {
            this.isLoading = false;
        },
    },
    created() {
        this.isLoading = true;

        this["items/GET_ITEMS_ACTION"]({
            resolve: this.handleSuccess,
            reject: this.handleFail,
            itemClass: this.itemClass,
        });
    },
    computed: {
        ...mapState({ state: (state) => state.items.state }),
        ...mapGetters({
            people: "items/GET_PEOPLE",
            starships: "items/GET_STARSHIPS",
            species: "items/GET_SPECIES",
            vehicles: "items/GET_VEHICLES",
            films: "items/GET_FILMS",
        }),
    },
};
</script>

<style lang="scss" scoped>
section {
    min-height: 300px;
    margin: 2rem auto;
}

.card__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
}
.card__item {
    background: transparent;
    color: inherit;
    max-width: 20rem;
    min-width: 15rem;
    min-height: 5rem;
    width: auto;
    box-shadow: 1px 2px 4px gray;
    padding: 1rem;
    transition: all 1s ease 0s;
    &:nth-child(odd) {
        background: teal;
        color: #fff;
    }
    &:hover {
        transition: all 0.5s linear 0s;
        min-width: 20rem;
    }
    &:active {
        background: gray;
    }
}
</style>
