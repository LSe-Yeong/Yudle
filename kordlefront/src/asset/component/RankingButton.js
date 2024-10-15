import rankingImage from '../image/ranking.png';
import { useState } from 'react';
import DescriptionImage from '../image/description.png';
import Modal from "react-modal"
import RankingLayout from './RankingLayout';

function RankingButton(props){

    const [isOpen,setIsOpen] = useState(false)

    function closeModal(){
        setIsOpen(false)
    }
    
    function openModal(){
        setIsOpen(true)
    }
    
    return(
        <div className={props.className}>
            <img src={rankingImage} alt="없음" onClick={openModal}></img>
            <Modal isOpen={isOpen} onRequestClose={closeModal}>
                <RankingLayout></RankingLayout>
            </Modal>
        </div>
    )
}

export default RankingButton