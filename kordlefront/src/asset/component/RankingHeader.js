import DescriptionButton from "./DescriptionButton";
import "./RankingHeader.css"
import RankingLayout from "./RankingLayout";

function RankingHeader(){
    return(
        <div className="rankingHeader">
            <div className="rankingHeader_1">
                <h2 className="rankingTitle"><span className="rankingPoint">오</span>늘의 <span className="rankingPoint">랭</span>킹</h2>
                <DescriptionButton></DescriptionButton>
            </div>
            <RankingLayout></RankingLayout>
        </div>
    )   
}

export default RankingHeader;