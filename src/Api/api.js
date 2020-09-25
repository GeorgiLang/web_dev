import * as axios from 'axios'


const instanse = axios.create({
    baseURL: 'https://rw.langovets.com.ua/wp-json/wp/v2/',

})

export const api = {

    sendMessage(data) {

        return axios({

            method: 'post',
            url: 'https://react.langovets.com.ua/send.php',
            headers: { 'content-type': 'multipart/form-data' },
            data
        })
    },
    sendOrder(data) {

        return axios({
            method: 'post',
            url: 'https://react.langovets.com.ua/order.php',
            data
        })
    },
    registerUser(data, req) {

        return axios({
            method: 'post',
            url: `https://rw.langovets.com.ua/wp-json/wp/v2/users/${req}`,
            headers: { 'content-type': 'application/json' },
            data
        })
    },
    getToken(data) {
        return axios({
            method: 'post',
            url: 'https://rw.langovets.com.ua/wp-json/jwt-auth/v1/token',
            headers: { 'content-type': 'application/json' },
            data
        })
    },
    getNumberOfCard(category) {

        return instanse.get(`${category}?_fields=id`)
    },
    getCardData(category, page) {

        return instanse.get(`${category}?_fields=id,acf.description,acf.price,acf.old_price,acf.product_name,acf.media,acf.in_stock,acf.models,type&per_page=100&page=${page}`)
    },
    getCategoriesList() {

        return instanse.get('categories?_fields=id,acf')
    },
    getFullCard(id, category) {

        return instanse.get(`${category}/${id}?_fields=id,acf`)
    },
    getFullMedia(id, category) {

        return instanse.get(`models_${category}/${id}?_fields=id,acf`)
    },
    getModelsIdCard(id, category) {

        return instanse.get(`${category}/${id}?_fields=acf.models,acf.variants_name,acf.full_description`)
    },
    searchProduct(category, product) {

        return instanse.get(`${category}?search=${product}`)
    }
}
// filter[meta_key]=in_stock&filter[meta_value]=${in_stock}&per_page=${per_page}&page=${page}

