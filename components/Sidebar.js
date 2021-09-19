import { AiOutlineDashboard } from "react-icons/ai"
import { BiBox, BiBookAlt, BiCog } from "react-icons/bi"
import { useRouter } from 'next/router'


import { FiServer } from "react-icons/fi"
const CustomSidebar = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center py-20 m-0 w-full border h-full ">

      <div className="flex flex-col  w-full">
        <h1 className="font-bold text-5xl py-2 px-4 ">CloudX</h1>
        <div className="flex flex-col items-center mt-16 w-full justify-center ">
          <a  href="/" className={`${router.asPath === "/" && "bg-forceblack text-white my-1"} hover:no-underline cursor-pointer flex items-center hover:text-white hover:bg-forceblack px-8 rounded-r-2xl	 w-full justify-start py-5 mr-6`}>
            <AiOutlineDashboard size={30} />
            <p className="font-bold ml-4 text-lg"> Acceuil</p>
          </a>

          <a href="/apps" className={` ${router.asPath === "/apps" && "bg-forceblack text-white my-1"} hover:no-underline cursor-pointer flex items-center hover:text-white hover:text-transparent hover:bg-forceblack px-8 rounded-r-2xl	 w-full justify-start py-5 mr-6`}>
            <BiBox size={30} />
            <p className="font-bold ml-4 text-lg"> MesApplis</p>
          </a>

          <a className={`${router.asPath === "/tech" && "bg-forceblack text-white my-1"} no-underline hover:text-gray-300 hover:no-underline flex items-center text-gray-300  px-8 rounded-r-2xl	 w-full justify-start py-5 mr-6`}>
            <FiServer size={30} />
            <p className="font-bold ml-4 text-lg"> Technologies</p>
          </a>

          <a className={`${router.asPath === "/tech" && "bg-forceblack text-white my-1"} no-underline hover:text-gray-300 hover:no-underline flex items-center text-gray-300  px-8 rounded-r-2xl	 w-full justify-start py-5 mr-6`}>
            <BiBookAlt size={30} />
            <p className="font-bold ml-4 text-lg"> Domaine</p>
          </a>

          <a href="/config" className={`${router.asPath === "/config" && "bg-forceblack text-white my-1"} hover:no-underline cursor-pointer flex items-center hover:text-white hover:text-transparent hover:bg-forceblack px-8 rounded-r-2xl	 w-full justify-start py-5 mr-6 `}>
            <BiCog size={30} />
            <p className="font-bold ml-4 text-lg"> Configuration</p>
          </a>
        </div>

      </div>

    </div>
  );
}

export default CustomSidebar;