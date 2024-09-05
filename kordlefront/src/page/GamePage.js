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
import Modal from "react-modal"
import { changeWord } from "../api/GetApi";

const customStyles={
    overlay: {
        backgroundColor : "rgba(0,0,0,0.5)",
    },
    content : {
        width : "300px",
        height : "400px",
        margin : "auto",
        borderRadius : "4px",
        boxShadow : "0 2px 4px rgba(0,0,0,0.2)",
        padding: "20px"
    }
}
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

function ModalContent(props){
    const second = props.second
    const count = props.count
    const total = 200 - (0.4*Number(second) + 10*Number(count));

    function Message(){
        if(count==-1){
            return(
                <div>
                    <h2 style={{fontSize:"20px"}}>아쉽게 실패하셨습니다 다음 기회에 도전하세요~~</h2>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h2 style={{fontSize:"40px"}}>시도 횟수 : {count} 회 </h2> 
                    <h2 style={{fontSize:"40px"}}>걸린 시간 : {second} 초 </h2>
                    <h2 style={{fontSize:"40px"}}>총 점수 : {total} </h2>  
                    <h2 style={{marginTop:"50px"}}> 이름을 입력해주세요</h2>
                    <input type="text"></input>        
                    <button style={{marginLeft:"10px"}}>확인</button> 
                </div>
            )
        }
    }

    return(
        <Message></Message>
    )
}


function GamePage(){
    const [hover,setHover]=useState(false);
    const [count,setCount]=useState(1); //사용자 시도 횟수
    const [rightCount,setRightCount] = useState(1)
    const [todayWord,setTodayWord]=useState([]);
    const [isOpen,setIsOpen]=useState(false)

    const expirationTime = new Date();

    if(12<=expirationTime.getHours() && expirationTime.getHours()<24){ //자정 ~ 정오
        expirationTime.setDate(expirationTime.getDate()+1)
    }
    expirationTime.setHours(12, 0, 0, 0); // 시, 분, 초, 밀리초 설정
    
    const openModal = () =>{
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const isdisabled=(count) > 6 || count==-1 ? true : false; 
    var isValid;

    const dispatch=useDispatch();
    const data=useSelector((state)=>{
        return state.data;
    });

    function cookieDataSetting(userAnswerList,userResultList){
        var inputs = document.querySelectorAll('input[name^="input"]');
        let count=0
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
            setIsOpen(true)
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

    function settingData(){
        const userAnswerListJSON=Cookies.get('userAnswer')
        // Cookies.set('userAnswer',JSON.stringify([]), { expires: expirationTime });
        // Cookies.set('userResult',JSON.stringify([]), { expires: 1});
        // Cookies.set("time",0,{expires: 1})
        // Cookies.set("isover","pendding",{expires: 1})
        if(userAnswerListJSON){
            const userAnswerList=JSON.parse(userAnswerListJSON)
            const userResultList=JSON.parse(Cookies.get('userResult'))
            dispatch(insertItem([userAnswerList,userResultList]))
            cookieDataSetting(userAnswerList,userResultList)
        }
        else{
            Cookies.set('userAnswer',JSON.stringify([]), { expires: expirationTime});
            Cookies.set('userResult',JSON.stringify([]), { expires: expirationTime});
            Cookies.set("time",0,{expires:expirationTime})
            Cookies.set("isover","pendding",{expires:expirationTime})
            window.location.reload()
        }
    }
    
    function addCookieData(userWord,result){
        const userAnswerList=JSON.parse(Cookies.get('userAnswer'))
        const userResultList=JSON.parse(Cookies.get('userResult'))
        userAnswerList.push(userWord)
        userResultList.push(result)
        Cookies.set('userAnswer',JSON.stringify(userAnswerList), { expires: expirationTime });
        Cookies.set('userResult',JSON.stringify(userResultList), { expires: expirationTime });
        dispatch(insertItem([userAnswerList,userResultList]))
    }

    useEffect(() => {
        settingData()
        get_today_word();
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
                            if(greenCount==6){ //다 맞춘 경우
                                setRightCount(count)
                                Cookies.set("rightCount",count)
                                setCount(-1);
                                Cookies.set('isover',"stop", { expires: 1 });
                                setIsOpen(true)
                                dispatch(setRunning(false))
                            }
                            else if(count==6){ //모든 기회 다쓴 경우
                                Cookies.set('isover',"stop",{expires: 1 })
                                setCount(count+1)
                                setRightCount(-1)
                                Cookies.set("rightCount",-1)
                                setIsOpen(true)
                                dispatch(setRunning(false))
                            }
                            else{ //나머지 경우 다음 기회로 
                                setCount(count+1)
                                dispatch(clearUserWord());
                            }

                            //쿠키 데이터 처리
                            addCookieData(userWord,result);
                        }
                        else{
                            alert("유효하지 않습니다.")
                            return null;
                        } 
                    });         
                }}>입력</button>
                <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
                    <ModalContent second={Cookies.get("time")} count={Cookies.get("rightCount")}></ModalContent>
                </Modal>
            </div>
        </div>
    );
}

export default GamePage