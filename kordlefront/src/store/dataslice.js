import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// async function setFristStrList(){
//     const response = await axios.get("/api/wordList")
//     return response.data
// }

const initialState = {
    userName: "김철수",
    userWord: ["","","","","",""],
    word: "",
    result : "",
    strList : [],
    recommend_word: []
}

const dataSlice = createSlice({
    name: "dataSlice",
    initialState: initialState,
    reducers:{
        insertItem: (state, action, callback)=>{
            console.log(action);
            const idxStr=action.payload[0];
            const idx = parseInt(idxStr.match(/\d+/)[0]);
            console.log(idx);
            (state.userWord)[idx-1]=action.payload[1];

        },
        setFirstStrList: (state,action) => {
            state.strList=action.payload
        },
        setUserWord: (state,action) =>{
            state.userWord=action.payload
        },
        clearUserWord: (state,action)=>{
            state.userWord=["","","","","",""];
        },
        clearWord:(state) => {
            state.word="";
        },
        addWord: (state, action) => {
            state.word=action.payload;
        },
        clearResult:(state) =>{
            state.result="";
        },
        addResult:(state,action)=>{
            state.result=action.payload;
        },
        changeStrList: (state,action) =>{
            state.strList=action.payload
        },
        setRecommendWord: (state,action) =>{
            state.recommend_word=action.payload;
            console.log(state.recommend_word);
        },
        changeUserName: (state,action)=>{
            console.log(action);
            state.userName=action.payload;
        }
        
        //함수 작성
    }
});


export default dataSlice;
export const {insertItem, setUserWord, clearUserWord, setFirstStrList, clearWord, addWord,clearResult,addResult,changeStrList,setRecommendWord,changeUserName } = dataSlice.actions; // 괄호 안 함수 작성