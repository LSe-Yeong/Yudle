import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Info(props){
    const lis=[]
    
    for(let i=0; i<props.userResponse.resultJoinWord.length; i++){
        let t=props.userResponse.resultJoinWord[i]
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
    const [recommendWord,setRecommendWord] = useState(null)

    // useEffect(() => {
    //     console.log(strList); // 상태가 변경될 때마다 실행됩니다.
    //   }, [strList]);

    function resetWord(){
      axios.get('/api/wordList')
      .then(response => {
        setStrList(response.data);
        console.log(response.data);
    })
      .catch(error => console.log(error))
      setRecommendWord(null)
    }

    async function submitWord(request){
     try{
        console.log(strList);

        const response=await axios.post("/api/recommend",request);
        setUserResponse(response.data);
        console.log(response.data.resultWord)
        console.log(response.data.resultJoinWord)
        setStrList(response.data.resultWord);
        setRecommendWord(response.data.resultJoinWord);

     }catch(error){
        console.log(error)
     }
    }

    return (
      <>
        <form onSubmit={(event)=>{
          event.preventDefault();
          request.word=event.target.word.value
          request.result=event.target.result.value
          request.strList=strList
          console.log(request)
          submitWord(request);
        }}>
          <div class="mb-3">
                <label class="form-label">단어를 입력하세요:</label>
                <input type="text" class="form-control" name="word"></input>
            </div>
            <div class="mb-3">
                <label class="form-label">결과를 입력하세요:</label>
                <input type="text" class="form-control" name="result"></input>
            </div>
            <button type="submit" class="btn btn-primary">추천 받기</button>    
        </form>
        <button type="submit" onClick={resetWord}>처음부터 하기</button>
        <div>추천 단어 리스트</div>
        <Info userResponse={userResponse}></Info>
      </>
    );
}

export default MainP