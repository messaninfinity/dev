import { BiCog } from "react-icons/bi";
import {
    SiNodeDotJs,
    SiPython,
    SiLaravel,
    SiWordpress,
    SiPhp,
    SiGo,
    SiReact,
    SiAngular,
    SiJava,
    SiMongodb,
    SiMysql,
    SiPostgresql,
    SiDocker,
    SiGatsby,
    SiVueDotJs,
    SiRedis,

} from "react-icons/si"
import { Loader } from 'rsuite';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firebase } from '../app/firebaseApp';
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



const AppBox = ({ stackName, StackPlan, StackDomaineName, id, appName, data }) => {


    const [user, firebaseloading, error] = useAuthState(auth);

    const router = useRouter()
    const stackinfos = useStoreState((state) => state.stackinfo);
    const [deletePod, setDeletePod] = useState(false)
    const [tag, setTag] = useState("v2")
    const [building, setbuilding] = useState(false)


    const rebuild = async (e) => {
        let tg = "v" + Math.round(Math.random() * 123456789123456)
        setTag(tg)
        e.preventDefault();
        setbuilding(true)


        if (stackinfos["app_name"] === "MONGODB") {
            createPod({ err: null })
        } else {
            createContainer(data)

        }
    }


    const stackInfo = (name) => {
        router.push({
            pathname: "/details",
            query: { name }
        })

    }


    const createContainer = (stackinfosdata) => {
        const data = JSON.parse(localStorage.getItem("cloudxtoken"))


        const body = {
            stack: stackinfosdata["stack"],
            app_name: stackinfosdata["app_name"],
            domaine: stackinfosdata["domaine"],
            build_cmd: stackinfosdata["build"],
            output: stackinfosdata["output"],
            tag: tag,
            plan: stackinfosdata["plan"],
            email: data["email"],
            branch: stackinfosdata["branch"],
            repo: stackinfosdata["repo"],
            port: parseInt(stackinfosdata["port"]),
            user_id: data["_id"]
        };




        fetch(`http://178.79.130.34:8000/docker/create`, {
            method: "POST",
            body: JSON.stringify(body),

        }).then(response => response.json())
            .then(json => createPod(json, stackinfosdata))


    }

    const createPod = (json, stackinfosdata) => {
        if (json.err === null) {


            const data = JSON.parse(localStorage.getItem("cloudxtoken"))

            const body = {
                stack: stackinfosdata["stack"],
                app_name: stackinfosdata["app_name"],
                domaine: stackinfosdata["domaine"],
                build_cmd: stackinfosdata["build"],
                output: stackinfosdata["output"],
                tag: tag,
                plan: stackinfosdata["plan"],
                email: data["email"],
                branch: stackinfosdata["branch"],
                repo: stackinfosdata["repo"],
                port: parseInt(stackinfosdata["port"]),
                user_id: data["_id"]
            };


            fetch(`http://178.79.130.34:8000/pods/create`, {
                method: "POST",
                body: JSON.stringify(body),

            }).then(response => response.json())
                .then(json => applyPod(json, stackinfosdata))

        }
    }
    const applyPod = (json, stackinfosdata) => {
        if (json.err === null) {

            const data = JSON.parse(localStorage.getItem("cloudxtoken"))

            const body = {
                stack: stackinfosdata["stack"],
                app_name: stackinfosdata["app_name"],
                domaine: stackinfosdata["domaine"],
                build_cmd: stackinfosdata["build"],
                output: stackinfosdata["output"],
                tag: tag,
                plan: stackinfosdata["plan"],
                email: data["email"],
                branch: stackinfosdata["branch"],
                repo: stackinfosdata["repo"],
                port: parseInt(stackinfosdata["port"]),
                user_id: data["_id"]
            };


            fetch(`http://178.79.130.34:8000/pods/apply`, {
                method: "POST",
                body: JSON.stringify(body),

            }).then(response => response.json())
                .then(json => deploy(json))

        }
    }

    const deploy = (json) => {
        if (json.err === null) {

            setbuilding(false)
            router.push("/")
        }


    }

    const deletepod = (e) => {
        const data = JSON.parse(localStorage.getItem("cloudxtoken"))
        setDeletePod(true)
        e.preventDefault()

        const body = {
            stack: stackinfos["stack"],
            app_name: stackinfos["app_name"],
            domaine: stackinfos["domaine"],
            build_cmd: stackinfos["build"],
            output: stackinfos["output"],
            tag: tag,
            plan: stackinfos["plan"],
            email: user.email,
            branch: stackinfos["branch"],
            repo: stackinfos["repo"],
            port: parseInt(stackinfos["port"]),
            user_id: data["_id"]
        };

        console.log("delete pods")
        fetch(`http://178.79.130.34:8000/pods/delete`, {
            method: "POST",
            body: JSON.stringify(body),

        }).then(response => response.json())
            .then(json => {
                console.log(json)
            })

    }
    return (
        <div className="shadow-md w-full px-8 m-4 py-4 max-w-sm rounded-2xl bg-white ">

            <div className="flex justify-between items-center">
                <a href={`https://${StackDomaineName}.cloudx.expert`} target="_blank" className="text-green-700 font-semibold flex items-center hover:text-green-700">{StackDomaineName}.cloudx.expert <RiShareForwardBoxFill className="ml-2" /></a>

                <Menu>
                    <MenuButton className="mx-4 p-2 rounded-full cursor-pointer text-3xl font-bold" >
                        ...

                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            <Button
                                onClick={rebuild}

                                className="py-2 text-xl cursor-pointer">
                                Re-Build
                            </Button>
                        </MenuItem>
                        <MenuItem>
                            <p className="py-2 text-xl">
                                Backup
                            </p>
                        </MenuItem>
                        <MenuItem>
                            <Button onClick={deletepod} className="py-2 text-xl cursor-pointer">
                                Delete Website
                            </Button>
                        </MenuItem>


                    </MenuList>
                </Menu>

            </div>
            <div className="flex justify-between items-center">
                <p className="text-xl font-bold">{appName}</p>
                {stackName === "NODE" && <SiNodeDotJs className="text-green-400" size={35} />}
                {stackName === "GOLANG" && <SiGo className="text-blue-500" size={25} />}
                {stackName === "PYTHON" && <SiPython className="text-gray-400" size={25} />}
                {stackName === "LARAVEL" && <SiLaravel className="text-gray-400" size={25} />}
                {stackName === "REACT" && <SiReact className="text-gray-400" size={25} />}
                {stackName === "ANGULAR" && <SiAngular className="text-gray-400" size={25} />}
                {stackName === "PHP" && <SiPhp className="text-gray-400" size={25} />}
                {stackName === "DOCKER" && <SiDocker className="text-gray-400" size={25} />}
                {stackName === "VUE" && <SiVueDotJs className="text-gray-400" size={25} />}
                {stackName === "MONGODB" && <SiMongodb className="text-gray-400" size={25} />}
                {stackName === "MYSQL" && <SiMysql className="text-gray-400" size={25} />}
                {stackName === "POSTGRESQL" && <SiPostgresql className="text-gray-400" size={25} />}
                {stackName === "GO" && <SiGo className="text-gray-400" size={25} />}
                {stackName === "REDIS" && <SiRedis className="text-gray-400" size={25} />}
                {stackName === "JAVA" && <SiJava className="text-gray-400" size={25} />}
                {stackName === "WORDPRESS" && <SiWordpress className="text-gray-400" size={25} />}
                {stackName === "GATSBY" && <SiGatsby className="text-gray-400" size={25} />}


               



            </div>
            <div className="flex items-center mt-4">
                {!building && !deletePod && <div className="w-4 h-4 rounded-full bg-green-400 border-8 border-green-400 "></div>}
                {building && <div className="w-4 h-4 rounded-full bg-yellow-400 border-8 border-yellow-400 "></div>}
                {deletePod && <div className="w-4 h-4 rounded-full bg-red-600 border-8 border-red-600 "></div>}

                {deletePod && <Loader className="text-red-600 mx-2" size="sm" />}
                {!deletePod && <p className="text-gray-400 ml-4">
                    {!building && <span className="font-bold mr-4">{StackPlan}</span>}
                    {building && <span className="font-bold mr-4">Re-Build en cours...</span>}

                    Renews Sep 17, 2021
                </p>}
            </div>
        </div>
    );
}

export default AppBox;