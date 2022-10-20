<template>
    <header class="header">
        <div class="container">
            <router-link to="/" class="header__logo"
                ><div class="header__logo_container"><h2>SW-API</h2></div>
            </router-link>
            <div class="header__menu menu">
                <button
                    class="icon-menu header__burger"
                    type="button"
                    @click="toggleMenu"
                    ref="iconMenu"
                >
                    <div>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
                <nav-bar
                    :show="desktop || navBarVisible"
                    @update:show="toggleMenu"
                />
            </div>
        </div>
    </header>
</template>

<script>
import NavBar from "./NavBar.vue";

export default {
    components: { NavBar },
    data: () => {
        return { navBarVisible: false, desktop: false };
    },
    methods: {
        toggleMenu() {
            this.$refs.iconMenu.classList.toggle("_active");
            this.navBarVisible = !this.navBarVisible;
        },
        resizeHandler() {
            this.navBarVisible = false;
            if (window.innerWidth > 995) {
                this.desktop = true;
                this.$refs.iconMenu.classList.remove("_active");
            } else {
                this.desktop = false;
            }
        },
    },
    mounted() {
        window.addEventListener("resize", this.resizeHandler);
        this.resizeHandler();
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.resizeHandler);
    },
};
</script>

<style lang="scss" scoped>
h1,
.header__logo h2 {
    color: teal;
    font-size: 2rem;
    transition: all 0.3s ease 0s;
    &:hover {
        font-size: 2.3rem;
    }
}
.header {
    max-width: 100%;
    box-shadow: 2px 2px 4px gray;
    & .container {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &__actions {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
    &__logo_container {
        width: 200px;
    }
    &__menu {
        @media (max-width: 995px) {
            order: -1;
        }
    }
}
.icon-menu {
    display: none;
    @media (max-width: 995px) {
        margin: 1rem;
        display: block;
        position: relative;
        min-width: 57px;
        height: 30px;
        z-index: 5;
        border: none;
        background: none;
        color: gray;
        transition: all 0.3s ease 0s;
        &:hover {
            background: #fff;
            color: teal;
        }
        span {
            transition: all 0.3s ease 0s;
            top: calc(50% - 1px);
            left: 0px;
            position: absolute;
            width: 100%;
            height: 2px;
            background: gray;
            transition: all 0.3s ease 0s;
            &:first-child {
                top: 0px;
                width: 50%;
            }
            &:last-child {
                top: auto;
                bottom: 0px;
                width: 70%;
            }
        }
        &._active {
            span {
                transform: scale(0);
                width: 100%;
                &:first-child {
                    transform: rotate(-45deg);
                    top: calc(50% - 1px);
                }
                &:last-child {
                    transform: rotate(45deg);
                    bottom: calc(50% - 1px);
                }
            }
        }
    }
}
</style>
