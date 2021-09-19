import { BiCog, BiDevices, BiHappyHeartEyes, BiGlobe } from "react-icons/bi"
import { SiCodesandbox, SiPeertube } from "react-icons/si"
import { RadioGroup, Listbox } from '@headlessui/react'
import React, { useState, useEffect } from 'react';


const Home = () => {

    let [feature, setfeature] = useState('REACT')

    const features = [
        { name: "SEAMLESSLY HOST WEB  APPS AND APIS", icon: <BiCog size={60} className="ml-8" /> },
        { name: "BLAZING FAST  CONTINUOUS  DEPLOYMENT", icon: <BiDevices size={60} className="ml-8" /> },
        { name: "FULLY-MANAGED  BACKGROUND TASKS", icon: <BiCog size={60} className="ml-8" /> },
        { name: "SERVERLESS, ZERO  INFRASTRUCTURE  REQUIRED", icon: <SiCodesandbox size={60} className="ml-8" /> },
        { name: "EDGE. MULTI-CLOUD.  GLOBAL.", icon: <BiGlobe size={60} className="ml-8" /> },
        { name: "POWERFUL SERVICE MESH AND DISCOVERY.", icon: <SiPeertube size={60} className="ml-8" /> },
        { name: "OBSERVABILITY AND MONINTORINB", icon: <BiHappyHeartEyes size={60} className="ml-8" /> },
    ]


    return (
        <div className="bg-black w-screen h-full flex wrap  items-center flex-col">
            <div className=" text-white">
                <h1 className='font-bold text-7xl '>Deploy and run apps <br /> without limits</h1>
                <p className="mt-4 text-xl">We've got everything you need to go global and scale your apps.</p>
            </div>

            <div className="flex mt-8 items-center md:flex-wrap lg:flex-nowrap">
                <div className="flex flex-col flex-wrap wrap">
                    <RadioGroup className=" " value={feature} onChange={setfeature}>
                        {features.map(item => (
                            <RadioGroup.Option key={item.name} className="mx-2 cursor-pointer" value={item.name}>
                                {({ checked }) => (

                                    <div className={`hover:text-green-400 text-right ${checked ? "text-green-400" : "text-gray-400"} flex items-center my-8 mx-8 text-bold`}>
                                        <p style={{ maxWidth: 150 }}>{item.name}</p>
                                        {item.icon}
                                    </div>


                                )}
                            </RadioGroup.Option>
                        ))}



                    </RadioGroup>


                </div>

                <div style={{ width: 1, height: 600 }} className="bg-gray-300" ></div>

                <div className="w-full ml-8">

                    <div className="flex items-end justify-center">
                        <h1 className='font-bold text-4xl text-white  mr-10'>
                            Seamlessly host web <br /> apps and APIs
                        </h1>
                        <img className="w-72" src="https://www.koyeb.com/static/images/illustrations/tab-api-webapps.svg" />
                    </div>

                    <div className="w-full text-white ml-4 mt-8 ">
                     
                    <div className="flex wrap">
                            <div className="max-w-xs mt-8">
                                <h1 className="text-xl font-bold">Run any web app, API or service</h1>
                                <p className="text-gray-400 mt-4">
                                    Deploy on an ultra-resilient infrastructure with built-in high-availability and HTTP load-balancing.
                                </p>
                            </div>
                            <div className="max-w-xs mt-8 ml-12">
                                <h1 className="text-xl font-bold">Run any web app, API or service</h1>
                                <p className="text-gray-400 mt-4">
                                    Deploy on an ultra-resilient infrastructure with built-in high-availability and HTTP load-balancing.
                                </p>
                            </div>

                        </div>
                       
                        <div className="flex wrap">
                            <div className="max-w-xs mt-8">
                                <h1 className="text-xl font-bold">Run any web app, API or service</h1>
                                <p className="text-gray-400 mt-4">
                                    Deploy on an ultra-resilient infrastructure with built-in high-availability and HTTP load-balancing.
                                </p>
                            </div>
                            <div className="max-w-xs mt-8 ml-12">
                                <h1 className="text-xl font-bold">Run any web app, API or service</h1>
                                <p className="text-gray-400 mt-4">
                                    Deploy on an ultra-resilient infrastructure with built-in high-availability and HTTP load-balancing.
                                </p>
                            </div>

                        </div>
                    
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Home;