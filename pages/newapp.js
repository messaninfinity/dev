import { SiNodeDotJs, SiPython, SiLaravel, SiWordpress, SiPhp, SiGo, SiNextDotJs, SiJava, SiMongodb, SiMysql, SiPostgresql, SiDocker, SiRedis, SiStaticman } from "react-icons/si"
import { BiCog } from "react-icons/bi"
import React, { useState, useEffect } from 'react';
import { RadioGroup, Listbox } from '@headlessui/react'
import { Button, useToast, } from "@chakra-ui/react"
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AutoComplete, Loader, TagPicker } from 'rsuite';
import { useStoreActions } from 'easy-peasy';
import Layout from "@components/layout";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firebase } from '../app/firebaseApp';




const newapp = () => {

    const addStackName = useStoreActions((actions) => actions.addStackName);
    const addStackBuild = useStoreActions((actions) => actions.addStackBuild);
    const addStackOutput = useStoreActions((actions) => actions.addStackOutput);
    const addStackDomaine = useStoreActions((actions) => actions.addStackDomaine);
    const addStackPlan = useStoreActions((actions) => actions.addStackPlan);
    const addStackNameDetails = useStoreActions((actions) => actions.addStackNameDetails);
    const addStackBranch = useStoreActions((actions) => actions.addStackBranch);
    const addStackRepo = useStoreActions((actions) => actions.addStackRepo);
    const addStackPort = useStoreActions((actions) => actions.addStackPort);
    const addStackEnv = useStoreActions((actions) => actions.addStackEnv);




    const router = useRouter()
    const toast = useToast()
    let [repos, setrepos] = useState(null);
    const [user, firebaseloading, error] = useAuthState(auth);


    useEffect(() => {
        if (user) {
            loadapps()
            setbrancheloading(true)
            fetch(`http://178.79.130.34:8000/repotokenexist/${user.email}`)
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    setbrancheloading(false)

                    if (json.msg !== "token") {
                        setbrancheloading(false)

                        toast({
                            title: `Ajouter un Token Git`,
                            status: "error",
                            isClosable: false,
                        })
                        router.push({
                            pathname: "/account"
                        })

                    } else {
                        fetch(`http://178.79.130.34:8000/getrepos/${user.email}`).then(response => response.json())
                            .then(json => {
                                console.log(json)
                                setbrancheloading(false)

                                filterRepos(json)
                            })
                    }
                })

        }


    }, [user])

    const loadBranches = (repo) => {

        repo = repo.replace("/", "*")

        fetch(`http://178.79.130.34:8000/getbranches/${user.email}/${repo}`).then(response => response.json())
            .then(json => {
                filterBranch(json)
            })
    }


    let [technologie, settechnologie] = useState('REACT')
    let [freq, setfreq] = useState('YEAR')
    let [plan, setplan] = useState('FLASH')
    let [source, setsource] = useState('GIT')
    let [step, setStep] = useState(1);
    let [port, setPort] = useState(80)
    let [build, setbuild] = useState("build")
    let [tool, settool] = useState("BUILD")
    let [cmd, setcmd] = useState("yarn build")
    let [apps, setApps] = useState({})
    let [envs, setenvs] = useState([])
    let [listenvs, setlistenvs] = useState([])


    let [repo, setrepo] = useState([]);
    let [branches, setbranches] = useState([]);
    let [branche, setbranche] = useState("");

    let [loading, setloading] = useState(false);
    let [brancheloading, setbrancheloading] = useState(false);
    let [progress, setprogress] = useState(1);
    let [stackName, setstackName] = useState("");
    let [StackDomaineName, setStackDomaineName] = useState("");

    const loadapps = () => {
        const data = JSON.parse(localStorage.getItem("cloudxtoken"))
        fetch(`http://178.79.130.34:8000/keys/${data["email"]}`)
            .then(response => response.json())
            .then(json => { setApps(json); console.table(apps, "apps") })
    }

    const filterRepos = (json) => {
        let data = []
        json.forEach(element => {
            data.push(element["full_name"])
        });
        setrepos(data)
        setbrancheloading(false)

    }

    const filterBranch = (json) => {
        let data = []
        let list = json.split("\n")

        list.forEach((element, index) => {
            let br = list[index].substring(list[index].lastIndexOf("heads/") + 6)
            data.push(br)
        });
        setbranches(data)
        setbrancheloading(false)

    }

    let technos = [
        {
            name: "DOCKER",
            icon: <SiDocker size={25} />
        }, {
            name: "NODE",
            icon: <SiNodeDotJs size={25} />
        },
        {
            name: "PYTHON",
            icon: <SiPython size={25} />
        }, {
            name: "PHP",
            icon: <SiPhp size={25} />
        }, {
            name: "GOLANG",
            icon: <SiGo size={25} />
        }, {
            name: "JAVA",
            icon: <SiJava size={25} />
        }, , {
            name: "LARAVEL",
            icon: <SiLaravel size={25} />
        }, {
            name: "NEXTJS",
            icon: <SiNextDotJs size={25} />
        },
        {
            name: "STATIC",
            icon: <SiStaticman size={25} />
        },
        {
            name: "WORDPRESS",
            icon: <SiWordpress size={25} />
        },
        {
            name: "MONGODB",
            icon: <SiMongodb size={25} />
        }, {
            name: "MYSQL",
            icon: <SiMysql size={25} />
        },
        {
            name: "POSTGRESQL",
            icon: <SiPostgresql size={25} />
        },
        {
            name: "REDIS",
            icon: <SiRedis size={25} />
        },
    ]


    const testName = () => {
        setbrancheloading(true)
        fetch(`http://178.79.130.34:8000/pods/byname/${stackName}`).then(response => response.json())
            .then(json => {
                console.log(json)
                if (json["msg"] === "find") {
                    setbrancheloading(false)
                    toast({
                        title: "Le nom existe déjà.",
                        description: "We've created your account for you.",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })

                } else {

                    if (technologie === "DOCKER") {
                        setStep(0);
                    } else {
                        setbrancheloading(false)

                        setStep(step + 1);
                        setprogress(progress + 1)
                    }

                }
            })
    }


    const testDomaine = () => {
        setbrancheloading(true)

        fetch(`http://178.79.130.34:8000/pods/bydomaine/${StackDomaineName}`).then(response => response.json())
            .then(json => {
                if (json["msg"] === "find") {
                    setbrancheloading(false)
                    toast({
                        title: "Le nom de domaine existe déjà.",
                        description: "We've created your account for you.",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })

                } else {
                    setbrancheloading(false)

                    if (technologie !== "MONGODB" && technologie !== "MYSQL" && technologie !== "REDIS" && technologie !== "POSTGRESQL") {
                        setStep(step + 1);
                        setprogress(progress + 1)
                    } else {
                        setStep(step + 2);
                        setprogress(progress + 2)
                    }



                }
            })
    }

    const submitData = async (e) => {
        e.preventDefault();


        addStackName(stackName)
        addStackBuild(cmd)
        addStackOutput(build)
        addStackDomaine(StackDomaineName)
        addStackPlan(plan)
        addStackBranch(branche)
        addStackRepo(repo)
        addStackPort(port)
        if (stackName === "PHP") {
            addStackPort(8181)
        }
        if (stackName === "MONGODB") {
            addStackPort(27017)
        }

        addStackNameDetails(technologie)
        let list = []
        envs.forEach((value) => {
            apps.forEach((app) => {
                if (value === app["value"]) {
                    list.push(app)
                }
            })
        })


        addStackEnv(list)

        router.push({

            pathname: "/stackwaiting",

        })

    };



    return (
        <Layout>
            <div className="" style={{ backgroundImage: "url('https://dashboard.easywp.com/images/backgrounds/wizard.jpg')", backgroundSize: "600px", backgroundPosition: "45vw 5vw", backgroundRepeat: "no-repeat" }}>
                <div style={{ maxWidth: '600px' }} className="mx-auto flex items-center justify-between">
                    <div className=" bg-gray-200 rounded-full h-2 w-24">
                        <div className={`bg-blue-800 w-${progress}/6 h-2 rounded-full`}>

                        </div>
                    </div>
                    <Link href="/" className="underline cursor-pointer">Cancel</Link>
                </div>

                {step === 1 && (<div style={{ maxWidth: "900px" }} className="mx-auto mt-10">
                    {brancheloading && <Loader backdrop content="Chargement..." size="md" vertical />
                    }
                    <h1 className='font-bold text-4xl'>
                        Donnez un Nom à votre application
                    </h1>
                    <p className="max-w-md text-xl mt-8 text-gray-400">Donnez-nous un nom pour votre site Web et ce que vous souhaiteriez
                        aime faire avec. Vous pouvez toujours créer un site Web personnel si vous souhaitez vendre des produits en ligne.</p>

                    <p className="font-bold mt-4 mb-2 text-lg">Nom de l'application</p>

                    <input
                        onChange={(e) => setstackName(e.target.value)}
                        type="text"
                        value={stackName}
                        className="bg-gray-100 rounded-lg w-full max-w-md  px-2 py-2 border-transparent focus:outline-none focus:ring-2 focus:ring-forceblack focus:border-transparent" placeholder="CloudX NODE APP" />
                    <p className="font-bold mt-4 mb-2 text-lg">Choix des Technologies</p>

                    <div className="flex items-center flex-wrap max-w-xl ">
                        <RadioGroup className="flex flex-wrap items-center max-w-xl " value={technologie} onChange={settechnologie}>
                            {technos.map(item => (
                                <RadioGroup.Option key={item.name} className="mx-2 cursor-pointer" value={item.name}>
                                    {({ checked }) => (

                                        <div className={`flex items-center shadow-md hover:shadow-lg px-4 py-4 rounded  transition duration-150 ease-in-out cursor-pointer ${checked && "text-white bg-forceblack"}  `}>
                                            {item.icon}
                                            <p className="font-bold flex items-center ml-2">{item.name}</p>

                                        </div>

                                    )}
                                </RadioGroup.Option>
                            ))}



                        </RadioGroup>

                    </div>

                    <div onClick={() => testName()} className="bg-forceblack px-4 py-4 rounded-lg mt-10 w-36 font-bold text-white text-center cursor-pointer">
                        Continuer
                    </div>

                </div>
                )}
                {step === 2 && (<div style={{ maxWidth: "900px" }} className="mx-auto mt-10">
                    <h1 className='font-bold text-4xl'>
                        Choisir Votre Forfait
                    </h1>
                    <p className="max-w-md text-xl mt-8 text-gray-400">Select a freq that best suits your needs. You can always change this later.

                    </p>


                    <div className="mb-8 mt-4">

                        <RadioGroup className="flex  items-center " value={freq} onChange={setfreq}>

                            <div className="mb-8 flex items-center">


                                <RadioGroup.Option className="mx-2 cursor-pointer" value="YEAR">
                                    {({ checked }) => (

                                        <div className={`flex items-center shadow-md hover:shadow-lg px-4 py-4 rounded  transition duration-150 ease-in-out cursor-pointer ${checked && "text-white bg-forceblack"}  `}>

                                            <p className="font-bold flex items-center ml-2">Yearly</p>

                                        </div>

                                    )}
                                </RadioGroup.Option>

                            </div>

                        </RadioGroup>

                        <RadioGroup className="flex items-center" value={plan} onChange={setplan}>

                            <RadioGroup.Option className="mx-2 cursor-pointer" value="STARTER">
                                {({ checked }) => (

                                    <div className={`h-auto  bg-gray-100 py-8 px-4 rounded-md w-64 ${checked && "border-2 border-forceblack"}`}>
                                        <div className="flex justify-between items-center w-full">
                                            <div className="w-full">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-bold flex items-center text-3xl mb-2">Starter</p>

                                                    </div>
                                                    <div className={`w-8 h-8 rounded-full bg-gray-300 ${checked && "border-8 border-blue-500"}`}>

                                                    </div>
                                                </div>


                                                {freq === "YEAR" && <p className="text-gray-400 flex items-center text-3xl ">$54.99</p>}
                                                {freq === "MONTH" && <p className="text-gray-400 flex items-center text-3xl ">$8.88</p>}

                                                {freq === "MONTH" && <p className="text-gray-400 flex items-center">First Month FREE</p>}
                                                <p className="text-gray-400 flex items-center">Renew Automaticaly</p>

                                                <p className="mt-10 font-bold">Includes</p>
                                                <ul className="text-gray-500">
                                                    <li>3 Stacks left</li>

                                                    <li>50GB of SSD Storage</li>
                                                    <li>100,000 visitors/month</li>
                                                    <li>Free CDN</li>
                                                    <li>Free SSL</li>



                                                </ul>


                                            </div>
                                        </div>


                                    </div>

                                )}
                            </RadioGroup.Option>
                            <RadioGroup.Option className="mx-2 cursor-pointer" value="ZOOM">
                                {({ checked }) => (

                                    <div className={`h-auto  bg-gray-100 py-8 px-4 rounded-md w-64 ${checked && "border-2 border-forceblack"}`}>
                                        <div className="flex justify-between items-center w-full">
                                            <div className="w-full">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-bold flex items-center text-3xl mb-2">Zoom</p>

                                                    </div>
                                                    <div className={`w-8 h-8 rounded-full bg-gray-300 ${checked && "border-8 border-blue-500"}`}>

                                                    </div>
                                                </div>


                                                {freq === "YEAR" && <p className="text-gray-400 flex items-center text-3xl ">$90.99</p>}
                                                {freq === "MONTH" && <p className="text-gray-400 flex items-center text-3xl ">$8.88</p>}

                                                {freq === "MONTH" && <p className="text-gray-400 flex items-center">First Month FREE</p>}

                                                <p className="text-gray-400 flex items-center">Renew Automaticaly</p>

                                                <p className="mt-10 font-bold">Includes</p>
                                                <ul className="text-gray-500">
                                                    <li>5 Stacks left</li>

                                                    <li>100GB of SSD Storage</li>
                                                    <li>200,000 visitors/month</li>

                                                    <li>Free CDN</li>
                                                    <li>Free SSL</li>



                                                </ul>


                                            </div>
                                        </div>


                                    </div>

                                )}
                            </RadioGroup.Option>
                            <RadioGroup.Option className="mx-2 cursor-pointer" value="FLASH">
                                {({ checked }) => (

                                    <div className={`h-auto  bg-gray-100 py-8 px-4 rounded-md w-64 ${checked && "border-2 border-forceblack"}`}>
                                        <div className="flex justify-between items-center w-full">
                                            <div className="w-full">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-bold flex items-center text-3xl mb-2">Flash</p>

                                                    </div>
                                                    <div className={`w-8 h-8 rounded-full bg-gray-300 ${checked && "border-8 border-blue-500"}`}>

                                                    </div>
                                                </div>


                                                {freq === "YEAR" && <p className="text-gray-400 flex items-center text-3xl ">$108.99</p>}
                                                {freq === "MONTH" && <p className="text-gray-400 flex items-center text-3xl ">$8.88</p>}

                                                {freq === "MONTH" && <p className="text-gray-400 flex items-center">First Month FREE</p>}

                                                <p className="text-gray-400 flex items-center">Renew Automaticaly</p>

                                                <p className="mt-10 font-bold">Includes</p>
                                                <ul className="text-gray-500">
                                                    <li>6 Stacks left</li>

                                                    <li>250GB of SSD Storage</li>

                                                    <li>400,000 visitors/month</li>
                                                    <li>Free CDN</li>
                                                    <li>Free SSL</li>



                                                </ul>


                                            </div>
                                        </div>


                                    </div>

                                )}
                            </RadioGroup.Option>

                        </RadioGroup>
                    </div>



                    <div className="flex">
                        <div onClick={() => { setStep(step - 1); setprogress(progress - 1) }} className="bg-forceblack px-4 py-4 rounded-lg mx-4 mt-10 w-36 font-bold text-white text-center cursor-pointer">
                            Précédent
                        </div>
                        <div onClick={() => { setStep(step + 1); setprogress(progress + 1) }} className="bg-forceblack px-4 py-4 rounded-lg mx-4 mt-10 w-36 font-bold text-white text-center cursor-pointer">
                            Continuer
                        </div>
                    </div>

                </div>
                )}
                {step === 3 && (<div style={{ maxWidth: "900px", height: 900 }} className="mx-auto mt-10">
                    <h1 className='font-bold text-4xl'>
                        Add a Domaine name (Free)
                    </h1>
                    {brancheloading && <Loader backdrop content="Chargement..." size="md" vertical />
                    }
                    <p className="max-w-md text-xl mt-8 text-gray-400">You can use any domain you registered on Namecheap or elsewhere. If you don’t have a domain name, you can get started with a temporary domain, for free.
                    </p>

                    <div className="mt-8">

                        <div className="flex">
                            <input
                                onChange={(e) => setStackDomaineName(e.target.value)}
                                type="text"
                                value={StackDomaineName}

                                className="bg-gray-100 rounded-lg w-full max-w-md  px-2 py-2 border-transparent focus:outline-none focus:ring-2 focus:ring-forceblack focus:border-transparent" placeholder="my_new_app" />
                            <p className="font-bold mt-4 mb-2 text-lg ml-2">.cloudx.expert</p>
                        </div>
                    </div>


                    <div className="flex items-center">
                        <div onClick={() => setStep(step - 1)} className="bg-forceblack px-4 py-4 rounded-lg mx-4 mt-10 w-36 font-bold text-white text-center cursor-pointer">
                            Précédent
                        </div>


                        <div onClick={() => testDomaine()} className="bg-forceblack px-4 py-4 rounded-lg mx-4 mt-10 w-36 font-bold text-white text-center cursor-pointer">
                            Continuer
                        </div>
                    </div>

                </div>
                )}

                {step === 4 && (<div style={{ maxWidth: "900px" }} className="mx-auto mt-10">
                    <h1 className='font-bold text-4xl'>
                        Charger le code Source
                    </h1>

                    <p className="max-w-md text-xl mt-8 text-gray-400">You can use any domain you registered on Namecheap or elsewhere. If you don’t have a domain name, you can get started with a temporary domain, for free.
                    </p>

                    <div className="flex items-center mt-8">
                        <RadioGroup className="flex items-center" value={source} onChange={setsource}>

                            <RadioGroup.Option className="mx-2 cursor-pointer" value="GIT">
                                {({ checked }) => (

                                    <div className={`h-auto  bg-gray-100 py-8 px-4 rounded-md w-64 ${checked && "border-2 border-forceblack"}`}>
                                        <div className="flex justify-between items-center w-full">
                                            <div className="w-full">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-bold flex items-center text-3xl mb-2">GIT</p>

                                                    </div>
                                                    <div className={`w-8 h-8 rounded-full bg-gray-300 ${checked && "border-8 border-blue-500"}`}>

                                                    </div>
                                                </div>


                                            </div>
                                        </div>


                                    </div>

                                )}
                            </RadioGroup.Option>

                        </RadioGroup>

                        <div className="ml-8">
                            <div className="mb-2">
                                <p className="text-bold text-xl">Repository</p>
                                <AutoComplete placeholder="Choisir le Repo" onSelect={({ value }) => {
                                    setbrancheloading(true)
                                    loadBranches(value)
                                    setrepo(value)
                                }} data={repos} />

                            </div>
                            <div className="mt-2">
                                <p className="text-bold text-xl">Branche</p>
                                {brancheloading && <Loader backdrop content="Chargement..." size="md" vertical />
                                }
                                <AutoComplete placeholder="Choisir la branche" onSelect={({ value }) => setbranche(value)} data={branches} />

                            </div>

                        </div>



                    </div>


                    <div className="flex items-center">
                        <div onClick={() => setStep(step - 1)} className="bg-forceblack px-4 py-4 rounded-lg mx-4 mt-10 w-36 font-bold text-white text-center cursor-pointer">
                            Précédent
                        </div>
                        <div onClick={() => testDomaine()} className="bg-forceblack px-4 py-4 rounded-lg mx-4 mt-10 w-36 font-bold text-white text-center cursor-pointer">
                            Continuer
                        </div>
                    </div>

                </div>
                )}

                {step === 5 && (<div style={{ maxWidth: "900px" }} className="mx-auto mt-10">
                    <h1 className='font-bold text-4xl'>
                        Charger le code Source
                    </h1>

                    <p className="max-w-md text-xl mt-8 text-gray-400">You can use any domain you registered on Namecheap or elsewhere. If you don’t have a domain name, you can get started with a temporary domain, for free.
                    </p>

                    <div className="flex items-center mt-8">
                        <RadioGroup className="flex items-center" value={tool} onChange={settool}>

                            <RadioGroup.Option className="mx-2 cursor-pointer" value="BUILD">
                                {({ checked }) => (

                                    <div className={`h-auto  bg-gray-100 py-8 px-4 rounded-md w-72 ${checked && "border-2 border-forceblack"}`}>
                                        <div className="flex justify-between items-center w-full">
                                            <div className="w-full">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-bold flex items-center text-3xl mb-2">BUILD TOOLS</p>
                                                        <BiCog size={55} />
                                                    </div>
                                                    <div className={`w-8 h-8 rounded-full bg-gray-300 ${checked && "border-8 border-blue-500"}`}>

                                                    </div>
                                                </div>


                                            </div>
                                        </div>


                                    </div>

                                )}
                            </RadioGroup.Option>

                        </RadioGroup>

                        <div className="mr-8 ml-8">

                            {technologie !== "STATIC" && technologie !== "LARAVEL" && <div className="mt-2 ">
                                <p className="text-bold text-lg mb-2">Listenning Port</p>
                                <input
                                    onChange={(e) => setPort(e.target.value)}
                                    type="number"
                                    value={port}

                                    className="bg-gray-100 rounded-lg w-full max-w-md  px-2 py-2 border-transparent focus:outline-none focus:ring-2 focus:ring-forceblack focus:border-transparent"
                                    placeholder="8080" />

                            </div>}

                            <div className="mt-2">
                                {technologie !== "PHP" && technologie !== "MONGODB" && technologie !== "MYSQL" && technologie !== "REDIS" && technologie !== "POSTGRESQL" && <div>
                                    <p className="text-bold text-lg mb-2">Build Command</p>

                                    <input
                                        onChange={(e) => setcmd(e.target.value)}
                                        type="text"
                                        value={cmd}

                                        className="bg-gray-100 rounded-lg w-full max-w-md  px-2 py-2 border-transparent focus:outline-none focus:ring-2 focus:ring-forceblack focus:border-transparent"
                                        placeholder="yarn build" />
                                </div>}

                            </div>

                            <div className="mt-2">

                                {technologie !== "PHP" && technologie !== "MONGODB" && technologie !== "MYSQL" && technologie !== "REDIS" && technologie !== "POSTGRESQL" && <div>
                                    <p className="text-bold text-lg mb-2">Build Output Folder</p>
                                    <input
                                        onChange={(e) => setbuild(e.target.value)}
                                        type="text"
                                        value={build}

                                        className="bg-gray-100 rounded-lg w-full max-w-md  px-2 py-2 border-transparent focus:outline-none focus:ring-2 focus:ring-forceblack focus:border-transparent"
                                        placeholder="build/src" />
                                </div>}

                            </div>

                        </div>
                    </div>


                    <div className="flex items-center">
                        <div onClick={() => setStep(step - 1)} className="bg-forceblack px-4 py-4 rounded-lg mx-4 mt-10 w-36 font-bold text-white text-center cursor-pointer">
                            Précédent
                        </div>
                        <div onClick={() => setStep(step + 1)} className="bg-forceblack px-4 py-4 rounded-lg mx-4 mt-10 w-36 font-bold text-white text-center cursor-pointer">
                            Continuer
                        </div>
                    </div>

                </div>
                )}
                {step === 6 && (<div style={{ maxWidth: "900px" }} className="mx-auto mt-10">
                    <h1 className='font-bold text-4xl'>
                        Ajouter des variable d'environment
                    </h1>

                    <p className="max-w-md text-xl mt-8 text-gray-400">You can use any domain you registered on Namecheap or elsewhere. If you don’t have a domain name, you can get started with a temporary domain, for free.
                    </p>

                    <div className="flex items-center mt-8">
                        <TagPicker
                            onChange={(e) => { setenvs(e) }}
                            size="md"
                            placeholder="Medium"
                            data={apps}

                        />
                    </div>


                    <div className="flex items-center">
                        <div onClick={() => setStep(step - 1)} className="bg-forceblack px-4 py-4 rounded-lg mx-4 mt-10 w-36 font-bold text-white text-center cursor-pointer">
                            Précédent
                        </div>


                        <Button
                            onClick={submitData}
                            isLoading={loading}
                            loadingText="Loading"
                            colorScheme="teal"
                            variant="outline"
                            className="bg-forceblack px-4 py-4 rounded-lg mx-4 mt-10 w-36 font-bold text-white text-center cursor-pointer"
                            spinnerPlacement="end"
                            size="lg">

                            Lancer Ma Stack
                        </Button>
                    </div>

                </div>
                )}
                {step === 0 && (<div style={{ maxWidth: "900px" }} className="mx-auto mt-10">
                    <h1 className='font-bold text-4xl'>
                        Votre DockerFile                    </h1>

                    <p className="max-w-md text-xl mt-8 text-gray-400">You can use any domain you registered on Namecheap or elsewhere. If you don’t have a domain name, you can get started with a temporary domain, for free.
                    </p>

                    <div className="flex items-center mt-8">
                        <RadioGroup className="flex items-center" value={tool} onChange={settool}>

                            <RadioGroup.Option className="mx-2 cursor-pointer" value="BUILD">
                                {({ checked }) => (

                                    <div className={`h-auto  bg-gray-100 py-8 px-4 rounded-md w-72 ${checked && "border-2 border-forceblack"}`}>
                                        <div className="flex justify-between items-center w-full">
                                            <div className="w-full">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-bold flex items-center text-3xl mb-2">BUILD TOOLS</p>
                                                        <SiDocker size={55} />
                                                    </div>
                                                    <div className={`w-8 h-8 rounded-full bg-gray-300 ${checked && "border-8 border-blue-500"}`}>

                                                    </div>
                                                </div>


                                            </div>
                                        </div>


                                    </div>

                                )}
                            </RadioGroup.Option>

                        </RadioGroup>

                        <div className="mr-8 ml-8">


                            <div className="mt-2">
                                <div>
                                    <p className="text-bold text-lg mb-2">Build Command</p>



                                    <textarea
                                        onChange={(e) => setcmd(e.target.value)}
                                        type="text"
                                        value={cmd}

                                        className="bg-gray-100 rounded-lg w-full max-w-md  px-2 py-2 border-transparent focus:outline-none focus:ring-2 focus:ring-forceblack focus:border-transparent"
                                        placeholder="yarn build"
                                    >

                                    </textarea>
                                </div>

                            </div>


                        </div>
                    </div>


                    <div className="flex items-center">
                        <div onClick={() => setStep(step - 1)} className="bg-forceblack px-4 py-4 rounded-lg mx-4 mt-10 w-36 font-bold text-white text-center cursor-pointer">
                            Précédent
                        </div>
                        <Button
                            onClick={submitData}
                            isLoading={loading}
                            loadingText="Loading"
                            colorScheme="teal"
                            variant="outline"
                            className="bg-forceblack px-4 py-4 rounded-lg mx-4 mt-10 w-36 font-bold text-white text-center cursor-pointer"
                            spinnerPlacement="end"
                            size="lg">

                            Lancer Ma Stack
                        </Button>
                    </div>

                </div>
                )}
            </div>


        </Layout>
    );
}

export default newapp;