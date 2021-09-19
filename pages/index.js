import AppBox from "@components/Appbox"
import Layout from "@components/layout";
import { getSession } from "next-auth/client"
import React, { useState, useEffect } from 'react';
import { Placeholder } from 'rsuite';
import Image from "next/image"
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

import { BiRightArrow } from "react-icons/bi"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firebase } from '../app/firebaseApp';
import { Loader } from 'rsuite';


export default function IndexPage() {


  let [apps, setApps] = useState(null)
  let [loading, setLoading] = useState(true)
  const [user, firebaseloading, error] = useAuthState(auth);

  useEffect(() => {

    if (user) {
      setLoading(true)
      getUserInfo(user.email)
      loadapps(user.email)
    }
  }, [user])

  const loadapps = (userinfo) => {
    fetch(`http://178.79.130.34:8000/pods/${userinfo}`)
      .then(response => response.json())
      .then(json => { setLoading(false); setApps(json); })
  }


  const getUserInfo = (userinfo) => {
    fetch(`http://178.79.130.34:8000/auth/${userinfo}`)
      .then(response => response.json())
      .then(json => savejwt(json))
  }

  const savejwt = (jwt) => {
    localStorage.setItem("cloudxtoken", JSON.stringify(jwt))
  }




  return (
    <Layout>
      <div className="flex flex-col  space-y-4 w-full">

        <div className="flex justify-between">
          <div className="w-1/2">
            <p className="text-4xl font-bold mb-4">CloudX Academy,</p>

            <div style={{ backgroundColor: '#002333' }} className=" px-8 flex items-start justify-center rounded-2xl py-16">

              <Image src="/Slider-Image.png" width={250} height={250} />
              <div className=" ml-10 text-white max-w-sm">
                <p className="font-bold text-2xl">Gerer le stockage avec mon application
                </p>

                <p className="mt-8">Blog de cloudX Savoir comment rationnaliser mon disque</p>

              </div>


            </div>

          </div>
          <div className="w-1/3 mt-20">
            <p className="font-bold text-2xl">Lancer Une Application</p>

            <div className="px-4 py-5 flex items-center shadow-md rounded-xl my-4 justify-between hover:transform hover:scale-150 transition-all cursor-pointer">
              <div className=" flex items-center">
                <SiReact className="text-blue-400" size={50} />
                <p className="font-bold ml-4">Lancer une apps Python</p>
              </div>
              <BiRightArrow size={20} />
            </div>
            <div className="px-4 py-5 flex items-center shadow-md rounded-xl my-4 justify-between hover:transform hover:scale-150 transition-all cursor-pointer">
              <div className=" flex items-center">
                <SiAngular className="text-red-500" size={50} />
                <p className="font-bold ml-4">Lancer une apps Angular</p>
              </div>
              <BiRightArrow size={20} />
            </div>
            <div className="px-4 py-5 flex items-center shadow-md rounded-xl my-4 justify-between hover:transform hover:scale-150 transition-all cursor-pointer">
              <div className=" flex items-center">
                <SiMongodb className="text-blue-500" size={50} />
                <p className="font-bold ml-4">Lancer une apps Mongo</p>
              </div>
              <BiRightArrow size={20} />
            </div>

          </div>
        </div>

        <div className="mt-8">
          <p className="font-bold text-2xl my-4 ">Vos Applications en Cours ...</p>

          {!apps && <div className="max-w-2xl w-full flex justify-between flex-wrap items-center">
            <Placeholder.Graph active />
            <Placeholder.Graph active />
            <Placeholder.Graph active />
            <Placeholder.Graph active />
            <Placeholder.Graph active />
          </div>

          }

          <div className="flex flex-wrap">
            {apps && apps.map(item => (
              <AppBox key={item["domaine"]} id={item["domaine"]} appName={item["app_name"]} stackName={item["stack"]} StackPlan={item["domaine"]} StackDomaineName={item["domaine"]} data={item} />

            ))}
          </div>



        </div>

      </div>
    </Layout>

  );
}
