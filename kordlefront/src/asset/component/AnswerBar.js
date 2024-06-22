import { useEffect, useState, useRef } from "react";
import {getValidation} from "../../api/PostApi";
import { useDispatch, useSelector } from 'react-redux';
import { insertItem, setUserWord, setRunning } from "../../store/dataslice";

function AnswerBar(props){

    var inputs=document.querySelectorAll('input[name^="input"]');

    const inputWordStyle={
        width: '50px',
        height: '50px',
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

    const isdisabled=Number(props.id)!=(props.count) ? true : false; 
    
    const dispatch=useDispatch();
    const data=useSelector(state=>state.data);


    if(!(data.userWord.includes("")) && Number(props.id)==props.count){
        const valid_data={"validWord": data.userWord};
        getValidation(valid_data).then((data)=>{
            console.log(data);
            if(!data){
                for(let i=(props.count-1)*6;i<(props.count-1)*6+6;i++){
                    inputs[i].style.color = 'red';
                }                
            }
        })
        console.log("다참 ㅋㅋㅋㅋ");
    }

    function wordChangeHandler(event){
        for(let i=(props.count-1)*6;i<(props.count-1)*6+6;i++){
            inputs[i].style.color = 'black';
        }     
        dispatch(setRunning(true))
        dispatch(insertItem([event.target.name,event.target.value]));
        console.log(data.userWord);
    }

    return(
        <div style={divStyle}> 
            <input onChange={(event)=>{
                wordChangeHandler(event)}} style={inputWordStyle} name="input1" type="text" maxLength={1} disabled={isdisabled}></input>
            <input onChange={wordChangeHandler} style={inputWordStyle} name="input2" type="text" maxLength={1} disabled={isdisabled}></input>
            <input onChange={wordChangeHandler} style={inputWordStyle} name="input3" type="text" maxLength={1} disabled={isdisabled}></input>
            <input onChange={wordChangeHandler} style={inputWordStyle} name="input4" type="text" maxLength={1} disabled={isdisabled}></input>
            <input onChange={wordChangeHandler} style={inputWordStyle} name="input5" type="text" maxLength={1} disabled={isdisabled}></input>
            <input onChange={wordChangeHandler} style={inputWordStyle} name="input6" type="text" maxLength={1} disabled={isdisabled}></input>
        </div>
    );
}

export default AnswerBar