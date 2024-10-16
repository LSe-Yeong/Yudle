import DescriptionImage from '../image/description.png';
import Modal from "react-modal"
import { useState } from 'react';
import "./DescriptionButton.css"
function DescriptionContent(){
    return(
        <div className='descriptionmodal'>
            <h1>유들은 다음과 같이 진행합니다.</h1> <br></br>
            <h2> 1. 자음 모음 <span style={{color:"red"}}>6개</span>를 입력하여 <span style={{color:"red"}}>단어</span>를 만들어주세요 (Ex. ㅁ ㅜ ㄹ ㅅ ㅗ ㄱ  물속 )</h2> 
            <h2> 2. 확인을 누르면 각 자음 모음의 <span style={{color:"red"}}>색깔</span>이 바뀝니다.</h2>
            <h2> 3. 자음 모음이 단어에 포함되고 자리까지 맞으면 <span style={{color:"green"}}>초록색</span></h2>
            <h2> 4. 자음 모음이 단어에 포함되고 자리는 틀리면 <span style={{color:"orange"}}>오랜지색</span></h2>
            <h2> 5. 자음 모음이 단어에 포함되지 않으면 <span style={{color:"gray"}}>회색</span></h2>
            <h2> 6. 위 규칙을 이용하여 <span style={{color:"red"}}>오늘의 단어</span>를 맞추면 성공!</h2>
        </div>
    )
}

function DescriptionButton(props){
    function closeModal(){
        setIsOpen(false)
    }
    
    function openModal(){
        setIsOpen(true)
    }

    const [isOpen,setIsOpen] = useState(false)

    return(
        <div className={props.className}>
            <img src={DescriptionImage} onClick={openModal}></img>
            <Modal isOpen={isOpen} onRequestClose={closeModal}>
                <DescriptionContent></DescriptionContent>
            </Modal>
        </div>
    )
}

export default DescriptionButton