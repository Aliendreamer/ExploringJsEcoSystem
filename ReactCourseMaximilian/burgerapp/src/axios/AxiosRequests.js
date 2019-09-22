import axios from 'axios';


const instance = axios.create({
    baseURL: "https://burgerapp-d7689.firebaseio.com/"
})
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default instance;