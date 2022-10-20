<template>
    <transition name="fade">
        <nav v-show="show">
            <ul @click="closeNav">
                <li><router-link to="/">Home</router-link></li>
                <li v-for="link in links" :key="link.name">
                    <router-link
                        class="link__name"
                        :to="{ path: `/${link.name}` }"
                        >{{ link.name }}
                    </router-link>
                </li>
            </ul>
        </nav>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            links: [
                { name: "people" },
                { name: "planets" },
                { name: "films" },
                { name: "species" },
                { name: "starships" },
                { name: "vehicles" },
            ],
        };
    },
    props: {
        show: { type: Boolean, requried: true },
    },
    computed: {
        routeName() {
            return this.$route.name;
        },
    },
    methods: {
        closeNav() {
            this.$emit("update:show", false);
        },
    },
};
</script>

<style lang="scss" scoped>
nav {
    position: fixed;
    background: #fff;
    padding: 30px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    & ul {
        gap: 1rem;
        flex-direction: column;
    }
    & a {
        font-size: 1.2rem;
        &::after {
            content: " | ";
            color: teal;
        }
        &:last-child::after {
            content: "";
        }
        &:hover {
            transition: all 0.3s ease 0s;
            color: teal;
        }
        &.router-link-exact-active {
            color: teal;
        }
    }

    @media (min-width: 995px) {
        position: static;
        display: block;
        padding: 30px;

        & ul {
            flex-direction: row;
        }
    }
}
.link__name {
    text-transform: capitalize;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.7s ease-in;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
