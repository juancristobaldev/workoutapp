import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    GoogleSignin,
    statusCodes,
  } from '@react-native-google-signin/google-signin';

import { Button,Icon } from "react-native-elements";
import { SocialIcon } from 'react-native-elements/dist/social/SocialIcon';
import { USER_SIGN_IN_RRSS } from '../../../data/mutations';

import RNRestart from 'react-native-restart';
import { useEffect } from 'react';


export const ContinueWithGoogle = ({setStatusLoading}) => {

    const [userSignInRRSS, {loading}] = useMutation(USER_SIGN_IN_RRSS)

    const signIn = async () => {

        GoogleSignin.configure({
          androidClientId: '26982251450-0qdmlplkt4lonu2p0uahanbdim3nis90.apps.googleusercontent.com',
          iosClientId: '26982251450-d4obt8b8ic8nguiimlor4bp5ghss3k75.apps.googleusercontent.com',
        });
  
        try {
  
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          
          const {givenName, familyName, email, id, photo} = userInfo.user

          const input = {
            first_name:givenName,
            last_name:familyName,
            email:email,
            password:id,
            profile_image:photo
          }

          console.log(input)

          await userSignInRRSS({
            variables:{
              input:input
            }
          })
          .then( async ({data}) => {
            const { token } = await data.userSignInRRSS;
            await AsyncStorage.setItem('@token', token);
            RNRestart.Restart();
          })
          .catch( (err) => {
            console.log(err)
          })
  
        } catch (error){
  
            if (error.code === statusCodes.SIGN_IN_CANCELLED) console.log('Sign in cancelled')
            else if (error.code === statusCodes.IN_PROGRESS) console.log('Sign in progress')
            else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) console.log('Play services not available')
            else console.log('some other error')
  
        }
    }

    useEffect(() => {
      setStatusLoading(loading)
    },[loading])

    return (
        <SocialIcon
                style={{
                  borderRadius:37.5,
                  width:75,
                  height:75,
                }}
                onPress={signIn}
                button
                type='google'
                />
    )
}
