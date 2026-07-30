import { Play, MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
function Midd() {
    const navigate = useNavigate();
    return (
        <div className="text-black bg-white">
            <div className="flex flex-col items-center pt-10 md:pt-16 lg:pt-20 px-4 text-center">
                <p className="font-bold rounded-md text-xs sm:text-sm flex px-4 sm:px-5 mt-6 md:mt-10">
                    🎉New : Use Promo:<b className="bg-gray-400 font-bold rounded p-2 "> PIYUSH01 </b>  to get 40% Off!
                </p>
                <p className="font-bold rounded-md text-xs sm:text-sm flex px-4 sm:px-5 mt-2 md:mt-10">
                    Use Promo:<b className="bg-gray-400 font-bold rounded p-1 "> PIYUSH01</b>  to get 40% Off!
                </p>
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mt-4 md:mt-6">
                    Build consistent Design
                </h1>
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mt-2 md:mt-3">
                    systems at <b className="text-gray-600">Scale</b>
                </h1>
                <p className="mt-4 md:mt-5 text-base sm:text-lg md:text-xl max-w-md md:max-w-xl">
                    Create, maintain, and scale your design with our comprehensive platform.
                </p>
                <p className="mt-4 md:mt-5 text-base sm:text-lg md:text-xl max-w-md md:max-w-xl">
                    From Design tokens to component libraries, we've got you covered.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-4">
                <button onClick={() => navigate("/Signup")} className=" transition delay-1 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100  flex items-center justify-center text-white bg-black rounded-md px-4 py-2 font-bold gap-2 hover:bg-gray-800 hover:cursor-pointer w-full sm:w-auto">
                    Get Started<MoveRight size={16}/>
                </button>
                <button className=" transition delay-1 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100  flex items-center justify-center rounded-md border  px-4 py-2 gap-2 hover:cursor-pointer font-bold  w-full sm:w-auto">
                    <Play size={16}/>Watch Demo
                </button>
            </div>
        </div>
    );
}
export default Midd;