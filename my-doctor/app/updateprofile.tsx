import React, { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, View, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import axios from '@/components/axios';
import Loader from '../components/Loader';
import { PROFILE_URL, UPDATE_PROFILE_URL } from '@/components/urls';
import Alert from '@/components/Alert';
import ProfileForm from '../components/ProfileForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UpdateProfileScreenProps {
  // define expected props here if needed
}

function UpdateProfileScreen(props: UpdateProfileScreenProps) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState({ title: '', message: '', type: '' });
  const [user, setUser] = useState(null);

  // Function to get the user profile
  const _getProfile = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      const response = await axios.get(PROFILE_URL);
      setUser(response.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Call _getProfile when the component mounts
  useEffect(() => {
    _getProfile();
  }, []);

  // Function to update the user profile
  const _updateProfile = async (values: any) => {
    setLoading(true);
    const body = {
      name: values.name,
      password: values.password,
      userType: values.userType ? 'doctor' : 'normal',
      specialization: values.specialization,
      address: values.address,
      phone: values.phone,
      workingHours: values.workingHours,
    };
    try {
      await axios.put(UPDATE_PROFILE_URL, body);
      setAlert({
        title: 'Alert',
        message: 'Your data is updated successfully',
        type: 'alert',
      });
      setVisible(true);
    } catch (error: any) {
      console.log(error);
      setAlert({
        title: 'Error',
        message: error.response.errors[0],
        type: 'alert',
      });
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Loader loading={loading} />
      <Alert
        visible={visible}
        title={alert.title}
        message={alert.message}
        onClose={() => setVisible(false)}
        onClick={() => setVisible(false)}
        type={''}
      />
      {user && (
        <>
          <View style={styles.container}>
            <Icon raised name="user" type="font-awesome" color="#f50" size={50} />
            <Text h4>Edit user details</Text>
          </View>
          <KeyboardAvoidingView behavior="padding" enabled>
            <View style={styles.container}>
              <ProfileForm
                user={user}
                submit={(values: any) => _updateProfile(values)}
                disabled={true}
                buttonTitle={'Update'}
                checkBox={false}
              />
            </View>
          </KeyboardAvoidingView>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    direction: 'rtl',
    alignItems: 'center',
    marginTop: 50,
  },
  checkBoxContainer: {
    flexDirection: 'row-reverse',
  },
  checkbox: {
    backgroundColor: 'transparent',
    direction: 'rtl',
  },
  icon: {
    fontSize: 25,
  },
  textInput: {
    height: 40,
    width: '100%',
    direction: 'rtl',
    textAlign: 'right',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
  },
  textError: {
    textAlign: 'right',
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
  mapContainer: {
    height: 200,
    marginTop: 20,
    width: '90%',
  },
  map: {
    flex: 1,
  },
});

export default UpdateProfileScreen;
