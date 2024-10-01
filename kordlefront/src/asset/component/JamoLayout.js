import { useSelector,useDispatch } from "react-redux";

function Jamo(props){
    const JamoStyle={
        display:"inline-block",
        width:"30px",
        height:"30px",
        fontSize:"25px",
        marginLeft:"4px",
        marginTop:"4px",
        borderRadius:"5px",
        border: "1px solid black",
        textAlign:"center",
        backgroundColor : props.color==="none" ? "white" : props.color,
        color : props.color==="none" ? "black" : "white"
    }

    return(
        <div style={JamoStyle}>
            {props.value}
        </div>
    )
}

function JamoLayout(){
    const dispatch=useDispatch();
    const data=useSelector((state)=>{
        return state.data;
    });
    let content=[]
    console.log(data.jamoList.length)
    content.push(<h1 style={{margin:"0px",textAlign:"center"}}>자음 모음 사용 여부</h1>)
    content.push(<h2>------------------------------------------------</h2>)
    content.push(<br></br>)

    content.push(<h3 style={{margin:"0px"}}>전체 자모</h3>)
    
    for(let i=0;i<data.jamoList.length;i++){
        if(["ㄱ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ","ㅅ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"].includes(data.jamoList[i]["name"]))
        content.push(<Jamo value={data.jamoList[i]["name"]} color={data.jamoList[i]["state"]}></Jamo>)
    }

    for(let i=0;i<data.jamoList.length;i++){
        if(["ㅏ","ㅑ","ㅓ","ㅕ","ㅗ","ㅛ","ㅜ","ㅠ","ㅡ","ㅣ"].includes(data.jamoList[i]["name"]))
        content.push(<Jamo value={data.jamoList[i]["name"]} color={data.jamoList[i]["state"]}></Jamo>)
    }

    content.push(<br></br>)
    content.push(<br></br>)
    content.push(<br></br>)

    content.push(<h3 style={{margin:"0px"}}>남은 자모</h3>)
    
    for(let i=0;i<data.jamoList.length;i++){
        if(data.jamoList[i]["state"]=="green"){
            content.push(<Jamo value={data.jamoList[i]["name"]} color={data.jamoList[i]["state"]}></Jamo>)
        }
    }

    for(let i=0;i<data.jamoList.length;i++){
        if(data.jamoList[i]["state"]=="orange"){
            content.push(<Jamo value={data.jamoList[i]["name"]} color={data.jamoList[i]["state"]}></Jamo>)
        }
    }

    content.push(<br></br>)
    content.push(<br></br>)

    for(let i=0;i<data.jamoList.length;i++){
        if(data.jamoList[i]["state"]=="none"){
            content.push(<Jamo value={data.jamoList[i]["name"]} color={data.jamoList[i]["state"]}></Jamo>)
        }
    }

    return(
        <div style={{width:"400px",height:"400px",padding:"20px",marginTop:"120px","marginLeft":"50px"}}>
            {content}
        </div>
    )
}

export default JamoLayout