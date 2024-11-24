import { useState, useEffect } from "react";
import { getRanking } from "../../api/GetApi";
import "./RankingLayout.css"

function RankingComponent(props){

    const colorStyle = {
        "background" : "linear-gradient(to right, gold 0%, gold 30%, #fd8332 100%)"
    }

    const userData = props.users;
    const thisRankId = props.rankId;
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
    const [users,setUsers] = useState()
    const [testUsers,setTestUsers] = useState([{"id":1,"name":"전역이 2026"},{"id":2,"name":"전역이 2026"},{"id":3,"name":"전역이 2026"}])
    useEffect(() => {
        getRanking().then((response)=>{
            setUsers(response)
        })
      },[]);

    return(
        <div className="rankingSet">
            <RankingComponent rankId={1} users={testUsers}></RankingComponent>
            <div style={{display:"flex", flexDirection:"row", marginTop:"10px"}}>
            <RankingComponent rankId={2} users={testUsers}></RankingComponent>
            <RankingComponent rankId={3} users={testUsers}></RankingComponent>
            </div>
        </div>
    )
}

export default RankingLayout;