<template>
    <div v-if="show" class="dialog" @click="hideDialog">
        <div class="dialog__content" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "k-dialog",
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        hideDialog() {
            this.$emit("update:show", false);
        },
    },
};
</script>
<style scoped>
.dialog {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.dialog__content {
    border-radius: 5px;
    background-color: #fff;
    min-height: 50px;
    /* width: 200px; */
    padding: 5px;
}

@media (min-width: 400px) {
    .dialog__content {
        min-height: 50px;
        min-width: 300px;
        padding: 20px;
    }
}
</style>
