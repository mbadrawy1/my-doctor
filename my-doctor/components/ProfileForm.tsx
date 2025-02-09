import React, { JSXElementConstructor, ReactElement } from 'react';
import { Formik, FormikProps } from 'formik';
import { Input, Button, CheckBox, Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import * as yup from "yup";

interface ProfileFormProps {
    checkBox: boolean | undefined;
    buttonTitle: string | ReactElement<{}, string | JSXElementConstructor<any>> | undefined;
    disabled: boolean | undefined;
    user: any;
    submit: (values: any) => void;
}

export default function ProfileForm(props: ProfileFormProps) {

    const validationSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email().required("Email is required"),
        password: yup.string().required("Password is required").min(5, "Password must be at least 5 characters"),
        userType: yup.boolean().required(),
        specialization: yup.string().when('userType', {
            is: true,
            then: (schema) => schema.required("Specialization is required"),
        }),
        workingHours: yup.string().when('userType', {
            is: true,
            then: (schema) => schema.required("Working hours is required"),
        }),
        address: yup.string().when('userType', {
            is: true,
            then: (schema) => schema.required("Address is required"),
        }),
        phone: yup.string().when('userType', {
            is: true,
            then: (schema) => schema.required("Phone number is required"),
        }),
    });

    return (
        <Formik
            initialValues={{
                name: props.user?.name || '',
                email: props.user?.email || '',
                password: '',
                userType: props.user?.userType == 'doctor',
                specialization: props.user?.profile?.specialization || '',
                workingHours: props.user.profile?.workingHours || '',
                address: props.user?.profile?.address || '',
                phone: props.user?.profile?.phone || '',
                latitude: null,
                longitude: null
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                props.submit(values);
            }}
        >
            {(formikProps: FormikProps<{ name: string; email: string; password: string; userType: boolean; specialization: string; workingHours: string; address: string; phone: string; latitude: null; longitude: null }>) => {
                const { handleChange, handleBlur, handleSubmit, errors, values, setFieldValue, isValid } = formikProps;
                return (
                    <View style={styles.container}>
                        <Text style={styles.title}>Sign Up</Text>
                        {typeof errors.name === 'string' && <Text style={{ color: 'red' }}>{errors.name}</Text>}
                        <Input
                            style={[styles.input, errors.name && styles.errorInput]}
                            placeholder="Name"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />
                        {typeof errors.email === 'string' && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                        <Input
                            style={[styles.input, errors.email && styles.errorInput]}
                            disabled={props.disabled}
                            placeholder="Email"
                            keyboardType='email-address'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                        <Input
                            style={[styles.input, errors.password && styles.errorInput]}
                            placeholder="Password"
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                    {props.checkBox &&
                    <CheckBox
                            title=" I am a Doctor"
                            checked={values.userType}
                            onPress={() => setFieldValue('userType', !values.userType)}
                        />}
                        
                        {values.userType && (
                            <>
                                {typeof errors.specialization === 'string' && <Text style={{ color: 'red' }}>{errors.specialization}</Text>}
                                <Input
                                    style={[styles.input, errors.specialization && styles.errorInput]}
                                    placeholder="specialization"
                                    onChangeText={handleChange('specialization')}
                                    onBlur={handleBlur('specialization')}
                                    value={values.specialization} />
                                {typeof errors.workingHours === 'string' && <Text style={{ color: 'red' }}>{errors.workingHours}</Text>}
                                <Input
                                    style={[styles.input, errors.workingHours && styles.errorInput]}
                                    placeholder="working hours"
                                    onChangeText={handleChange('workingHours')}
                                    onBlur={handleBlur('workingHours')}
                                    value={values.workingHours} />
                                {typeof errors.address === 'string' && <Text style={{ color: 'red' }}>{errors.address}</Text>}
                                <Input
                                    style={[styles.input, errors.address && styles.errorInput]}
                                    placeholder="address"
                                    onChangeText={handleChange('address')}
                                    onBlur={handleBlur('address')}
                                    value={values.address} />
                                {errors.phone && <Text style={{ color: 'red' }}>{errors.phone}</Text>}
                                <Input
                                    style={[styles.input, errors.phone && styles.errorInput]}
                                    placeholder="phone number"
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone} />
                            </>
                        )}
                        <Button title={props.buttonTitle} style={{ marginTop: 20 }} onPress={() => handleSubmit()} disabled={!isValid} />
                    </View>
                );
            }}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        marginBottom: 1,
    },
    errorInput: {
        borderColor: 'red',
        borderWidth: 1,
    },
});