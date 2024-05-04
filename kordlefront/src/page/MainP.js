import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {getInit} from "../api/PostApi";
import { useDispatch, useSelector } from 'react-redux';
import { changeUserName, setFirstStrList,changeStrList, addResult ,addWord,setRecommendWord} from '../store/dataslice';
import GamePage from "./GamePage";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import "../asset/component/background.css"

function Info(props){
    const lis=[]
    
    for(let i=0; i<props.userResponse.length; i++){
        let t=props.userResponse[i]
        lis.push(<li>{t} </li>)
    }
    return(
        <div>
           {lis}
        </div>
    )
}

function MainP(){

    const [strList,setStrList] = useState(null)
    const [request,setRequest] = useState({"word": "", "result": "", "strList": []})
    const [userResponse,setUserResponse] = useState({"word": "", "result": "", "strList": [], "resultWord": [], "resultJoinWord": []})
    const [recommendWord,setRecommendWords] = useState(null)

    const dispatch=useDispatch();
    const data=useSelector((state)=>{
      console.log(state.data)
      return state.data;
    });
    
    useEffect(() => {
        getInit().then((data)=>{
          dispatch(setFirstStrList(data));
        });  // 상태가 변경될 때마다 실행됩니다.
      },[]);

    function resetWord(){
      axios.get('/api/wordList')
      .then(response => {
        console.log(response.data)
        dispatch(changeStrList(response.data))
    })
      .catch(error => console.log(error))
      setRecommendWord(null)
    }

    // useEffect(()=>{
    //   getInit().then(response=>{
    //       setStrList(response);
    // })},[])

    async function submitWord(request){
     try{

        const response=await axios.post("/api/recommend",request);
        
        dispatch(changeStrList(response.data.resultWord));
        dispatch(setRecommendWord(response.data.resultJoinWord))
        setUserResponse(response.data);
        console.log(response.data.resultWord)
        console.log(response.data.resultJoinWord)
        // setStrList(response.data.resultWord);
        // setRecommendWord(response.data.resultJoinWord);

     }catch(error){
        console.log(error)
     }
    }

    return (
      <div className='backGround'>
        <div id="hello">
          {data.userName}님 환영합니다^^ <button onClick={()=>{
            dispatch(changeUserName("김홍도"));
          }}>ass</button>
        </div>
        <form onSubmit={(event)=>{
          event.preventDefault();
          dispatch(addWord(event.target.word.value));
          dispatch(addResult(event.target.result.value));
          request.word=data.word
          request.result=data.result
          request.strList=data.strList
          console.log(request)
          submitWord(request);
        }}>
          <div class="mb-3">
                <label class="form-label">단어를 입력하세요:</label>
                <input type="text" class="form-control" name="word" onChange={(event)=>{
                  dispatch(addWord(event.target.value))
                  console.log(data.word)
                }}></input>
            </div>
            <div class="mb-3">
                <label class="form-label">결과를 입력하세요:</label>
                <input type="text" class="form-control" name="result" onChange={(event)=>{
                  dispatch(addResult(event.target.value))
                  console.log(data.result)
                }}></input>
            </div>
            <button type="submit" class="btn btn-primary">추천 받기</button>    
        </form>
        <button type="submit" onClick={resetWord}>처음부터 하기</button>
        <div>추천 단어 리스트</div>
        <Info userResponse={data.recommend_word}></Info>
        
        <div>
          <button><a href="/play">게임 하러 가기</a></button>
        </div>
      </div>
    );
}

export default MainP