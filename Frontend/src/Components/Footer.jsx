import { FaGithub, FaDiscord, FaInstagram, FaLinkedin, FaCopyright } from "react-icons/fa";

function Footer() {
    return (
        <div className="border-t border-gray-300 mt-10 text-black bg-white font-bold py-6">
            <ul className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6 text-sm sm:text-base">
                <li className="cursor-pointer hover:text-gray-500">Services</li>
                <li className="cursor-pointer hover:text-gray-500">About Us</li>
                <li className="cursor-pointer hover:text-gray-500">Contact Us</li>
                <li className="cursor-pointer hover:text-gray-500">FAQ</li>
            </ul>
            <div className="flex flex-wrap gap-6 sm:gap-10 justify-center mb-6">
                <button className="hover:cursor-pointer hover:text-gray-500"><FaDiscord size={30} /></button>
                <button className="hover:cursor-pointer hover:text-gray-500"><FaGithub size={30}/></button>
                <button className="hover:cursor-pointer hover:text-gray-500"><FaInstagram size={30}/></button>
                <button className="hover:cursor-pointer hover:text-gray-500"><FaLinkedin size={30}/></button>
            </div>
            <p className="flex items-center justify-center gap-1 text-xs sm:text-sm">
                <FaCopyright size={12}/>All Copyrights Reserved By X12 AI.
            </p>
        </div>
    )
}
export default Footer;