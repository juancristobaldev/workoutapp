import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SocialIcon } from "react-native-elements/dist/social/SocialIcon";
import { LoginButton, AccessToken, Settings, Profile, LoginManager } from 'react-native-fbsdk-next';
import { CREATE_USER, USER_SIGN_IN_RRSS } from "../../../data/mutations";

import RNRestart from 'react-native-restart'; // Import package from node modules
import { ActivityIndicator } from "react-native";
import { ButtonGeneral } from "../../../components/generals/CustomButton";


export const ContinueWithFb = ({setStatusLoading}) => {

    const [error,setError] = useState(null)
    const [user, setUser] = useState(null)

    const [userSignInRRSS, {data, loading, error:errorMutation}] = useMutation(USER_SIGN_IN_RRSS)

    useEffect(() => {
        setStatusLoading(loading)
    },[loading])

    const handleFacebookLogin = () => {
        LoginManager.logInWithPermissions().then(
            (result) => {
                if (result.isCancelled) {
                  console.log('Login cancelled')
                } else {
                    Profile.getCurrentProfile().then( async (currentProfile) => {
                        if(currentProfile) {

                            console.log(currentProfile)

                            const {name, firstName, lastName, email, userID, imageURL} = currentProfile;
                        
                            await userSignInRRSS({
                                variables:{
                                    input:{
                                        first_name:firstName,
                                        last_name:lastName,
                                        email:email ? 
                                        email : 
                                        `${name.toLowerCase()
                                            .split(/\s+/)
                                            .join('')}@userfacebook.com`,
                                        password:userID,
                                        profile_image:imageURL
                                    }
                                }
                            }).then( async ({data}) => {
                                const {token} = await data.userSignInRRSS
                                await AsyncStorage.setItem('@token', token)
                                RNRestart.Restart()
                            }).catch((err) => {
                                if(err) setError(err)
                            })
                        }
                    })
                
                }
              },
               (error) => {
                console.log('Login fail with error: ' + error)
              }
        )
      }

    Settings.setAppID('479016500866733');
    
    return (
        <ButtonGeneral text={'Continue with Facebook'} onPress={handleFacebookLogin}/>
    )
}
