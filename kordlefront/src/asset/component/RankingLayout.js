import { useState } from "react";

function RankingLayout(){
    const [users,setUsers] = useState([
        {"name":"건공이","score":123,"isSolved":true,"date":"2024-10-01 19:34:31"},
        {"name":"파블로프","score":113,"isSolved":true,"date":"2024-10-01 19:34:32"},
        {"name":"판다","score":100,"isSolved":true,"date":"2024-10-01 19:34:38"},
        {"name":"플랑보","score":93,"isSolved":true,"date":"2024-10-01 19:34:39"},
        {"name":"벤츠","score":76,"isSolved":true,"date":"2024-10-01 19:34:39"},
        {"name":"종판","score":0,"isSolved":false,"date":"2024-10-01 19:34:39"},
        {"name":"2124km","score":0,"isSolved":false,"date":"2024-10-01 19:34:39"},
    ])

    function RankingFirstToEnd(){
        const content=[]
        if(users[0]["isSolved"])
            content.push(<h2 style={{fontSize:"40px", color:"red"}}>1등: {users[0]["name"]} : {users[0]["score"]}점</h2>)
        
        for(let i=1;i<users.length;i++){
            if(users[i]["isSolved"])
                content.push(<h2>{i+1}등: {users[i]["name"]} : {users[i]["score"]}점</h2>)
        }
        return(
            <div>
                {content}
            </div>
        )
    }

    function RankingNotSolved(){
        const content=[]
        for(let i=0;i<users.length;i++){
            if(!users[i]["isSolved"]){
                content.push(<h3 style={{margin:"0px"}}>{users[i]["name"]}</h3>)
            }
        }
        return(
            <div>
                {content}
            </div>
        )
    }

    if(users.length==0){
        return(
            <div>
                <h1>오늘의 랭킹입니다.</h1>
                <h1>단어를 맞춘 사용자가 존재하지 않습니다. <br></br>도전하세요!</h1>
            </div>
        )
    }
    else{
        return(
            <div>
                <h1>오늘의 랭킹입니다.</h1>
                <RankingFirstToEnd></RankingFirstToEnd>
                <h1 style={{marginBottom:"0px"}}>다음에 다시 도전하세요</h1>
                <RankingNotSolved></RankingNotSolved>
            </div>
        )
    }
}

export default RankingLayout;