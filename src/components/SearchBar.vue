<template>
    <form @submit.prevent="updateSearchQuery" class="search__bar">
        <label for="search__input"
            >Look for
            <k-input
                type="text"
                v-model.lazy="searchInput"
                id="search__input"
                placeholder="Type in.."
            />
            <k-button>Search</k-button>
        </label>
    </form>
</template>
<script>
export default {
    data() {
        return {
            searchInput: "",
        };
    },
    methods: {
        updateSearchQuery() {
            this.$store.commit("items/SET_SEARCH_QUERY", this.searchInput);
            if (this.searchInput) this.$emit("update:show", false);
            this.searchInput = "";
        },
    },
};
</script>
<style scoped></style>
