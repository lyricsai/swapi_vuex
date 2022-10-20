<template>
    <template v-if="isLoading">
        <p>Loading Data for {{ routeName }}...</p>
    </template>

    <template v-else>
        <k-dialog
            :show="dialogSearchVisible"
            @update:show="dialogSearchVisible = false"
        >
            <search-bar
                ref="search__input"
                @update:show="(bool) => (dialogSearchVisible = bool)"
                @submit="search"
            />
        </k-dialog>

        <section class="items__wrapper">
            <div class="items__info">
                <h3>
                    Here are {{ routeName }} of the saga
                    <div>
                        <k-button class="search__button" @click="showSearch"
                            >Search
                        </k-button>
                        <k-button class="search__button" @click="resetSearch"
                            >Reset
                        </k-button>
                    </div>
                </h3>
            </div>
            <template v-if="$store.state.items.totalItems === 0"
                >No such Data</template
            >
            <ul>
                <router-link
                    v-for="item in items"
                    :key="item"
                    :to="{
                        path: `${routeName}/${item.url.match(/\d/g).join('')}`,
                    }"
                >
                    <li class="item">
                        <h2>{{ item.name ?? item.title }}</h2>
                        <p>
                            {{
                                item.birth_year ||
                                item.classification ||
                                item.terrain ||
                                item.model ||
                                `by ${item.director}`
                            }}
                        </p>
                    </li></router-link
                >
            </ul>
            <ul class="page__wrapper">
                <k-button
                    :disabled="!prev"
                    @click.prevent="updatePage(currentPage - 1)"
                    >Back</k-button
                >
                <li
                    v-for="pageNumber in totalPages"
                    :key="pageNumber"
                    class="page"
                    :class="{ currentPage: currentPage === pageNumber }"
                    @click="updatePage(pageNumber)"
                >
                    <k-button>{{ pageNumber }}</k-button>
                </li>
                <k-button
                    :disabled="!next"
                    @click.prevent="updatePage(currentPage + 1)"
                    >Forward</k-button
                >
            </ul>
        </section>
        <template>
            <div v-if="!isLoading && !items.length">No such data</div>
        </template>
    </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { LocationQuery } from "vue-router";

export default defineComponent({
    name: "ItemsView",

    data() {
        return {
            isLoading: true,
            items: null as unknown[] | null,
            dialogSearchVisible: false,
            query: {} as LocationQuery & { search?: string; page?: number },
        };
    },
    components: { SearchBar },
    methods: {
        ...mapActions(["items/GET_ITEMS_ACTION"]),
        handleSuccess() {
            this.isLoading = false;
            this.items = this.$store.state.items[this.routeName];
        },
        handleFail() {
            this.isLoading = false;
        },
        search() {
            this.isLoading = true;
            this.$store.commit("items/SET_CURRENT_PAGE", 1);
            this.routeHandler();

            this["items/GET_ITEMS_ACTION"]({
                resolve: this.handleSuccess,
                reject: this.handleFail,
                itemClass: this.routeName,
            });
        },
        resetSearch() {
            this.$store.commit("items/SET_CURRENT_PAGE", 1);
            this.$store.commit("items/SET_SEARCH_QUERY", "");
            this.routeHandler();
            this["items/GET_ITEMS_ACTION"]({
                resolve: this.handleSuccess,
                reject: this.handleFail,
                itemClass: this.routeName,
            });
        },
        updatePage(pageNumber) {
            if (
                pageNumber < 1 ||
                pageNumber > this.totalPages ||
                pageNumber === this.currentPage
            ) {
                return;
            }
            this.$store.commit("items/SET_CURRENT_PAGE", pageNumber);

            this.routeHandler();
            this.load();
        },
        showSearch() {
            return (this.dialogSearchVisible = true);
        },
        routeHandler() {
            this.$router.push({
                path: this.routeName,
                query: { search: this.searchQuery, page: this.currentPage },
            });
        },
        update() {
            this.$store.commit("items/SET_SEARCH_QUERY", "");
            this.$store.commit("items/SET_CURRENT_PAGE", 1);
            this.load();
        },
        load() {
            this.isLoading = true;
            this["items/GET_ITEMS_ACTION"]({
                resolve: this.handleSuccess,
                reject: this.handleFail,
                itemClass: this.routeName,
            });
        },
    },
    created() {
        this.$router.push({
            path: this.routeName,
            query: this.$route.query,
        });

        this.$store.commit(
            "items/SET_CURRENT_PAGE",
            Number(this?.routeQuery?.page) || 1
        );
        this.$store.commit("items/SET_SEARCH_QUERY", this.$route.query.search);
        this.load();
    },
    computed: {
        ...mapState({ state: (state) => (state as any).items.state }),
        ...mapGetters({
            people: "items/GET_PEOPLE",
            starships: "items/GET_STARSHIPS",
            species: "items/GET_SPECIES",
            vehicles: "items/GET_VEHICLES",
            films: "items/GET_FILMS",
            searchQuery: "items/GET_SEARCH_QUERY",
            totalPages: "items/GET_TOTAL_PAGES",
            next: "items/GET_NEXT_PAGE",
            prev: "items/GET_PREV_PAGE",
            currentPage: "items/GET_CURRENT_PAGE",
        }),
        routeName() {
            return this.$route.name as string;
        },
        routeQuery() {
            return this.$route.query;
        },
    },
    watch: {
        $route(to) {
            console.log(to.query.page, history.state.current);
            this.$store.commit("items/SET_SEARCH_QUERY", to.query.search);
            this.$store.commit(
                "items/SET_CURRENT_PAGE",
                Number(to.query.page) || 1
            );
            this.load();
        },
        routeName() {
            if (Array.isArray(this.items)) this.items.length = 0;
            if (!history.state.current.includes("page")) {
                this.update();
            } else {
                this.load();
            }
        },
    },
});
</script>

<style lang="scss" scoped>
.items__info {
    display: flex;
    justify-content: center;
    text-transform: capitalize;
}

.items__wrapper {
    min-height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & :nth-child(2) {
        flex: 0 1 auto;
    }
}

.search {
    &__button {
        margin: 1rem;
    }
    &__input {
        display: none;
        font-size: 2rem;
        margin: 2rem;
        border: 2px solid gray;
        border-radius: 0.5rem;
        width: 80%;
        height: 3rem;
        padding: 0 0 0 1rem;

        &_container {
            position: absolute;
            width: 80%;
            top: 4rem;
            left: 10%;
            margin: 0 auto;
            z-index: 100;
            background: lightgray;
            border-radius: 0.5rem;
        }
    }
}

.item {
    padding: 1rem;
    margin: 1rem;
    min-width: 10rem;
    max-width: 25rem;
    box-shadow: 1px -2px 4px gray;
    transition: all 0.3s ease 0s;
    &:hover {
        scale: 1.2;
        background: teal;
        color: #fff;
        transition: all 0.5s ease 0s;
    }
}

ul {
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: 0 auto;
    width: 100%;
}

.currentPage button {
    background: teal;
    color: #fff;
    border-color: transparent;
    transition: all 0.3s ease 0s;
}

@media (max-width: 750px) {
    .page {
        display: none;
    }
    .page.currentPage,
    .page:first-child,
    .page:last-child {
        display: block;
    }
}
</style>
