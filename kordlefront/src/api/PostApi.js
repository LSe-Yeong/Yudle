import axios from "axios";

export async function getInit(){
    try{
        const response = await axios.get('/api/wordList')
        return response.data;
    }
    catch(error){
        console.log(error);
        return [];
    }
} 

export async function getTodayWord(){
    try{
        const response = await axios.get('/api/todayWord')
        return response.data
    }
    catch(error){
        console.log(error)
        return [];
    }
}


export async function getValidation(valid_word){
    try{
        const response = await axios.post('/api/validation',valid_word);
        return response.data;
    }
    catch(error){
        console.log(error)
        return [];
    }
}

export async function saveUser(data) {
    try{
        const response = await axios.post('/api/save/rank',data);
        return response.data;
    }
    catch(error){
        console.log(error)
        return [];
    }
}
// export async function getChangeNum(){
//     try{
//         const response = await axios.get('/api/change/number')
//         return response.data
//     }
//     catch(error){
//         console.log(error)
//         return [];
//     }
// }