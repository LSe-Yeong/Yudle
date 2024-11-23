import {useState, useEffect} from "react";
import { useDispatch,useSelector } from 'react-redux';
import { setRunning, setSecond } from "../../store/dataslice";
import Cookies from "js-cookie";
import "./Timer.css"

function Timer(){
    
    const [seconds, setSeconds] = useState(Number(Cookies.get("time")));
    const dispatch = useDispatch()

    const data=useSelector((state)=>{
      return state.data;
    });

    const isRunning=data.isRunning

    useEffect(() => {
      let interval;
      var count=seconds
      if(Cookies.get("isover")==="run" && seconds>=0){
        dispatch(setRunning(true))
      }
      else{
        dispatch(setRunning(false))
      }

      if (isRunning) {
        interval = setInterval(() => {
          count++
          Cookies.set("time",count,{expires:1})
          setSeconds(preSecond=>preSecond+1);
        }, 10);
      } else {
        clearInterval(interval);
      }
  
      return () => clearInterval(interval);
    }, [isRunning]);
  
    return (
      <div>
        <h2 className="timer">타이머 : {seconds/100}초</h2>
      </div>
    );
}


export default Timer;