import Layout from "@components/layout";
import initials from "../lib/initial"
import { Button, useToast } from "@chakra-ui/react"
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firebase } from '../app/firebaseApp';


const account = () => {
    let [loading, setloading] = useState(false);
    const [user, firebaseloading, error] = useAuthState(auth);

    let [value, setValue] = useState('azeertyuippqsdfffdlksdknxjkxhiuhi')
    const toast = useToast()

    const submitData = async (e) => {
        e.preventDefault();
        setloading(true)
        fetch(`http://178.79.130.34:8000/verifyToken/${value}/${user.email}`).then(response => response.json())
            .then(json => validateToken(json))
    };

    const validateToken = (response) => {
        console.log(response)

        if (response.data === null) {
            setloading(false)
            toast({
                title: `Vérifiez votre Token il semble ne pas fonctionner`,
                status: "error",
                isClosable: false,
            })

        } else {
            setloading(false)
            toast({
                title: `Votre Token est configurer`,
                status: "success",
                isClosable: false,
            })
        }

    }

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center space-y-4 w-full">

                <div className="shadow-md w-full px-8 py-8 max-w-3xl rounded-2xl bg-white ">

                    <div className="flex container mx-auto items-center justify-center mt-4 pb-4">
                        <p className="px-4 mx-4 py-2 border-b border-green-600 text-xl font-bold text-green-600">
                            Account
                        </p>
                        <p className="px-4 mx-4 py-2 text-xl font-bold">
                            Referal
                        </p>

                    </div>

                    <div className="mt-8">

                        <div className="w-full flex items-center">
                            <div className="mt-0 mx-2 bg-gray-100 px-4 py-4  w-full rounded flex items-center justify-between">
                                <div className="flex items-center justify-between w-full">
                                    <p className="text-xl font-bold">Token</p>
                                    <input value={value} onChange={(event) => setValue(event.target.value)} type="password" className="mt-0 ml-20 text-left w-full bg-transparent" />
                                </div>
                            </div>


                        </div>

                    </div>

                </div>

                <Button
                    onClick={submitData}
                    isLoading={loading}

                    loadingText="Loading"
                    colorScheme="teal"
                    variant="outline"
                    className="bg-green-600 px-4 py-4 rounded-lg mx-4 mt-10 w-36 font-bold text-white text-center cursor-pointer"
                    spinnerPlacement="end"
                    size="lg">

Sauvegarder le Token                </Button>
            </div>



        </Layout>
    );
}



export default account;