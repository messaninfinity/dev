import firebase from 'firebase/app';
import 'firebase/auth'
import { firebaseConfig } from '../lib/firebaseApp.config.js'


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export {firebase}