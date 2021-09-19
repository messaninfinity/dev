
import { Loader } from 'rsuite';

import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useToast

} from "@chakra-ui/react"
import { useRouter } from 'next/router'

import { RiShareForwardBoxFill } from "react-icons/ri"



const AppBoxKey = ({ value, env, handler }) => {
    let [apps, setApps] = useState(null)
    let [loading, setLoading] = useState(true)
    const toast = useToast()

    let [modal, setmodal] = useState(false)

    const deleteenv = () => {
        fetch(`http://178.79.130.34:8000/pods/removeenv/${value}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then(response => response.json())
            .then(json => {
                setLoading(false);
                setmodal(false)
                handler()
                toast({
                    title: "Variables supprimée.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
            })
    }
    return (
        <div className="shadow-md w-full px-8 m-4 py-4 max-w-sm rounded-2xl bg-white ">


            <div className="flex justify-between items-center">


            </div>
            <div className="flex justify-between items-center">
                <p className="text-xl font-bold">{env}</p>
                <Menu>
                    <MenuButton className="mx-4 p-2 rounded-full cursor-pointer text-3xl font-bold" >
                        ...

                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            <Button onClick={deleteenv} className="py-2 text-xl cursor-pointer">
                                Delete Website
                            </Button>
                        </MenuItem>


                    </MenuList>
                </Menu>

            </div>
        </div>
    );
}

export default AppBoxKey;