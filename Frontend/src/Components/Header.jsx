import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 inset-x-0 text-black  bg-white  border-b border-gray-300 drop-shadow-lg ">
      <div className="flex items-center justify-between px-2  py-1">
        <h2 className="text-black font-moonlight  text-xl ml-15 hover:cursor-pointer "><b>X12</b> AI</h2>

        <ul className="hidden md:flex gap-8 text-black text-sm font-bold">
          <li className="px-3 py-1 rounded-md hover:bg-gray-300 cursor-pointer transition-colors hover:text-black">Features</li>
          <li className="px-3 py-1 rounded-md hover:bg-gray-300 cursor-pointer transition-colors hover:text-black">Pricing</li>
          <li className="px-3 py-1 rounded-md hover:bg-gray-300 cursor-pointer transition-colors hover:text-black">Testimonials</li>
          <li className="px-3 py-1 rounded-md hover:bg-gray-300 cursor-pointer transition-colors hover:text-black">Docs</li>
        </ul>

        <div className="hidden md:flex gap-5 text-sm mr-10 font-bold">
          <button onClick={() => navigate("/login")} className='hover:bg-black rounded-md px-3 hover:cursor-pointer hover:text-white'>Sign In</button>
          <button onClick={() => navigate("/signup")} className=" rounded-md text-black px-3 py-1 rounded-md px-3 hover:cursor-pointer hover:text-white hover:bg-black ">Get Started</button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pb-4 border-b">
          <ul className="flex flex-col gap-2 text-black text-sm font-bold ">
            <li className="px-3 py-2 rounded-md hover:bg-gray-200 cursor-pointer">Features</li>
            <li className="px-3 py-2 rounded-md hover:bg-gray-200 cursor-pointer">Pricing</li>
            <li className="px-3 py-2 rounded-md hover:bg-gray-200 cursor-pointer">Testimonials</li>
            <li className="px-3 py-2 rounded-md hover:bg-gray-200 cursor-pointer">Docs</li>
          </ul>
          <div className="flex flex-col gap-2 mt-3">
            <button onClick={() => navigate("/login")} className="text-left px-3 py-2 font-bold hover:bg-gray-200 rounded hover:cursor-pointer">Sign In</button>
            <button onClick={() => navigate("/signup")} className="bg-black rounded-md text-white px-3 py-2 hover:bg-gray-700 hover:cursor-pointer">Get Started</button>
          </div>
        </div>
        
      )}
    </div>
  );
}

export default Header;