<template>
    <input type="text" class="input" v-model="value" />
</template>
<script>
export default {
    name: "k-input",
    data() {
        return { value: "" };
    },
    methods: {},
    computed: {
        updateInput(event) {
            return event.target.value;
        },
    },
};
</script>
<style scoped>
.input {
    line-height: 2rem;
}
</style>
