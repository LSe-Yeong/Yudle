import AnswerBar from "../asset/component/AnswerBar";
import checkWord from "../asset/component/AnswerBar";
import Maker from "../asset/component/Maker";
import "../asset/component/background.css"
import {getTodayWord, getChangeNum, getValidation} from "../api/PostApi";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserWord, insertItem, setRunning } from "../store/dataslice";
import Timer from "../asset/component/Timer";
import Cookies from "js-cookie";

const buttonStyle={
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
};

const hoverStyle = {
    backgroundColor: 'green',
};


function GamePage(){
    const [hover,setHover]=useState(false);
    const [count,setCount]=useState(1); //사용자 시도 횟수
    const [todayWord,setTodayWord]=useState([]);

    const isdisabled=(count) > 6 || count==-1 ? true : false; 
    var isValid;

    const dispatch=useDispatch();
    const data=useSelector((state)=>{
        return state.data;
      });

    console.log("재 랜더링")
    console.log(count)
    console.log(todayWord);
    console.log(data.userWord)
    console.log(data.userResult)

    function cookieDataTest(userAnswerList,userResultList){
        var inputs = document.querySelectorAll('input[name^="input"]');
        let count=0
        let j=0
        for(let i=0;i<6*userAnswerList.length;i++){
            if(i%6==0 && i!=0){
                count++
            }
            if((userResultList[count])[i%6]==="green"){
                inputs[i].style.backgroundColor="green"
            }
            else if(userResultList[count][i%6]==="orange"){
                inputs[i].style.backgroundColor="#FFA500"
            }
            else{
                inputs[i].style.backgroundColor="gray"
            }
            inputs[i].value=(userAnswerList[count])[i%6]
            inputs[i].style.color="white"
        }
        const isOver=Cookies.get("isover")
        if(isOver=="stop"){
            setCount(-1)
        }
        else{
            setCount(userAnswerList.length+1)
        }
    }

    function get_today_word(){
        getTodayWord().then((data)=>{
            setTodayWord([...data]);
        });  //
    }

    
    useEffect(() => {
        const userAnswerListJSON=Cookies.get('userAnswer')
        // Cookies.set('userAnswer',JSON.stringify([]), { expires: 1});
        // Cookies.set('userResult',JSON.stringify([]), { expires: 1});
        // Cookies.set("time",0)
        // Cookies.set("isover","pendding")
        if(userAnswerListJSON){
            const userAnswerList=JSON.parse(userAnswerListJSON)
            const userResultList=JSON.parse(Cookies.get('userResult'))
            dispatch(insertItem([userAnswerList,userResultList]))
            cookieDataTest(userAnswerList,userResultList)
        }
        else{
            Cookies.set('userAnswer',JSON.stringify([]), { expires: 1});
            Cookies.set('userResult',JSON.stringify([]), { expires: 1});
        }
        console.log("몇번 실행될까");
        get_today_word();
        // const intervalId = setInterval(get_today_word, 60 * 1000);
        // return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 interval을 정리합니다.  // 상태가 변경될 때마다 실행됩니다.
      },[]);
    
    
    return(
        <div className="backGround">
            <div>
                <Maker></Maker>
                <Timer></Timer>
            </div>
            <div>
                <AnswerBar id="1" count={count}></AnswerBar>
                <AnswerBar id="2" count={count}></AnswerBar>
                <AnswerBar id="3" count={count}></AnswerBar>
                <AnswerBar id="4" count={count}></AnswerBar>
                <AnswerBar id="5" count={count}></AnswerBar>
                <AnswerBar id="6" count={count}></AnswerBar>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                <button disabled={isdisabled} type="submit" style={hover ? { ...buttonStyle, ...hoverStyle } : buttonStyle} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} onClick={()=>{
                    var inputs = document.querySelectorAll('input[name^="input"]');
                    var elements=[];
                    var userWord=[];
                    var greenCount=0;

                    for(let i=(count-1)*6;i<(count-1)*6+6;i++){
                        userWord.push(inputs[i].value);
                        elements.push(inputs[i])
                        if(inputs[i].value==""){
                            alert("단어를 모두 입력해주세요")
                            return null;
                        }
                    }

                    const valid_data={"validWord": userWord};
                    getValidation(valid_data)
                    .then((data) => {
                        isValid = data;
                        let temp_user=[]
                        let temp_today=[]
                        let result=new Array(6)
                        for(let i=0;i<6;i++){
                            temp_user[i]=userWord[i]
                            temp_today[i]=todayWord[i]
                        }
                        if(isValid){
                            for(let i=0;i<6;i++){
                                if(temp_user[i]==='X')
                                    continue;
                                for(let j=0;j<6;j++){
                                    if(temp_user[j]===temp_today[j]){
                                        elements[j].style.color = "white"
                                        elements[j].style.transition = "background-color 0.7s ease"
                                        elements[j].style.backgroundColor ='green';
                                        result[j]="green"
                                        temp_user[j]='X'
                                        temp_today[j]='N'
                                        greenCount=greenCount+1;
                                    }
                                }
                                for(let j=0;j<6;j++){
                                    if(temp_user[i]==='X')
                                        break
                                    if(temp_user[i]===temp_today[j]){
                                        elements[i].style.color = "white"
                                        elements[i].style.transition = "background-color 0.7s ease"
                                        elements[i].style.backgroundColor = '#FFA500';
                                        result[i]="orange"
                                        temp_user[i]='X'
                                        temp_today[j]='N'
                                        break
                                    }
                                    else if(j==5){
                                        elements[i].style.color = "white"
                                        elements[i].style.transition = "background-color 0.7s ease"
                                        elements[i].style.backgroundColor = 'gray';
                                        result[i]="gray"
                                    }
                                }
                            }
                            console.log(greenCount)
                            if(greenCount==6){
                                setCount(-1);
                                Cookies.set('isover',"stop", { expires: 1 });
                                dispatch(setRunning(false))
                            }
                            else if(count==6){
                                Cookies.set('isover',"stop")
                                dispatch(setRunning(false))
                            }
                            else{
                                setCount(count+1)
                                dispatch(clearUserWord());
                                console.log(count)
                            }
                            const userAnswerList=JSON.parse(Cookies.get('userAnswer'))
                            const userResultList=JSON.parse(Cookies.get('userResult'))
                            console.log(userAnswerList)
                            userAnswerList.push(userWord)
                            userResultList.push(result)
                            Cookies.set('userAnswer',JSON.stringify(userAnswerList), { expires: 1 });
                            Cookies.set('userResult',JSON.stringify(userResultList), { expires: 1 });
                            dispatch(insertItem([userAnswerList,userResultList]))
                            console.log(userAnswerList)
                            console.log(userWord)
                        }
                        else{
                            alert("유효하지 않습니다.")
                            return null;
                        } // 비동기 작업이 완료된 후에 실행됩니다.
                    });         
                }}>입력</button>
            </div>
        </div>
    );
}

export default GamePage