import { CheckIcon, TreePalmIcon } from "lucide-react";

function UpgradePlan() {
  return (
   <div className="text-black min-h-screen bg-white font-bold flex flex-col items-center">
      <h1 className="text-xl lg:text-2xl mt-20">Plans that grow with you</h1>

      <div className="flex flex-col lg:flex-row items-stretch  justify-center flex-wrap lg:mt-30">
        {/* Free Plan */}
        <div className="border lg:w-[400px] md:w-1/2 p-3 flex flex-col bg-white rounded-md m-4">
          <h2><TreePalmIcon size={43} /></h2>
          <h2 className="text-2xl">Free</h2>
          <h3 className="text-md">Meet X12</h3>

          <h2 className="my-5 text-2xl">$0</h2>
          <button className="border-black border rounded-md py-2 my-3 hover:cursor-pointer ">
            Use X12 for free
          </button>

          <ul className="flex flex-col my-2 gap-2">
            <li className="flex items-center gap-2 text-sm"><CheckIcon size={13} />Chat on web</li>
            <li className="flex items-center gap-2 text-sm"><CheckIcon size={13} />Generate PDF summaries and visualize data</li>
            <li className="flex items-center gap-2 text-sm"><CheckIcon size={13} />Chat with AI using your data</li>
            <li className="flex items-center gap-2 text-sm"><CheckIcon size={13} />Ask questions based on your data</li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div className="border lg:w-[400px] md:w-1/2 p-3 flex flex-col  rounded-md m-4">
          <h2><TreePalmIcon size={43} /></h2>
          <h2 className="text-2xl">Pro</h2>
          <h3 className="text-md">Research, Summarize, Organize</h3>

          <h2 className="my-5 text-2xl">$9.99 <span className="text-sm font-normal">/month</span></h2>
          <button className="border-black  bg-[#e657ff] text-black rounded-md py-2 my-3 hover:cursor-pointer hover:bg-[#afbc88]">
            Get Pro Plan
          </button>

          <ul className="flex flex-col my-2 gap-2">
            <li className="flex items-center gap-2 text-sm"><CheckIcon size={13} />Use without limits</li>
            <li className="flex items-center gap-2 text-sm"><CheckIcon size={13} />Summarize endlessly</li>
            <li className="flex items-center gap-2 text-sm"><CheckIcon size={13} />Ask anything without limits</li>
            <li className="flex items-center gap-2 text-sm"><CheckIcon size={13} />Unlimited credits</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UpgradePlan;