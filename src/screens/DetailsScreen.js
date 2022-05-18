/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Modal,
  Alert,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import {useState} from 'react';
import {useGetCoordinates} from '../hooks/useGetCoordinates';

const DetailsScreen = ({route, navigation}) => {
  const {id} = route.params;
  const {coordinates, getCoordinates, refetch} = useGetCoordinates({id: id});
  const [imgModal, setImgModal] = useState(false);
  return (
    <View
      style={{
        backgroundColor: '#626363',
        flex: 1,
        flexDirection: 'column',
      }}>
      <Text
        style={{
          color: '#fff',
          textAlign: 'center',
          fontSize: 25,
          backgroundColor: 'black',
        }}>
        {`Coordinates: ${coordinates?.tags.join(', ')}`}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 12,
          alignItems: 'center',
          backgroundColor: '#363636',
        }}>
        <Text style={{fontSize: 20, fontWeight: '500', marginHorizontal: 4}}>
          GPS:
        </Text>
        <Text>{`${coordinates?.gps.lat} | ${coordinates?.gps.lng}`}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          padding: 12,
          alignItems: 'center',
          backgroundColor: '#232423',
        }}>
        <Text style={{fontSize: 20, fontWeight: '500', marginHorizontal: 8}}>
          Address:
        </Text>
        <View style={{flexDirection: 'column'}}>
          <Text>{`Country: ${coordinates?.address.country}`}</Text>
          <Text>{`City: ${coordinates?.address.city}`}</Text>
          <Text>{`District: ${coordinates?.address.district}`}</Text>
          <Text>{`Street: ${coordinates?.address.street}`}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          padding: 12,
          alignItems: 'center',
          backgroundColor: '#363636',
        }}>
        <Text style={{fontSize: 20, fontWeight: '500', marginHorizontal: 8}}>
          Socials:
        </Text>
        <View style={{flexDirection: 'column'}}>
          {coordinates?.socials.map(s => (
            <Text>{`${s.url} - ${s.platform}`}</Text>
          ))}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 12,
          alignItems: 'center',
          backgroundColor: '#363636',
        }}>
        {coordinates?.photos?.map(p => (
          <TouchableWithoutFeedback
            onPress={() => {
              setImgModal(true);
            }}>
            <View
              onPress={() => {
                setImgModal(true);
              }}>
              <Image
                style={{width: 100, height: 100}}
                source={{
                  uri: p.url,
                }}
              />
              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={imgModal}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setImgModal(!imgModal);
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      style={{width: '90%', height: '90%'}}
                      source={{
                        uri: p.url,
                      }}
                    />
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setImgModal(!imgModal)}>
                      <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                  </View>
                </Modal>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 31.616953,
          longitude: -8.012095,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {coordinates && (
          <Marker
            pinColor="red"
            coordinate={{
              latitude: coordinates.gps.lat,
              longitude: coordinates.gps.lng,
            }}
          />
        )}
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '80%',
    height: '80%',
  },
  modalView: {},
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#52a160',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default DetailsScreen;
