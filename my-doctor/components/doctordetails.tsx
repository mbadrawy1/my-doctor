import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {transformName} from '@/components/helpers';

import {View, StyleSheet} from 'react-native';
import {Avatar, Button, Overlay, Text} from 'react-native-elements';

interface DoctorProfile {
  specialization: string;
  address: string;
  workingHours: string;
  phone: string;
}

interface Doctor {
  name: string;
  email: string;
  profile: DoctorProfile;
}

function DoctorDetails({selectedDoctor, closeModal}: {selectedDoctor: Doctor | null, closeModal: () => void}) {

  return (
    <Overlay isVisible={selectedDoctor !== null} 
    fullScreen>
      {selectedDoctor && (
      <View style={styles.container}>
        <View style={styles.userMetaContainer}>
        <Avatar
          size={40}
          rounded
          title={transformName(selectedDoctor.name)}
          containerStyle={{backgroundColor: '#3d4db7'}}
        />
        <View style={styles.userMeta}>
          
        <Text>{selectedDoctor.name}</Text>
        <Text>{selectedDoctor.email}</Text>
        </View>
        </View>
        <View style={styles.doctorInfo}>
            <View style={styles.infoCell}>
                <Text style={styles.infoTitle}>Specialization</Text>
                <Text style={styles.infoText}>{selectedDoctor.profile.specialization}</Text>
            </View>
            <View style={styles.infoCell}>
                <Text style={styles.infoTitle}>Address</Text>
                <Text style={styles.infoText}>{selectedDoctor.profile.address}</Text>
            </View>
            <View style={styles.infoCell}>
                <Text style={styles.infoTitle}>Working Hours</Text>
                <Text style={styles.infoText}>{selectedDoctor.profile.workingHours}</Text>
            </View>
            <View style={styles.lastCell}>
                <Text style={styles.infoTitle}>Phone Number</Text>
                <Text style={styles.infoText}>{selectedDoctor.profile.phone}</Text>
            </View>
        </View>
              <Button
                title="Back"
                buttonStyle={styles.backButton}
                titleStyle={styles.buttonText}
                onPress={closeModal} />
      </View>
      )}
    </Overlay>
  );
}

export default DoctorDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 25,
        paddingHorizontal: 10
      },
      userIconContainer: {
        justifyContent: "space-between",
        padding: 10,
        borderRadius: 3,
        shadowColor: "#000",
        marginBottom: 20,
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.36,
        shadowRadius: 2,
        flexDirection: "row-reverse",
  
      },
      userMetaContainer: {
        flexDirection: "row-reverse",
        alignItems: "center",
      },
      doctorInfo: {
        paddingHorizontal: 10,
        marginTop: 20,
        borderRadius: 3,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.36,
        shadowRadius: 2,
        elevation: 2
      },
      userMeta: {
        alignItems: "flex-end",
        marginRight: 15
      },
      userAvtar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#007bff',
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center"
      },
      userAvtarText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#fff"
      },
      iconsConatiner: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: "row-reverse",
      },
      logoutButton: {
        marginTop: 20,
        width: "100%",
        paddingVertical: 15,
        backgroundColor: '#dc3545'
      },
      backButton: {
        marginTop: 20,
        width: "100%",
        paddingVertical: 15
      },
      buttonText: {
        fontSize: 17,
      },
      infoCell: {
        paddingVertical: 5,
        borderBottomWidth: 2,
        borderBottomColor: "#f1f1f1",
      },
      lastCell: {
        paddingVertical: 5,
        borderBottomWidth: 2,
        borderBottomColor: "#f1f1f1",
      },
      infoTitle: {
      },
      infoText: {
        fontSize: 17,
        textAlign: "right"
      },
      mapContainer: {
        height: 200, marginTop: 20
      },
      map : {
        flex: 1,
      }
});