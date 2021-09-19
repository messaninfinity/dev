import React, { useState, useEffect } from 'react';
import { Button, useToast } from "@chakra-ui/react"
import { useRouter } from 'next/router'
import RingLoader from "react-spinners/RingLoader";
import { getSession } from "next-auth/client"
import Layout from "@components/layout";

import { useStoreState } from 'easy-peasy';



const newapp = ({ session }) => {
    const router = useRouter()
    const toast = useToast()
    const stackinfos = useStoreState((state) => state.stackinfo);

    let [loading, setLoading] = useState(true);
    let [isdab, setisdab] = useState(false);
    let [stage, setStage] = useState(0);
    let [color, setColor] = useState("#108F64");

    useEffect(() => {

        if (stackinfos["stack"] === "MONGODB" || stackinfos["stack"] === "REDIS" || stackinfos["stack"] === "MYSQL" || stackinfos["stack"] === "POSTGRESQL") {
            setisdab(true)
            createPod({ err: null })

        } else {
            createContainer()

        }


        //const source = new EventSource("http://178.79.130.34:8000/sse")
        // source.onmessage = (event) => {
        //   console.log(event)
        //  }


    }, [])
    const createContainer = () => {
        const data = JSON.parse(localStorage.getItem("cloudxtoken"))

        const body = {
            stack: stackinfos["stack"],
            app_name: stackinfos["app_name"],
            domaine: stackinfos["domaine"],
            build_cmd: stackinfos["build"],
            output: stackinfos["output"],
            tag: stackinfos["tag"],
            plan: stackinfos["plan"],
            email: data["email"],
            branch: stackinfos["branch"],
            repo: stackinfos["repo"],
            port: parseInt(stackinfos["port"]),
            user_id: data["_id"],
            listenvs: stackinfos["envs"]
        };
        fetch(`http://178.79.130.34:8000/docker/create`, {
            method: "POST",
            body: JSON.stringify(body),

        }).then(response => response.json())
            .then(json => createPod(json))
    }
    const createPod = (json) => {
        if (json.err === null) {

            setStage(stage + 1)

            const data = JSON.parse(localStorage.getItem("cloudxtoken"))

            const body = {
                stack: stackinfos["stack"],
                app_name: stackinfos["app_name"],
                domaine: stackinfos["domaine"],
                build_cmd: stackinfos["build"],
                output: stackinfos["output"],
                tag: stackinfos["tag"],
                plan: stackinfos["plan"],
                email: data["email"],
                branch: stackinfos["branch"],
                repo: stackinfos["repo"],
                port: parseInt(stackinfos["port"]),
                user_id: data["_id"],
                listenvs: stackinfos["envs"]

            };


            fetch(`http://178.79.130.34:8000/pods/create`, {
                method: "POST",
                body: JSON.stringify(body),

            }).then(response => response.json())
                .then(json => applyPod(json))

        }
        else if(json.msg="failed docker daemon"){
            toast({
                title: "Votre Applications n'à pas été deployé",
                description: "Votre projet n'a pas pu être déployé vérifiez votre code ou les configurations",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            router.push("/newapp")

        }

    }
    const applyPod = (json) => {


        if (json.err === null) {
            setStage(stage + 2)

            const data = JSON.parse(localStorage.getItem("cloudxtoken"))

            const body = {
                stack: stackinfos["stack"],
                app_name: stackinfos["app_name"],
                domaine: stackinfos["domaine"],
                build_cmd: stackinfos["build"],
                output: stackinfos["output"],
                tag: stackinfos["tag"],
                plan: stackinfos["plan"],
                email: data["email"],
                branch: stackinfos["branch"],
                repo: stackinfos["repo"],
                port: parseInt(stackinfos["port"]),
                user_id: data["_id"],
                listenvs: stackinfos["envs"]

            };


            fetch(`http://178.79.130.34:8000/pods/apply`, {
                method: "POST",
                body: JSON.stringify(body),

            }).then(response => response.json())
                .then(json => deploy(json))

        }
        else if(json.msg="failed docker daemon"){
            toast({
                title: "Votre Applications n'à pas été deployé",
                description: "Votre projet n'a pas pu être déployé vérifiez votre code ou les configurations",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            router.push("/newapp")

        }
    }

    const deploy = (json) => {

        if (json.err === null) {
            setStage(stage + 4)
            setStage(stage + 5)
            setStage(stage + 6)
            toast({
                title: "Votre Applications à été deployé",
                description: json.msg,
                status: "success",
                duration: 9000,
                isClosable: true,
            })
            router.push("/")
        }
        else if(json.msg="failed docker daemon"){
            toast({
                title: "Votre Applications n'à pas été deployé",
                description: "Votre projet n'a pas pu être déployé vérifiez votre code ou les configurations",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            router.push("/newapp")
        }
    }

    return (
        <Layout>
            <div className="min-h-screen" style={{ backgroundImage: "url('https://dashboard.easywp.com/images/backgrounds/wizard.jpg')", backgroundSize: "800px", backgroundPosition: "45vw 5vw", backgroundRepeat: "no-repeat" }}>

                <div className="mt-10 flex  flex-col">
                    <p className="text-5xl font-bold mr-10 flex leading-relaxed">Deployement de Votre Service <br /> Cloud X <br/> </p>

                    <div className="flex items-center text-left mt-16">
                        {stage === 0 && <RingLoader color={color} loading={loading} size={40} />}
                        <p className="ml-4 text-xl">Création de l'image {stackinfos["stack"]}</p>
                    </div>

                    <div className="flex items-center text-left mt-4">
                        {stage === 1 && <RingLoader color={color} loading={loading} size={40} />}
                        <p className="ml-4 text-xl">Mise en place de l'image {stackinfos["stack"]}</p>
                    </div>

                    <div className="flex items-center text-left mt-4">
                        {stage === 2 && <RingLoader color={color} loading={loading} size={40} />}
                        <p className="ml-4 text-xl">Chargement du fichier depuis GIT</p>
                    </div>

                    <div className="flex items-center text-left mt-4">
                        {stage === 3 && <RingLoader color={color} loading={loading} size={40} />}
                        <p className="ml-4 text-xl">Deployement en Cours...</p>
                    </div>

                    <div className="flex items-center text-left mt-4">
                        {stage === 4 && <RingLoader color={color} loading={loading} size={40} />}
                        <p className="ml-4 text-xl">Chargement des services</p>
                    </div>

                    <div className="flex items-center text-left mt-4">
                        {stage === 5 && <RingLoader color={color} loading={loading} size={40} />}
                        <p className="ml-4 text-xl">Mise en place du SSL</p>
                    </div>

                    <div className="flex items-center text-left mt-4">
                        {stage === 6 && <RingLoader color={color} loading={loading} size={40} />}
                        <p className="ml-4 text-xl">Finalisation</p>
                    </div>

                </div>

            </div>

        </Layout>
    );
}


export async function getServerSideProps(ctx) {
    return {
        props: {
            session: await getSession(ctx)
        }
    }
}
export default newapp;