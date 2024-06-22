import {useState, useEffect} from "react";
import { useDispatch,useSelector } from 'react-redux';
import { setSecond } from "../../store/dataslice";

function Timer(){
    const [seconds, setSeconds] = useState(0);
    // const [isRunning, setIsRunning] = useState(false);
  

    const data=useSelector((state)=>{
      return state.data;
    });
    const isRunning=data.isRunning

    useEffect(() => {
      let interval;
  
      if (isRunning) {
        interval = setInterval(() => {
          setSeconds(preSecond=>preSecond+1);
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