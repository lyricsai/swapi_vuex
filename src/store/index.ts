import { createStore } from "vuex";
import items from "@/store/items";
import person from "@/store/person";

export default createStore({
    modules: { items, person },
});
