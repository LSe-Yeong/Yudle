import AnswerBar from "../asset/component/AnswerBar";
import Maker from "../asset/component/Maker";
import "../asset/component/background.css"
import clockImg from "../asset/image/clock.png"
import "./GamePage.css"
import {getTodayWord, getChangeNum, getValidation, saveUser} from "../api/PostApi";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserWord, insertItem, setRunning,updateJamoState,updateCurrentSelect } from "../store/dataslice";
import Timer from "../asset/component/Timer";
import Cookies from "js-cookie";
import Modal from "react-modal"
import { useNavigate } from "react-router-dom";
import JamoLayout from "../asset/component/JamoLayout";
import RankingLayout from "../asset/component/RankingLayout";
import DescriptionButton from "../asset/component/DescriptionButton";
import RankingButton from "../asset/component/RankingButton";
import RankingHeader from "../asset/component/RankingHeader";

const expirationTime = new Date();

if(12<=expirationTime.getHours() && expirationTime.getHours()<24){ //자정 ~ 정오
    expirationTime.setDate(expirationTime.getDate()+1)
}
expirationTime.setHours(12, 0, 0, 0); // 시, 분, 초, 밀리초 설정
    
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

function ModalContent(props){
    const second = props.second
    const count = props.count
    const total = parseInt(200 - (0.4*Number(second) + 10*Number(count)));
    const [name,setName] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        setName(Cookies.get("name"))
      },[]);

    function nameHandler(event){
        setName(event.target.value)
    }

    function saveName(state){
        Cookies.set("name",name,{expires: expirationTime})
        const userData={
            "name" : name,
            "time" : Math.floor(second),
            "count" : Math.floor(count),
            "score" : total,
            "isSolved" : state
        }
        if(state==false){
            userData["score"]=-1
        }

        saveUser(userData)
        alert(name+"님 등록 되었습니다.")
        navigate("/")
    }

    if(count==-1){
        if(Cookies.get("name")){
            return(
                <div>
                    <h2 style={{fontSize:"20px"}}>{name}님 안녕하세요 아쉽게 실패하셨습니다 다음 기회에 도전하세요~~</h2>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h2 style={{fontSize:"20px"}}>아쉽게 실패하셨습니다. 다음 기회에 도전하세요~~</h2>
                    <h2 style={{marginTop:"50px"}}> 이름을 입력해주세요</h2>
                    <input type="text" name="saveName" onChange={nameHandler}></input>        
                    <button style={{marginLeft:"10px"}} onClick={()=>{saveName(false)}}>확인</button> 
                </div>
            )
        }
    }

    else{
        if(Cookies.get("name")){
            return(
                <div>
                    <h2> {name}님 안녕하세요 </h2>
                    <h2 style={{fontSize:"40px"}}>시도 횟수 : {count} 회 </h2> 
                    <h2 style={{fontSize:"40px"}}>걸린 시간 : {second} 초 </h2>
                    <h2 style={{fontSize:"40px"}}>총 점수 : {total} </h2> 
                    <h2> 입니다. </h2>
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
                    <input type="text" name="saveName2" onChange={nameHandler}></input>        
                    <button style={{marginLeft:"10px"}} onClick={()=>{saveName(true)}}>확인</button> 
                </div>
            )
        }
    }
}

  
function JamoButton(props){
    const count = props.count
    var inputs = document.querySelectorAll('input[name^="input"]');
    const dispatch=useDispatch();
    const data=useSelector((state)=>{
        return state.data;
    });
    const currentSelect = data.currentSelect
    const jamoList = data.jamoList
    const lineStandard=[0,8,8+9,8+9+7]
    const buttonContents = []

    const handleKeyInput = (value) =>{
        if(inputs[0].value!=" "){
            Cookies.set("isover","run")
            dispatch(setRunning(true))
        }
        if(currentSelect<6){
            if(currentSelect==5 && inputs[(count-1)*6+currentSelect].value!=""){
                return
            }
            inputs[(count-1)*6+currentSelect].value=value
            if(currentSelect<5){
                dispatch(updateCurrentSelect(currentSelect+1))
            }
        }
    } 

    const handleBackInput = () =>{
        if(currentSelect>-1){
            if(currentSelect==0 && inputs[(count-1)*6+currentSelect].value==""){
                return
            }
            inputs[(count-1)*6+currentSelect].value=""
            if(currentSelect>0){
                dispatch(updateCurrentSelect(currentSelect-1))
            }   
        }
    }
    
    for(let t=0;t<lineStandard.length-1;t++){
        for(let i=lineStandard[t];i<lineStandard[t+1];i++){
            buttonContents.push(<button style={{color:jamoList[i].state}} onClick={()=>{handleKeyInput(jamoList[i].name)}}>{jamoList[i].name}</button>)
        }
        if(t==0){
            buttonContents.push(<button onClick={()=>{handleBackInput()}}>←</button>)
        }
        buttonContents.push(<br></br>)
    }

    return(
        <div className="jamoButtonContainer">
            {buttonContents}
        </div>
    )
}


