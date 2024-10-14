import { useEffect, useState, useRef } from "react";
import {getValidation} from "../../api/PostApi";
import { useDispatch, useSelector } from 'react-redux';
import { insertItem, setUserWord, setRunning } from "../../store/dataslice";
import Cookies from "js-cookie";

function AnswerBar(props){

    // var inputs=document.querySelectorAll('input[name^="input"]');

    const inputWordStyle={
        width: '40px',
        height: '40px',
        fontSize: '25px',
        textAlign: 'center',
        marginTop: '7px',
        marginRight: '5px',
        fontFamily: 'KyoboHandwriting2023wsa',
    };

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

    function wordChangeHandler(event){
        Cookies.set("isover","run")
        dispatch(setRunning(true))
    }

    return(
        <div style={divStyle}> 
            <input onChange={wordChangeHandler} style={inputWordStyle} name="input1" type="text" maxLength={1} disabled={isdisabled}></input>
            <input onChange={wordChangeHandler} style={inputWordStyle} name="input2" type="text" maxLength={1} disabled={isdisabled}></input>
            <input onChange={wordChangeHandler} style={inputWordStyle} name="input3" type="text" maxLength={1} disabled={isdisabled}></input>
            <input onChange={wordChangeHandler} style={inputWordStyle} name="input4" type="text" maxLength={1} disabled={isdisabled}></input>
            <input onChange={wordChangeHandler} style={inputWordStyle} name="input5" type="text" maxLength={1} disabled={isdisabled}></input>
            <input onChange={wordChangeHandler} style={inputWordStyle} name="input6" type="text" maxLength={1} disabled={isdisabled}></input>
        </div>
    );
}

export default AnswerBar