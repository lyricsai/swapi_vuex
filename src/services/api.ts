import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_SWAPI_URL;

export const fetchAdditionalData = async (resolve, reject, link: string) => {
    await axios
        .get(link)
        .then((response) => resolve(response))
        .catch((response) => reject(response));
};

export const getItems = (resolve, reject, { itemClass, page, searchFor }) => {
    console.log(page);
    axios
        .get(itemClass, { params: { page, search: searchFor } })
        .then((response) => resolve(response))
        .catch((response) => reject(response));
};

export const getItem = (resolve, reject, { itemClass, id }) => {
    axios
        .get(itemClass + "/" + id)
        .then((response) => resolve(response))
        .catch((response) => reject(response));
};
