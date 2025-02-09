import { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView, StyleSheet} from 'react-native';
import { Button, CheckBox, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileForm from '@/components/ProfileForm';
import axios from '@/components/axios';
import { SIGN_UP_URL } from '@/components/urls';
import * as location from 'expo-location';
import Loader from '@/components/Loader';
import Alert from '@/components/Alert';


export default function SignUpScreen() {
    const [currentLocation, setCurrentLocation] = useState<location.LocationObject | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState({ title: '', message: '', type: '' });
    useEffect(() => {
        (async () => {
            try {
                // Request location permissions
                const { status } = await location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setLocationError('Location permission required. Please enable in settings.');
                    return;
                }

                // Check if location services are enabled
                const servicesEnabled = await location.hasServicesEnabledAsync();
                if (!servicesEnabled) {
                    setLocationError('Please enable location services to continue.');
                    return;
                }

                // Get current position with optimized settings
                const loc = await location.getCurrentPositionAsync({
                    accuracy: location.Accuracy.Balanced,
                });
                
                setCurrentLocation(loc);
                setLocationError(null);
            } catch (error: any) {
                console.error('Location error:', error);
                setLocationError('Failed to get location. Check your connection and try again.');

            }
        })();
    }, []);

    const _signUp = async (values: any) => {
        setLoading(true);
        if (locationError) {
            
            return;
        }

        try {
            const body = {
                ...values,
                userType: values.userType ? 'doctor' : 'normal',
                coordinates: currentLocation
                    ? {
                        latitude: currentLocation.coords.latitude,
                        longitude: currentLocation.coords.longitude,
                    }
                    : { latitude: 0, longitude: 0 },
            };

            const response = await axios.post(SIGN_UP_URL, body);
            setAlert({ 
                title: 'Success', 
                message: 'Account created successfully. Please login to continue.',
                type: 'alert' 
              });
              setVisible(true);
            console.log(response); 
            if (response.data.success) {
               
                // Handle navigation here
            }
            setLoading(false);
        } catch (error: any) {
            console.error('Sign up error:', error);
            setLoading(false);
            setAlert({ 
                title: 'Error', 
                message: error.response?.data?.errors?.[0]?.message 
                        || error.message 
                        || 'Failed to sign up. Please try again.', 
                type: 'alert' 
              });
            setVisible(true);
        }
    };

    return (
        <ScrollView style={{ backgroundColor: 'white' }} contentContainerStyle={styles.scrollContainer}>
            <Loader loading={loading} title="Creating account..." />
            <Alert 
                visible={visible} 
                title={alert.title} 
                message={alert.message} 
                onClose={() => setVisible(false)} 
                onClick={() => {}}
                type={alert.type}
            />
            <View style={styles.container}>
                <View style={styles.icon}>
                    <Icon name="user" color="#f50" size={50} />
                </View>

                {locationError && (
                    <Text style={styles.errorText}>
                        ⚠️ {locationError}
                    </Text>
                )}

                <KeyboardAvoidingView behavior="padding" enabled>
                    <ProfileForm 
                        submit={values => _signUp(values)} 
                        user={null}
                        disabled={false}
                        buttonTitle={'Sign Up'}
                        checkBox={true} />
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    icon: {
        alignItems: 'center',
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    // Add any additional styles needed for your ProfileForm components
});