import { useEffect, useState, useRef } from "react";
import {getValidation} from "../../api/PostApi";
import { useDispatch, useSelector } from 'react-redux';
import { insertItem, setUserWord, setRunning, updateCurrentSelect } from "../../store/dataslice";
import Cookies from "js-cookie";
import "./AnswerBar.css";

function AnswerBar(props){

    // var inputs=document.querySelectorAll('input[name^="input"]');


    const inputRefs=useRef([useRef(null),useRef(null),useRef(null),useRef(null),useRef(null),useRef(null)])
    
   
    const isdisabled = true
    
    const data=useSelector((state)=>{
        return state.data;
    });
    const dispatch=useDispatch();
    const currentSelect = data.currentSelect

    // 유효성 검사 코드 보류
    // const userAnswer=data.userWord
    // if(!(userAnswer.includes("")) && !isdisabled){  //단어 유효성 검사
    //     const valid_data={"validWord": userAnswer};
    //     getValidation(valid_data).then((data)=>{
    //         console.log(data);
    //         if(!data){
    //             for(let i=(props.count-1)*6;i<(props.count-1)*6+6;i++){
    //                 inputs[i].style.color = 'red';
    //             }                
    //         }
    //     })
    //     console.log("다참 ㅋㅋㅋㅋ");
    // }
    // const handleKeyUp = (e, index) => {
    //     console.log("hello")
    //     const key = e.key; // 눌린 키를 확인
    //     inputRefs.current[index].current.value = e
    //     if (key === 'Backspace') {
    //         // 백스페이스 키가 눌렸을 때
    //         if (index > 0) {
    //             inputRefs.current[index - 1].current.focus(); // 이전 input으로 포커스 이동
    //         }
    //     } else if (e.target.value.length === 1 && index < inputRefs.current.length - 1) {
    //         // 입력된 글자가 1글자일 때 다음 input으로 포커스 이동
    //         inputRefs.current[index + 1].current.focus();
    //     }
    // };

    const handleKeyInput = (value,index) =>{
        if(currentSelect<6){
            inputRefs.current[index].current.value = value
            dispatch(updateCurrentSelect(currentSelect+1))
        }
    } 

    function wordChangeHandler(event){
        Cookies.set("isover","run")
        dispatch(setRunning(true))
    }

    return(
        <>
            <div className="wordContainer"> 
                <input className="inputWord" ref={inputRefs.current[0]}  onChange={wordChangeHandler}  name="input1" type="text" maxLength={1} disabled={isdisabled}></input>
                <input className="inputWord" ref={inputRefs.current[1]}  onChange={wordChangeHandler}  name="input2" type="text" maxLength={1} disabled={isdisabled}></input>
                <input className="inputWord" ref={inputRefs.current[2]}  onChange={wordChangeHandler}  name="input3" type="text" maxLength={1} disabled={isdisabled}></input>
                <input className="inputWord" ref={inputRefs.current[3]}  onChange={wordChangeHandler}  name="input4" type="text" maxLength={1} disabled={isdisabled}></input>
                <input className="inputWord" ref={inputRefs.current[4]}  onChange={wordChangeHandler}  name="input5" type="text" maxLength={1} disabled={isdisabled}></input>
                <input className="inputWord" ref={inputRefs.current[5]}  onChange={wordChangeHandler}  name="input6" type="text" maxLength={1} disabled={isdisabled}></input>
            </div>
        </>
    );
}

export default AnswerBar