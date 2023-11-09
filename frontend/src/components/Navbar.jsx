import { IoMdLogIn } from "react-icons/io";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import LogoPoke from "../img/LogoPoke.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { Logout, name, idUser } = useContext(UserContext);

  return (
    // bg-[#e6eaec]
    <div className="flex w-full justify-around bg-yellow-200 p-4 mb-20 fixed z-20">
      <img
        src={LogoPoke}
        alt=""
        className="h-[3rem] w-[10rem] cursor-pointer"
        onClick={() => navigate("/")}
      />

      {name ? (
        <div className="flex items-center justify-end gap-1 group relative">
          <span>{name}</span>
          <span>
            <MdOutlineArrowDropDownCircle />
          </span>
          <div className="flex flex-col invisible absolute group-hover:visible mt-24 -mr-3 w-[10rem]">
            <span class="w-16 overflow-hidden inline-block ml-[7.8rem]">
              <div class=" h-5 w-5 bg-slate-300 rotate-45 transform origin-bottom-left"></div>
            </span>
            <span className="p-2 hover:bg-slate-400 bg-slate-300 text-[0.9rem] cursor-pointer" onClick={()=> window.location.href="/my-list-pokemon"}>
              My list pokemon
            </span>
            <span
              className="p-2 hover:bg-slate-400 bg-slate-300 text-[0.9rem] cursor-pointer"
              onClick={Logout}
            >
              Logout
            </span>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center gap-1 cursor-pointer z-20"
          onClick={() => navigate("/login")}
        >
          <span>
            <IoMdLogIn />
          </span>
          <span>Login</span>
        </div>
      )}
    </div>
  );
};

export default Navbar;
