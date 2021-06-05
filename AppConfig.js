import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { googleCredentials } from './Credentials'

export const initializeApp = () => {
    GoogleSignin.configure();
    // GoogleSignin.configure({
    //     webClientId: googleCredentials.clientId,
    // });
}