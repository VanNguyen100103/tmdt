import axios from '../utils/axios'


export const apiGetCategories = () => axios({
    url: '/prodcategory/',
    method: 'get',

})