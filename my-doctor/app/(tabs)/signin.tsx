import React, { useState, useEffect } from "react";
import { ScrollView, KeyboardAvoidingView, StyleSheet, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button } from 'react-native-elements';
import { FC } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Input } from "react-native-elements";
import axios from "@/components/axios";
import { SIGN_IN_URL } from '@/components/urls';
import Loader from "@/components/Loader";
import Alert from '@/components/Alert';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from 'expo-router';

interface SignInScreenProps {
    // Define the expected props here
}

const SignInScreen: FC<SignInScreenProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState({ title: '', message: '', type: '' });

    const signInValidationSchema = yup.object().shape({
        email: yup.string().email('Please enter a valid email').required('Email is required'),
        password: yup.string().required('Password is required')
    });

    const _signIn = async (values: any) => {
        setLoading(true);
       const body = {
              email: values.email,
              password: values.password
       }
         try {
              // Send the request
              const response = await axios.post(SIGN_IN_URL, body);
                AsyncStorage.setItem('accessToken', response.data.accessToken);
                setLoading(false);
                // Redirect to Home Page
                router.replace("/");
             
         } catch (error: any) {
            console.log(error);
            setLoading(false);
            setAlert({ title: 'Sign In Error', message: error.response.data.message, type: 'alert' });
            setVisible(true);
         }
    }


    return (
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
            <Loader loading={loading} title="signing in" />
            <Alert title={alert.title} message={alert.message} type={alert.type} visible={visible} onClose={() => setVisible(false)} onClick={() => setVisible(false)} />
            <View style={styles.icon}>
                                    <Icon name="user" color="#f50" size={50} />
                                    <Text>Sign In</Text>
                                </View>
            <KeyboardAvoidingView behavior="padding" enabled>
                <View style={styles.container}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={signInValidationSchema}
                        onSubmit={values => _signIn(values)}
                        >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid}) => (
                        <>
                        {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                            <Input
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            style={[styles.input, errors.email && styles.errorInput]}
                            keyboardType="email-address" />
                            
                            {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                        <Input
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            style={[styles.input, errors.password && styles.errorInput]}
                            secureTextEntry />
                            
                        <Button
                            title="Sign In"
                            onPress={() => handleSubmit()}
                            disabled={!isValid}
                        />
                        </>
                        )}
                            </Formik>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    input: {
        marginBottom: 1,
    },
    errorInput: {
        borderColor: 'red',
        borderWidth: 1,
    },
});

export default SignInScreen;