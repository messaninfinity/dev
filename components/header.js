import { signIn, signOut, useSession } from 'next-auth/client'
import initials from "../lib/initial"
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firebase } from '../app/firebaseApp';
import { Loader } from 'rsuite';

import { BiPlus } from "react-icons/bi"
import Link from "next/link"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,

} from "@chakra-ui/react"




export default function CustomHeader() {

  const router = useRouter()

  const [user, loading, error] = useAuthState(auth);

 

  return (
    <div className=" mx-4 ">
      <header className="container flex justify-between items-center mx-auto py-2 ">
        {user && <p className="text-2xl font-bold mx-4">Bonjour {user.email},</p>
        }

        {user &&
          <div className="flex items-center justify-center">
            <Link href="/newapp">
              <p className="px-8 py-4 rounded font-bold flex items-center mx-4 shadow-md hover:shadow-lg transition duration-150 ease-in-out cursor-pointer"> <BiPlus size={30} /> Lancer une appli</p>

            </Link>
            <Menu>
              <MenuButton style={{ backgroundColor: "#DFF7EE" }} className=" text-xl mx-4 p-4  cursor-pointer" >
                {initials(user.email)}
              </MenuButton>
              <MenuList>
                <MenuItem className="w-full">
                  <div className="w-full text-center">
                    <p className="font-bold text-center">{user.email}</p>
                    <p className="font-medium text-center">1 apps</p>
                  </div>

                </MenuItem>
                <MenuItem>
                  <a className="py-2 text-xl" href={`/account`}>
                    Votre Compte
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href={`/api/auth/signout`}

                    onClick={(e) => {
                      e.preventDefault()
                      localStorage.clear()
                      auth.signOut()
                      router.push({ pathname: '/auth' })

                    }} className="py-2 text-xl">
                    Deconnexion
                  </a>
                </MenuItem>


              </MenuList>
            </Menu>
          </div>

        }

 
      </header>

    </div>

  );
}
