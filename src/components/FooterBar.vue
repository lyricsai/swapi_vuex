<template>
    <footer><nav-bar /><small>2022</small></footer>
</template>
<script>
import NavBar from "./NavBar.vue";
export default {
    components: { NavBar },
};
</script>
<style scoped>
footer {
    padding: 1rem;
    box-shadow: inset 2px 2px 4px gray;
}
</style>
