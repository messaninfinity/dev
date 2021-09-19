import AppBox from "@components/Appbox"
import Layout from "@components/layout";
import { getSession } from "next-auth/client"
import React, { useState, useEffect } from 'react';
import { Placeholder } from 'rsuite';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firebase } from '../app/firebaseApp';
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

export async function getServerSideProps(ctx) {
    return {
        props: {
            session: await getSession(ctx)
        }
    }
}
const Apps = ({ session }) => {

  const [user, firebaseloading, error] = useAuthState(auth);

    let [apps, setApps] = useState(null)
    let [loading, setLoading] = useState(true)
    useEffect(() => {
        if (user) {
          setLoading(true)
          loadapps(user.email)
        }
      }, [user])
    const loadapps = (email) => {
      
        fetch(`http://178.79.130.34:8000/pods/${email}`)
            .then(response => response.json())
            .then(json => { setLoading(false); setApps(json); console.log(json) })
    }
    return (
        <Layout>
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

        </Layout>
    );
}

export default Apps;