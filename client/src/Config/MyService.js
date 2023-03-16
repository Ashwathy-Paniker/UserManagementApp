import axios from 'axios'
import { MAIN_URL } from './Url'
let token=localStorage.getItem('_token');

export function addUser(formData){
   console.log(formData);
   return axios.post(`${MAIN_URL}adduser`,formData);
}

export function getUser() {
   return axios.get(`${MAIN_URL}getuser`);
}
export function editUser(data,id) {
   console.log(id);
   return axios.post(`${MAIN_URL}edituser/${id}`, data);
}
export function deleteUser(id) {
   console.log(id._id);
   return axios.get(`${MAIN_URL}deleteuser/${id._id}`);
}