// /config/firebaseAuthUI.config.js
export const uiConfig = firebase => {
    return {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        tosUrl: '/terms-of-service',
        privacyPolicyUrl: '/privacy-policy',
        signInOptions: [
            firebase.auth.GithubAuthProvider.PROVIDER_ID
        ]
    }
}
