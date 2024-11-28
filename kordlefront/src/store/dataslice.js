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
        {"name":'ㅂ',"state":"black"},
        {"name":'ㅈ',"state":"black"},
        {"name":'ㄷ',"state":"black"},
        {"name":'ㄱ',"state":"black"},
        {"name":'ㅅ',"state":"black"},
        {"name":'ㅛ',"state":"black"},
        {"name":'ㅕ',"state":"black"},
        {"name":'ㅑ',"state":"black"},
        {"name":'ㅁ',"state":"black"},
        {"name":'ㄴ',"state":"black"},
        {"name":'ㅇ',"state":"black"},
        {"name":'ㄹ',"state":"black"},
        {"name":'ㅎ',"state":"black"},
        {"name":'ㅗ',"state":"black"},
        {"name":'ㅓ',"state":"black"},
        {"name":'ㅏ',"state":"black"},
        {"name":'ㅣ',"state":"black"},
        {"name":'ㅋ',"state":"black"},
        {"name":'ㅌ',"state":"black"},
        {"name":'ㅊ',"state":"black"},
        {"name":'ㅍ',"state":"black"},
        {"name":'ㅠ',"state":"black"},
        {"name":'ㅜ',"state":"black"},
        {"name":'ㅡ',"state":"black"},
    ],
    isRunning : false,
    second: 0,
    currentSelect: 0,

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

        updateCurrentSelect: (state,action)=>{
            state.currentSelect=action.payload
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
export const {insertItem, updateJamoState,setUserWord, clearUserWord, setFirstStrList, clearWord, addWord,clearResult,addResult,changeStrList,setRecommendWord,changeUserName ,setRunning,  setSecond,updateCurrentSelect } = dataSlice.actions; // 괄호 안 함수 작성