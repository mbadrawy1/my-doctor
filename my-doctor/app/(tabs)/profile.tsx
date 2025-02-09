import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import Loader from '@/components/Loader';
import Alert from '@/components/Alert';
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from '@/components/axios';
import { Delete_PROFILE_URL, PROFILE_URL } from '@/components/urls';
import { transformName } from '@/components/helpers';
import { Button, Icon } from 'react-native-elements';
import { Link, useRouter  } from 'expo-router';


export default function ProfileScreen() {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState({ title: '', message: '', type: '' });
    const router = useRouter();

    interface User {
        name: string;
        email: string;
        profile?: {
            specialization: string;
            address: string;
            workingHours: string;
            phone: string;
        };
    }

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        _getProfile();
    }, []);

    const _getProfile = async () => {
        setLoading(true);
        try {
            // Fetch the user profile
            // const response = await axios.get(PROFILE_URL);
            // const user = response.data;
            const token = await AsyncStorage.getItem('accessToken');
            axios.defaults.headers.common.Authorization = `JWT ${token}`;
            const response = await axios.get(PROFILE_URL);
            setUser(response.data);
            setLoading(false);
        } catch (error: any) {
            console.log(error);
            setLoading(false);
            setAlert({ title: 'Profile Error', message: error.response.data.message, type: 'alert' });
            setVisible(true);
        }
    }

    const handleAction = async () => {
        try{
            if(alert.type === 'delete'){
                const token = await AsyncStorage.getItem('accessToken');
                axios.defaults.headers.common.Authorization = `JWT ${token}`;
                const response = await axios.delete(Delete_PROFILE_URL);
            }
            await AsyncStorage.clear();
            router.replace('/');
        } catch (error: any) {
            console.log(error);
            
        }
    }

    const showAlert = (title: string, message: string, type: string) => {
        setAlert({ title, message, type });
        setVisible(true);
    }
    
    const confirm = (type: string) => {
        showAlert(type === "delete" ? "Delete User" : "Logout",
            type === "delete" ? "Are you sure you want to delete your account?" : "Are you sure you want to logout?",
            type);
    }

    const handleConfirm = async () => {
        setVisible(false);
        await handleAction();
    }

    return (
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={styles.container}>
                <Loader loading={loading} title="loading profile" />
                <Alert title={alert.title} message={alert.message} type={alert.type} visible={visible} onClose={() => setVisible(false)} onClick={handleConfirm} />
                {user && (
                    <View>
                        <View style={styles.userIconContainer}>
                            <View style={styles.userMetaContainer}>
                                <View style={styles.userAvatar}>
                                    <Text style={styles.userAvatarText}>
                                        {transformName(user.name)}
                                    </Text>
                                </View>
                                <View style={styles.userMeta}>
                                    <Text>{user.name}</Text>
                                    <Text>{user.email}</Text>
                                </View>
                            </View>
                          <View style={styles.iconsContainer}>
                            <Icon name="edit" color="#f50" size={50} type='font-awesome'
                            style={{marginRight: 5}}
                            onPress={() => router.push('../updateprofile')}
                            />
                            <Icon name="trash" color="#f50" size={50} type='font-awesome'
                            onPress={() => confirm('delete')}
                            />
                            </View> 
                        </View>
                       {user.profile && 
                           <View style={{marginBottom: 50}}>
                            <View style={styles.doctorInfo}>
                                <View style={styles.infoCell}>
                                    <Text style={styles.infoTitle}>Specialization</Text>
                                    <Text style={styles.infoText}>{user.profile.specialization}</Text>
                                    </View>
                                    <View style={styles.infoCell}>
                                        <Text style={styles.infoTitle}>
                                            Location
                                        </Text>
                                        <Text style={styles.infoText}>{user.profile.address}</Text>
                                        </View>
                                        <View style={styles.infoCell}>
                                            <Text style={styles.infoTitle}>Working Hours</Text>
                                            <Text style={styles.infoText}>{user.profile.workingHours}</Text>
                                        </View>
                                        <View style={styles.lastCell}>
                                        <Text style={styles.infoTitle}>Phone</Text>
                                        <Text style={styles.infoText}>{user.profile.phone}</Text>
                                        </View>
                                </View>
                            
                            </View>
                        } 
                        <Button buttonStyle={{backgroundColor: '#f50', width: 200, marginVertical: 20}} title="Logout" onPress={() => {confirm('logout')}} />
                    </View>
                )}
            </View>
            
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    text: {
        fontSize: 20,
        marginVertical: 10,
    },
    email: {
        color: 'blue',
    },
    userIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    userMetaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 77, 172, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userAvatarText: {
        color: 'rgba(0, 77, 172, 1)',
        fontSize: 30,
    },
    userMeta: {
        marginLeft: 20,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    doctorInfo: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    infoCell: {
        marginHorizontal: 10,
    },
    infoTitle: {
        fontSize: 25,
        color: 'rgb(0, 123, 255)',
    },
    infoText: {
        fontSize: 16,
        color: 'rgb(114, 0, 245)',
    },
    lastCell: {
        marginHorizontal: 10,
    },

});