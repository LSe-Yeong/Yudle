import {useState, useEffect} from "react";
import { useDispatch,useSelector } from 'react-redux';
import { setRunning, setSecond } from "../../store/dataslice";
import Cookies from "js-cookie";

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
        }, 1000);
      } else {
        clearInterval(interval);
      }
  
      return () => clearInterval(interval);
    }, [isRunning]);
  
    return (
      <div>
        <h2 style={{fontSize:"25px"}}>타이머: {seconds}초</h2>
      </div>
    );
}


export default Timer;