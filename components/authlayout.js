import Header from "./header";
import Footer from "./footer";
import Link from "next/link";
import { SiNodeDotJs } from "react-icons/si"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,

} from "@chakra-ui/react"

export default function AuthLayout(props) {
  return (

    <div className="shadow-sm w-full">
      <header className="container flex justify-between w-full items-center mx-auto py-2 border-b-2 ">
        <a className="font-bold text-4xl cursor-pointer" href={`/`}>CloudX</a>
      </header>
      {props.children}

    </div>

  );
}
