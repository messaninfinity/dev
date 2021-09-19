import Layout from "@components/layout";
import React, { useState, useEffect } from 'react';

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,

} from "@chakra-ui/react"
import { useRouter } from 'next/router'
import { Loader } from 'rsuite';

import { RiShareForwardBoxFill } from "react-icons/ri"

const details = () => {
    const router = useRouter()
    const [data,setData]=useState({})
    let [loading, setLoading] = useState(false);




useEffect(() => {
    //setLoading(true); 

    if (router.asPath !== router.route) {
        //loadapps()    
    }
  }, [router])


  const loadapps = () => {
    const { name } = router.query
    fetch(`http://178.79.130.34:8000/pods/byname/${name}`)
      .then(response => response.json())
      .then(json => { 
          setLoading(false); 
          setData(json);
          console.log(data,"data")
    })
  }


    return (
        <Layout>
           {loading && <Loader backdrop content="Chargement..." size="md" vertical />}
           {!loading && data && <div className="flex flex-col items-center justify-center space-y-4 w-full">
                <p>{data["app_name"]}</p>
                <div className="shadow-md w-full px-8 py-8 max-w-3xl rounded-2xl bg-white ">
                    <p className="text-green-700 font-semibold flex items-center">cloudx.expert <RiShareForwardBoxFill className="ml-2" /></p>
                    <div className="flex justify-between items-center">
                        <p className="text-4xl font-bold">stack</p>
                        <div className="flex mt-0">
                            <Menu>
                                <MenuButton className="mx-4 p-2 rounded-full cursor-pointer text-3xl font-bold" >
                                    ...
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>
                                        <p className="py-2 text-xl">
                                            Backup
                                        </p>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button className="py-2 text-xl cursor-pointer">
                                            Delete Website
                                        </Button>
                                    </MenuItem>
                                </MenuList>
                            </Menu>

                        </div>
                    </div>
                    <div className="flex container mx-auto items-center justify-around mt-4 pb-4">
                        <p className="px-4 py-2 border-b border-green-600 text-xl font-bold text-green-600">
                            Owerview
                        </p>
                        <p className="px-4 py-2 text-xl font-bold">
                            Backup
                        </p>
                        <p className="px-4 py-2 text-xl font-bold">
                            File & Database
                        </p>
                        <p className="px-4 py-2 text-xl font-bold">
                            ConFig
                        </p>
                    </div>

                    <div className="mt-8">
                        <p className="text-3xl font-bold">Overview</p>

                        <div className="w-full flex items-center">
                            <div className="mt-4 mx-2 bg-gray-100 px-4 py-4  w-1/2 rounded flex items-center justify-between">
                                <div>
                                    <p className="text-xl font-bold">Wordpress</p>
                                    <p className="mt-4">Updated</p>
                                </div>
                                <p className="text-5xl font-bold">5.8</p>
                            </div>

                            <div className="mt-4 mx-2 bg-gray-100 px-4 py-4  w-1/2 rounded  ">
                                <div className="flex items-center justify-between w-full">
                                    <p className="text-xl font-bold">Storage</p>
                                    <p className="mt-0">50GB Available</p>
                                </div>
                                <div className="font-bold mt-8 bg-gray-300">
                                    <div className="w-8 bg-green-600 rounded h-2">

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="mt-8">
                        <p className="text-3xl font-bold">Web App</p>

                        <div className="w-full flex items-center">
                            <div className="mt-4 mx-2 bg-gray-100 px-4 py-4  w-full rounded flex items-center justify-between">
                                <div className="flex items-center justify-between w-2/5">
                                    <p className="text-xl font-bold">Wordpress</p>
                                    <p className="mt-0">Updated</p>
                                </div>
                                <p className="text-5xl font-bold"></p>
                            </div>


                        </div>
                        <div className="w-full flex items-center">
                            <div className="mt-0 mx-2 bg-gray-100 px-4 py-4  w-full rounded flex items-center justify-between">
                                <div className="flex items-center justify-between w-2/5">
                                    <p className="text-xl font-bold">Title</p>
                                    <p className="mt-0">Updated</p>
                                </div>
                                <p className="text-5xl font-bold">
                                    <Menu>
                                        <MenuButton className="mx-4 p-2 rounded-full cursor-pointer text-3xl font-bold" >
                                            ...
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem>
                                                <p className="py-2 text-xl">
                                                    Backup
                                                </p>
                                            </MenuItem>
                                            <MenuItem>
                                                <Button className="py-2 text-xl cursor-pointer">
                                                    Delete Website
                                                </Button>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>

                                </p>
                            </div>


                        </div>
                        <div className="w-full flex items-center">
                            <div className="mt-0 mx-2 bg-gray-100 px-4 py-4  w-full rounded flex items-center justify-between">
                                <div className="flex items-center justify-between w-2/5">
                                    <p className="text-xl font-bold">Domaine Name</p>
                                    <p className="mt-0">Updated</p>
                                </div>
                                <p className="text-5xl font-bold">
                                    <Menu>
                                        <MenuButton className="mx-4 p-2 rounded-full cursor-pointer text-3xl font-bold" >
                                            ...
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem>
                                                <p className="py-2 text-xl">
                                                    Backup
                                                </p>
                                            </MenuItem>
                                            <MenuItem>
                                                <Button className="py-2 text-xl cursor-pointer">
                                                    Delete Website
                                                </Button>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>

                                </p>
                            </div>


                        </div>

                    </div>

                </div>


            </div>}
        </Layout>
    );
}



export default details;