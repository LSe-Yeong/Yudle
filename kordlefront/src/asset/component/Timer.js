import {useState, useEffect} from "react";
import { useDispatch,useSelector } from 'react-redux';
import { setRunning, setSecond } from "../../store/dataslice";
import Cookies from "js-cookie";

function Timer(){
    
    const [seconds, setSeconds] = useState(Number(Cookies.get("time")));
    const dispatch = useDispatch()
    // const [isRunning, setIsRunning] = useState(false);

    const data=useSelector((state)=>{
      return state.data;
    });
    const isRunning=data.isRunning

    useEffect(() => {
      let interval;
      var count=seconds
      console.log(seconds)
      if(Cookies.get("isover")==="run" && seconds>=0){
        dispatch(setRunning(true))
      }
      else{
        dispatch(setRunning(false))
      }

      if (isRunning) {
        interval = setInterval(() => {
          count++
          Cookies.set("time",count)
          setSeconds(preSecond=>preSecond+1);
          console.log(Cookies.get("time"))
        }, 1000);
      } else {
        clearInterval(interval);
      }
  
      return () => clearInterval(interval);
    }, [isRunning]);
  
    // const handleToggle = () => {
    //   setIsRunning(prevIsRunning => !prevIsRunning);
    // };
  
    // const handleReset = () => {
    //   setSeconds(0);
    //   setIsRunning(true);
    // };
  
    return (
      <div>
        <h1>타이머: {seconds}초</h1>
      </div>
    );
}


export default Timer;