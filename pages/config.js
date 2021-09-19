import AppBoxKey from "@components/AppBoxKey"
import Layout from "@components/layout";
import { getSession } from "next-auth/client"
import React, { useState, useEffect } from 'react';
import { Placeholder } from 'rsuite';
import { Modal, Button, Whisper, Input, Loader } from 'rsuite';
import { useToast } from "@chakra-ui/react"



export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}
const Config = ({ session }) => {


  let [apps, setApps] = useState(null)
  let [loading, setLoading] = useState(true)
  let [name, setname] = useState("")
  let [value, setvalue] = useState("")
  let [modal, setmodal] = useState(false)
  const toast = useToast()
  useEffect(() => {
    if (session) {
      setLoading(true)
      loadapps()
    }
  }, [])
  const loadapps = () => {
    const data = JSON.parse(localStorage.getItem("cloudxtoken"))
    fetch(`http://178.79.130.34:8000/keys/${data["email"]}`)
      .then(response => response.json())
      .then(json => { setLoading(false); setApps(json);  })
  }



  const submitData = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("cloudxtoken"))
    const body = {
      email: data["email"],
      label: name,
      value: value,
      user_id: data["_id"],
    }
    fetch(`http://178.79.130.34:8000/pods/addenv`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(response => response.json())
      .then(json => {
        setLoading(false);
        setmodal(false)
        setname("")
        setvalue("")
        toast({
            title: "Variables ajoutée.",
            status: "success",
            duration: 9000,
            isClosable: true,
        })
        loadapps()
      })
  };
  return (
    <Layout>

      {loading && <Loader backdrop content="Chargement..." size="md" vertical />
      }
      <Modal show={modal} onHide={() => setmodal(false)} size={"xs"}>
        <Modal.Header>
          <Modal.Title>Ajouter la variable</Modal.Title>
        </Modal.Header>
        <Modal.Body>



          <div className="flex flex-col w-full items-center justify-between px-4">
            <input
              onChange={(e) => setname(e.target.value)}
              type="text"
              value={name}
              className="bg-gray-100 rounded-lg w-full max-w-md my-2  px-2 py-2 border-transparent focus:outline-none focus:ring-2 focus:ring-forceblack focus:border-transparent" placeholder="Nom de la variable" />

            <input
              onChange={(e) => setvalue(e.target.value)}
              type="password"
              value={value}
              className="bg-gray-100 rounded-lg w-full max-w-md my-2 px-2 py-2 border-transparent focus:outline-none focus:ring-2 focus:ring-forceblack focus:border-transparent" placeholder="Valeur" />

          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitData} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-8">
        <p className="font-bold text-2xl my-4 ">Vos variables</p>
        <Button onClick={() => setmodal(true)}  >Ajouter des varaibles d'env</Button>

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
            <AppBoxKey handler={loadapps} key={item["value"]} value={item["value"]}  env={item["label"]}  />

          ))}
        </div>



      </div>

    </Layout>
  );
}

export default Config;