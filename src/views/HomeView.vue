<template>
    <h2 class="home">Star Wars Info</h2>
    <home-section
        :itemClass="'people'"
        :heading="'Meet your Heroes'"
        :tab="2"
    />
    <home-section
        :itemClass="'planets'"
        :heading="'Planets in the Galaxy'"
        :tab="3"
    />
    <home-section
        :itemClass="'films'"
        :heading="'Movies of the Saga'"
        :tab="4"
    />
    <home-section
        :itemClass="'species'"
        :heading="'All kinds of species'"
        :tab="5"
    />
    <home-section :itemClass="'starships'" :heading="'Starships'" :tab="6" />
    <home-section :itemClass="'vehicles'" :heading="'Vehicles'" :tab="7" />
</template>

<script lang="ts">
import HomeSection from "@/components/HomeSection.vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: "HomeView",
    components: { HomeSection },
});
</script>

<style lang="scss" scoped></style>
