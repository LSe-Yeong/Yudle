import axios from "axios";

export async function changeWord(){
    try{
        const response = await axios.get('/api/change/word')
        return response.data;
    }
    catch(error){
        console.log(error);
        return [];
    }
} 

export async function getRanking(){
    try{
        const response = await axios.get('/api/get/rank')
        return response.data
    }catch(error){
        console.log(error)
        return [];
    }
}