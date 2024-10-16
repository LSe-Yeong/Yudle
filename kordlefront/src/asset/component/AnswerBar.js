import { useEffect, useState, useRef } from "react";
import {getValidation} from "../../api/PostApi";
import { useDispatch, useSelector } from 'react-redux';
import { insertItem, setUserWord, setRunning } from "../../store/dataslice";
import Cookies from "js-cookie";
import "./AnswerBar.css";

function AnswerBar(props){

    // var inputs=document.querySelectorAll('input[name^="input"]');

    const inputRefs=useRef([useRef(null),useRef(null),useRef(null),useRef(null),useRef(null),useRef(null)])

    const inputStyle = {
        width: '50px', // 각 입력 필드의 너비
        height: '30px', // 각 입력 필드의 높이
        marginRight: '5px', // 각 입력 필드 사이의 간격
        border: '1px solid #ccc', // 테두리 스타일
        boxSizing: 'border-box' // 테두리를 요소의 너비와 높이에 포함시킴
      };
    
    
    const divStyle={
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const id=Number(props.id)
    const count = props.count
    const isdisabled = id != count ? true : false; 
    const dispatch=useDispatch();

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
    const handleKeyUp = (e, index) => {
        const key = e.key; // 눌린 키를 확인

        if (key === 'Backspace') {
            // 백스페이스 키가 눌렸을 때
            if (index > 0) {
                inputRefs.current[index - 1].current.focus(); // 이전 input으로 포커스 이동
            }
        } else if (e.target.value.length === 1 && index < inputRefs.current.length - 1) {
            // 입력된 글자가 1글자일 때 다음 input으로 포커스 이동
            inputRefs.current[index + 1].current.focus();
        }
    };

    function wordChangeHandler(event){
        Cookies.set("isover","run")
        dispatch(setRunning(true))
    }

    return(
        <div style={divStyle}> 
            <input className="inputWord" ref={inputRefs.current[0]} onKeyUp={(e)=> handleKeyUp(e,0)} onChange={wordChangeHandler}  name="input1" type="text" maxLength={1} disabled={isdisabled}></input>
            <input className="inputWord" ref={inputRefs.current[1]} onKeyUp={(e)=> handleKeyUp(e,1)} onChange={wordChangeHandler}  name="input2" type="text" maxLength={1} disabled={isdisabled}></input>
            <input className="inputWord" ref={inputRefs.current[2]} onKeyUp={(e)=> handleKeyUp(e,2)} onChange={wordChangeHandler}  name="input3" type="text" maxLength={1} disabled={isdisabled}></input>
            <input className="inputWord" ref={inputRefs.current[3]} onKeyUp={(e)=> handleKeyUp(e,3)} onChange={wordChangeHandler}  name="input4" type="text" maxLength={1} disabled={isdisabled}></input>
            <input className="inputWord" ref={inputRefs.current[4]} onKeyUp={(e)=> handleKeyUp(e,4)} onChange={wordChangeHandler}  name="input5" type="text" maxLength={1} disabled={isdisabled}></input>
            <input className="inputWord" ref={inputRefs.current[5]} onKeyUp={(e)=> handleKeyUp(e,5)} onChange={wordChangeHandler}  name="input6" type="text" maxLength={1} disabled={isdisabled}></input>
        </div>
    );
}

export default AnswerBar