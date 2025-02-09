import React, {useState, useEffect} from 'react'
import {View, SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import {StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '@/components/axios';
import Loader from '@/components/Loader';
import {DOCTORS_URL} from '@/components/urls';
import { ListItem, Text, Avatar, SearchBar } from 'react-native-elements';
import {transformName} from '@/components/helpers';
import TouchableScale from 'react-native-touchable-scale';
import DoctorDetails from '@/components/doctordetails';

export default function DoctorsScreen() {
  const [loading, setLoading] = useState(false);
  interface Doctor {
    id: number;
    name: string;
    email: string;
    profile: {
      specialization: string;
      address: string;
      workingHours: string;
      phone: string;
    };
  }

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [value, setValue] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      _getDoctors(value);
    }, 1000);
    return () => clearTimeout(timerId);
    _getDoctors(value);
  }
  , [value]);


  const _getDoctors = async (query: string | undefined) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      const response = await axios.get(DOCTORS_URL, {params: {q: query ? query: ''}});
      setDoctors(response.data);
      setLoading(false);
    }catch(error){
      console.log(error);
      setLoading(false);
    }
  };

  const itemPressHandler = (id: number) => {
      const selected = doctors.find((doctor) => doctor.id === id) || null;
      console.log(selected);
      setSelectedDoctor(selected);
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader loading={loading} title='Getting Doctors'/>
      <ScrollView>
        <DoctorDetails selectedDoctor={selectedDoctor} closeModal={() => setSelectedDoctor(null)} />
        <KeyboardAvoidingView behavior='padding' enabled>
        <SearchBar placeholder='Search Doctors'
          containerStyle={{backgroundColor: '#FBFBFB'}}
          inputContainerStyle={{backgroundColor: '#E5E4EA'}}
      style={{direction: 'ltr'}}
      value={value}
      lightTheme
      round
      onChangeText={(text) => setValue(text)}
      />
        
       <SafeAreaView>
        {doctors.length !== 0 ?
        (doctors.map((l, i) => {
          return(
            <TouchableOpacity key={i} onPress={() => {
              console.log('Doctor pressed:', l.id);
              itemPressHandler(l.id);
            }}>
              <ListItem bottomDivider>
                <Avatar
                  size={40}
                  rounded
                  title={transformName(l.name)}
                  containerStyle={{ backgroundColor: '#3d4db7' }}
                />
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                  <ListItem.Subtitle style={styles.doctorSpec}>
                    {l.profile.specialization}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          )
}))  
:
<Text style={styles.noDoctorsText}>No Doctors Available</Text>
      }
       </SafeAreaView>
       </KeyboardAvoidingView>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
    backgroundColor: '#FBFBFB',
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 18,
  },
  doctorSpec: {
    fontSize: 16,
  },
  // doctorsListContainer: {
  //   marginTop: 80,
  // },
  itemContainer: {
    padding: 15,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorAvatarText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  doctorInfo: {
    alignItems: 'flex-end',
    marginRight: 15,
  },
  noDoctorsText: {
    textAlign: 'center',
    paddingTop: 50,
    fontSize: 18,
  },
});
