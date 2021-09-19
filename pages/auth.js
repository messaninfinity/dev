
// Firebase related
import { useAuthState } from 'react-firebase-hooks/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth, firebase } from '../app/firebaseApp';
import { uiConfig } from '../lib/firebaseAuthUI.config';
import { useRouter } from 'next/router'
import { Loader } from 'rsuite';



export default function IndexPage() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter()

  if (loading) return <Loader backdrop content="Chargement..." size="md" vertical />
  else if (error) return <div>eroor</div>

  else if (user) {
    router.push({pathname:'/'})  }

  const authConfig = uiConfig(firebase);

  return (
    <div style={{ backgroundColor: '#002333' }} className="w-full min-h-screen">
      <div className="flex flex-col items-center justify-center space-y-4 w-full py-24">
        <p className="text-5xl mt-24 font-bold text-white">Connexion à CloudX</p>
        <div className="py-4 px-8  rounded-sm mt-8">

          <div style={{ backgroundColor: '#F4F4F4', color: '#002333' }} className="px-20 py-8 rounded-lg">
            <h1 className="text-center font-bold text-3xl">Connectez-vous</h1>

            <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={auth} />


          </div>





        </div>
      </div>
    </div>

  );
}
