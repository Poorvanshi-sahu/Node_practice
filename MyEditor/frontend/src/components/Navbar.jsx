import React from "react";

const navOptions = [
        "File",
        "Edit",
        "View",
        "Run",
        "Terminal",
]

const iconsOptions = [
    "subtract-line", 
    "file-copy-line",
    "close-large-line"
]

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between py-1 px-2 border-b-[1px] border-gray-500 bg-[#191D17] text-gray-300 text-sm absolute top-0">
      <div className="left flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="no-stroke"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="red"
            d="M20.034 11.837a2.98 2.98 0 0 1-1.868 2.718l-4.385 1.401l-.06-5.23c-.011-1.256-.514-2.48-1.135-2.727c-2.024-.816-4.054-1.619-6.07-2.456a1.03 1.03 0 0 1-.509-.934c.001-.272.11-.532.303-.724q.173-.092.36-.149L18.049.084c1.051-.331 1.91.341 1.91 1.504zm-7.02 10.296c.011 1.256-.485 2.073-1.102 1.821c-2.287-.916-4.565-1.869-6.854-2.773c-.775-.509-.999-1.023-.999-2.653L3.975 7.471a4.3 4.3 0 0 1 .256-1.732a2.76 2.76 0 0 1 1.116-1.368q.095-.067.196-.121c-.195.19-.304.451-.303.723c-.019.381.175.741.504.934l1.13.467l4.945 2.013c.616.252 1.135 1.47 1.135 2.726c.027 3.673.043 7.347.06 11.02"
          />
        </svg>
        {
            navOptions.map((option, index)=>{
                return <p className="cursor-pointer" key={index}>{option}</p>
            })
        }
      </div>
      <div className="right flex items-center gap-3">
        {
            iconsOptions.map((option, index)=>{
                return <i class={`ri-${option} cursor-pointer`} key={index}></i>
            })
        }
      </div>
    </div>
  );
};

export default Navbar;
