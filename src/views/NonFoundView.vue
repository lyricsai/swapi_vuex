<template>
    <h3 class="nonfound">Page was not found</h3>
    <router-link to="/">Return Home</router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "NonFoundView",
    components: {},
});
</script>
