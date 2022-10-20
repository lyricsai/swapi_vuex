<template>
    <a href="#main" ref="skipLink" class="skipLink" tabindex="1"
        >Skip to main content</a
    >
    <header-bar />

    <div class="wrapper">
        <main class="main" id="main">
            <router-view />
        </main>
    </div>
    <footer-bar />
</template>

<script>
import FooterBar from "@/components/FooterBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import { mapGetters } from "vuex";

export default {
    components: { HeaderBar, FooterBar },
    methods: {
        locationHandler(e) {
            e.preventDefault();
            console.log(location);
            console.log(history, history.state);
        },
    },
    computed: {
        routeName() {
            return this.$route.name;
        },
    },
};
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body {
    height: 100vh;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    min-height: 100%;
}

.wrapper {
    flex: 1 0 auto;
    max-width: 1000px;
    margin: 1rem auto;
}

a {
    text-decoration: none;
    color: inherit;
}

ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
}

button {
    cursor: pointer;
}

details {
    margin: 0 auto;
    max-width: 400px;
    text-align: justify;
    & summary {
        text-align: center;
    }
}

.container {
    max-width: 1000px;
    margin: 0 auto;
}

.skipLink {
    white-space: nowrap;
    margin: 1em auto;
    top: 1rem;
    position: fixed;
    left: 50%;
    margin-left: -72px;
    opacity: 0;
}

.skipLink:focus {
    opacity: 1;
    background-color: white;
    padding: 0.5em;
    border: 1px solid black;
    z-index: 100;
    transition: all 0.3s ease 0s;
}
</style>