function GamePage(){
    const [hover,setHover]=useState(false);
    const [count,setCount]=useState(1); //사용자 시도 횟수
    const [rightCount,setRightCount] = useState(1)
    const [todayWord,setTodayWord]=useState([]);
    const [isOpen,setIsOpen]=useState(false)

    // const expirationTime = new Date();

    // if(12<=expirationTime.getHours() && expirationTime.getHours()<24){ //자정 ~ 정오
    //     expirationTime.setDate(expirationTime.getDate()+1)
    // }
    // expirationTime.setHours(12, 0, 0, 0); // 시, 분, 초, 밀리초 설정
    
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
            if((userResultList[count])[i%6]==="#f55980"){
                inputs[i].style.backgroundColor="#f55980"
                dispatch(updateJamoState([userAnswerList[count][i%6],"#f55980"]))
            }
            else if(userResultList[count][i%6]==="#F2C53D"){
                inputs[i].style.backgroundColor="#F2C53D"
                dispatch(updateJamoState([userAnswerList[count][i%6],"#F2C53D"]))
            }
            else{
                inputs[i].style.backgroundColor="#49C2F2"
                dispatch(updateJamoState([userAnswerList[count][i%6],"#49C2F2"]))
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
        // Cookies.set('userResult',JSON.stringify([]), { expires: expirationTime});
        // Cookies.set("time",0,{expires: expirationTime})
        // Cookies.set("isover","pendding",{expires: expirationTime})
        // Cookies.remove("name")
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
        <div>
            <div className="container">
                <RankingHeader></RankingHeader>
                <div className="game">
                    <div className="ArticleHeader">
                        <img className="clockImg" src={clockImg} alt="없음"></img>
                        <div>
                            <Maker></Maker>
                            <Timer></Timer>
                        </div>
                    </div>
                    <div className="gameboard">
                        <AnswerBar></AnswerBar>
                        <AnswerBar></AnswerBar>
                        <AnswerBar></AnswerBar>
                        <AnswerBar></AnswerBar>
                        <AnswerBar></AnswerBar>
                        <AnswerBar></AnswerBar>
                        <JamoButton count={count}></JamoButton>
                    </div>
                    <div className="buttonDiv">
                        <button className="subButton" disabled={isdisabled} type="submit" onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} onClick={()=>{
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
                                    dispatch(updateCurrentSelect(0))
                                    for(let i=0;i<6;i++){
                                        if(temp_user[i]==='X')
                                            continue;
                                        for(let j=0;j<6;j++){
                                            if(temp_user[j]===temp_today[j]){
                                                elements[j].style.color = "white"
                                                elements[j].style.transition = "background-color 0.7s ease"
                                                elements[j].style.backgroundColor ='#f55980';
                                                result[j]="#f55980"
                                                dispatch(updateJamoState([temp_user[j],"#f55980"]))
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
                                                elements[i].style.backgroundColor = '#F2C53D';
                                                result[i]="#F2C53D"
                                                dispatch(updateJamoState([temp_user[i],"#F2C53D"]))
                                                temp_user[i]='X'
                                                temp_today[j]='N'
                                                break
                                            }
                                            else if(j==5){
                                                elements[i].style.color = "white"
                                                elements[i].style.transition = "background-color 0.7s ease"
                                                elements[i].style.backgroundColor = '#49C2F2';
                                                result[i]="#49C2F2"
                                                dispatch(updateJamoState([temp_user[i],"#49C2F2"]))
                                            }
                                        }
                                    }
                                    if(greenCount==6){ //다 맞춘 경우
                                        setRightCount(count)
                                        Cookies.set("rightCount",count,{expires: expirationTime})
                                        setCount(-1);
                                        Cookies.set('isover',"stop", { expires: expirationTime });
                                        setIsOpen(true)
                                        dispatch(setRunning(false))
                                    }
                                    else if(count==6){ //모든 기회 다쓴 경우
                                        Cookies.set('isover',"stop",{expires: expirationTime })
                                        setCount(count+1)
                                        setRightCount(-1)
                                        Cookies.set("rightCount",-1,{expires: expirationTime})
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
                            <ModalContent second={Cookies.get("time")/100} count={Cookies.get("rightCount")}></ModalContent>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GamePage