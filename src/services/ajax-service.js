import axios from "axios";
import { BASE_URL } from "../constants";
const baseUrl = BASE_URL + '/api/v1';

class AjaxService {

    getUrl = (url, id) => {
        if (id > 0) {
            return baseUrl + url, id
        }
        else {
            return baseUrl + url
        }
    }

    async get(url, id = 0, token = false) {
        let headers = {
            'Content-Type': 'application/json',
        }

        if (token) {
            headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
        }

        let options = { method: 'GET', headers: headers }

        return fetch(this.getUrl(url, id), options)
            .then(async (response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    const result = await response.json();
                    return result;
                }
            })
            .then(data => {
                return data;
            })
            .catch(async error => {
                console.error("error get data:", error)
            })
    }

    async post(url, data = null) {

        const token = localStorage.getItem('token');
        const isFormData = data instanceof FormData;

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        if (isFormData) {
            delete headers['Content-Type'];
        }

        return fetch(this.getUrl(url), {
            method: 'POST',
            headers: headers,
            body: isFormData ? data : JSON.stringify(data)
        })
            .then(async (response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    const result = await response.json();
                    return result;
                }
            })
            .then((result) => {
                return result
            })
            .catch(error => {
                console.error("error post data:", error)
            })
    }

    async delete(url, id) {

        const token = localStorage.getItem('token');

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        let options = { method: 'DELETE', headers: headers }

        return fetch(this.getUrl(url) + id, options)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error("error deleting data:", error)
            })
    }

    async getAccessToken(credentials) {

        let data = {
            email: credentials.email,
            password: credentials.password,
            form_type: "customer",
            invalidPhone: true,
            showInvalidPhone: false
        };

        const uri = `${baseUrl}/auth/login`;
        let headers = {
            'Accept': 'application/json',
        };
        let options = {
            method: 'POST',
            headers: headers,
            url: uri,
            data: data,
        }

        return axios(options).then(response => {

            if (!response.status) {
                return response;
            } else {
                return response.data;
            }
        }).catch(function (error) {
            console.error("error fetchinng data:", error)
            return error.response.data
        });
    }
}

const ajaxService = new AjaxService()

export default ajaxService