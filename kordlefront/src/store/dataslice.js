import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// async function setFristStrList(){
//     const response = await axios.get("/api/wordList")
//     return response.data
// }

const initialState = {
    userName: "김철수",
    userWord: [["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""]],
    userResult: [["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""],["","","","","",""]],
    jamoList: [
        {"name":'ㄱ',"state":"none"},
        {"name":'ㄴ',"state":"none"},
        {"name":'ㄷ',"state":"none"},
        {"name":'ㄹ',"state":"none"},
        {"name":'ㅁ',"state":"none"},
        {"name":'ㅂ',"state":"none"},
        {"name":'ㅅ',"state":"none"},
        {"name":'ㅇ',"state":"none"},
        {"name":'ㅈ',"state":"none"},
        {"name":'ㅊ',"state":"none"},
        {"name":'ㅋ',"state":"none"},
        {"name":'ㅌ',"state":"none"},
        {"name":'ㅍ',"state":"none"},
        {"name":'ㅎ',"state":"none"},
        {"name":'ㅏ',"state":"none"},
        {"name":'ㅑ',"state":"none"},
        {"name":'ㅓ',"state":"none"},
        {"name":'ㅕ',"state":"none"},
        {"name":'ㅗ',"state":"none"},
        {"name":'ㅛ',"state":"none"},
        {"name":'ㅜ',"state":"none"},
        {"name":'ㅠ',"state":"none"},
        {"name":'ㅡ',"state":"none"},
        {"name":'ㅣ',"state":"none"},
    ],
    isRunning : false,
    second: 0,

    word: "",
    result : "",
    strList : [],
    recommend_word: [],
}

const dataSlice = createSlice({
    name: "dataSlice",
    initialState: initialState,
    reducers:{
        insertItem: (state, action)=>{
            state.userWord=action.payload[0]
            state.userResult=action.payload[1]
        },
        updateJamoState: (state,action)=>{
            let jamo=action.payload[0]
            let color=action.payload[1]
            for(let i=0;i<state.jamoList.length;i++){
                if(jamo===state.jamoList[i]["name"]){
                    state.jamoList[i]["state"]=color
                }
            }
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
        },
        changeUserName: (state,action)=>{
            state.userName=action.payload;
        },
        setRunning: (state,action)=>{
            state.isRunning=action.payload;
        },
        setSecond: (state,action)=>{
            state.second=action.payload;
        }
        //함수 작성
    }
});


export default dataSlice;
export const {insertItem, updateJamoState,setUserWord, clearUserWord, setFirstStrList, clearWord, addWord,clearResult,addResult,changeStrList,setRecommendWord,changeUserName ,setRunning,  setSecond } = dataSlice.actions; // 괄호 안 함수 작성