import axios from "axios";
import {config} from "../config";

export default function getAllRDV() {
    console.log("Yesss !!!")
    return axios.get('http://localhost:5000/api/v1/book') 
    .then((res)=>{
        console.log("res : ", res.data)
        return res.data
    })
    .catch((err)=>{
        throw err; 
    })    
}

