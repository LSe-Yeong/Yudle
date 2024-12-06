import { useState, useEffect } from "react";
import { getRanking } from "../../api/GetApi";
import "./RankingLayout.css"

function RankingComponent(props){

    const colorStyle = {
        "background" : "linear-gradient(to right, gold 0%, gold 30%, #fd8332 100%)"
    }

    const userData = props.users;
    const thisRankId = props.rankId;

    if(userData.length==0){
        userData.push({"id":1,"name":"- - -","time":10000,"count":-1,"score":-999})
        userData.push({"id":2,"name":"- - -","time":10000,"count":-1,"score":-999})
        userData.push({"id":3,"name":"- - -","time":10000,"count":-1,"score":-999})
    }
    else if(userData.length==1){
        userData.push({"id":2,"name":"- - -","time":10000,"count":-1,"score":-999})
        userData.push({"id":3,"name":"- - -","time":10000,"count":-1,"score":-999})
    }
    else if(userData.length==2){
        userData.push({"id":3,"name":"- - -","time":10000,"count":-1,"score":-999})
    }

    const thisUserName = userData[thisRankId-1]["name"]

    if(thisRankId==2){
        colorStyle["background"]= "gray"
    }
    else if(thisRankId==3){
        colorStyle["background"]="#f29161"
    }

    return(
        <div className="rankingComponent">
            <div className="rankingNumber" style={colorStyle}>
                <h2>{thisRankId}</h2>
            </div>
            <div className="rankingPropertys">
                <h2 className="rankingNumberTitle">오늘의 {thisRankId}위</h2>
                <h2 className="rankingName">{thisUserName}</h2>
            </div>
        </div>
    )
}

function RankingLayout(){
    const [users,setUsers] = useState([])

    useEffect(() => {
        getRanking().then((response)=>{
            setUsers(response)
        })
      },[]);

    return(
        <div className="rankingSet">
            <RankingComponent rankId={1} users={users}></RankingComponent>
            <div style={{display:"flex", flexDirection:"row", marginTop:"10px"}}>
            <RankingComponent rankId={2} users={users}></RankingComponent>
            <RankingComponent rankId={3} users={users}></RankingComponent>
            </div>
        </div>
    )
}

export default RankingLayout;