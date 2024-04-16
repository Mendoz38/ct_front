import axios from "axios";
import {config} from "../config";

export function getAllRDV() {
    return axios.get(config.api_url+'/api/v1/book') 
    .then((res)=>{
        console.log("Dans api/ct.js res : ", res.data)
        return res.data
    })
    .catch((err)=>{
        throw err; 
    })    
}

export function addRDV(data) {
    console.log("Dans api/ct.js  addRDV : ", data)
    return axios.post(config.api_url+'/api/v1/book/add', data)
    .then((res)=>{
        console.log("Dans api/ct.js res : ", res.data)
        return res.data
    })
    .catch((err)=>{
        throw err; 
    })    
}

export default getAllRDV