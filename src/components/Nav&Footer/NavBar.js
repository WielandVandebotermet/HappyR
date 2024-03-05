import React from "react";
import { NavLink} from "react-router-dom";

const NavBar = () => {
    return (
      <nav class="bg-[#170699] text-white py-4">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={process.env.PUBLIC_URL+'/images/HappyR_Logo_Transparant.png'} class="h-10 rounded" alt="HappyR Logo"/>
            <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">HappyR</span>
        </a>
        <div class="hidden w-full md:block md:w-auto">
          <ul class="font-medium center flex flex-col p-4 md:p-0 mt-4 border rounded-lg bg-[#170699] text-white md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <NavLink to="/" class="text-xl block py-2 px-3 rounded hover:text-[#AB1AAB] md:border-0 md:p-2" activeClassName="underline">Home</NavLink>
            <NavLink to="/Groups" class="text-xl block py-2 px-3 rounded hover:text-[#AB1AAB] md:border-0 md:p-2" activeClassName="underline">Groups</NavLink>
            <NavLink to="/Surveys" class="text-xl block py-2 px-3 rounded hover:text-[#AB1AAB] md:border-0 md:p-2" activeClassName="underline">Surveys</NavLink>
            <NavLink to="/Profile" class="text-xl block py-2 px-3 rounded hover:text-[#AB1AAB] md:border-0 md:p-2" activeClassName="underline">Profile</NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;