
import scaseImg from "../assets/scase.png";
import ncaseImg from "../assets/ncase.jpg"

function ShowCase() {
    return (
        <div className="lg:flex gap-3 m-3 rounded lg:gap-10 justify-center">
            <img src={scaseImg}/>
            <img src={ncaseImg} />
        </div>
    )
}export default ShowCase;
