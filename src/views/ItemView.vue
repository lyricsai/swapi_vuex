<template>
    <router-link :to="{ name: itemClass }" style="text-decoration: underline"
        >Go back to {{ itemClass }}</router-link
    >
    <template v-if="isLoading">
        <p>Loading Data...</p>
    </template>
    <template v-if="item">
        <div>
            <ul>
                <li v-for="entry in Object.entries(item)" :key="entry[0]">
                    <div
                        v-if="
                            !checkArray.includes(entry[0]) &&
                            !notShowingArray.includes(entry[0])
                        "
                    >
                        <span>{{ entry[0].split("_")[0] }}</span> -
                        <span>
                            <strong>{{ entry[1] }}</strong>
                        </span>
                    </div>
                </li>
                <template v-if="item.additional">
                    <li
                        v-for="entry in Object.entries(item.additional)"
                        :key="entry[0]"
                    >
                        <span>{{ entry[0] }}</span> -
                        <span>
                            {{ entry }}
                        </span>
                    </li>
                </template>
                <details v-if="item.opening_crawl">
                    <summary>Summary</summary>
                    {{ item.opening_crawl }}
                </details>
            </ul>
        </div>
    </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapState, mapActions } from "vuex";

export default defineComponent({
    name: "ItemView",
    data() {
        return {
            isLoading: false,
            item: null,
            error: "",
            checkArray: [
                "films",
                "species",
                "starships",
                "vehicles",
                "characters",
                "planets",
                "people",
                "homeworld",
                "pilots",
                "residents",
                "additional",
            ],
            notShowingArray: ["created", "edited", "url", "opening_crawl"],
        };
    },
    methods: {
        ...mapActions(["items/GET_CURRENT_ITEM_ACTION"]),
        handleSuccess() {
            this.isLoading = false;
            this.item = this.$store.state.items.currentItem;
        },
        handleFail() {
            this.isLoading = false;
        },
    },
    created() {
        this.isLoading = true;
        this["items/GET_CURRENT_ITEM_ACTION"]({
            resolve: this.handleSuccess,
            reject: this.handleFail,
            itemClass: this.itemClass,
            id: this.id,
        });
    },
    computed: {
        ...mapState({
            currentItemState: (state) =>
                (state as Record<string, any>).items?.state,
        }),
        ...mapGetters({ currentItem: "items/GET_CURRENT_ITEM" }),
        id() {
            return this.$route.params.id;
        },
        itemClass() {
            return this.$route.path.split("/")[1];
        },
    },
});
</script>

<style lang="scss" scoped>
ul {
    flex-direction: column;
}
li {
    & > * {
        text-transform: capitalize;
    }
}
</style>
