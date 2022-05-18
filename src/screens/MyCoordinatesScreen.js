/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useGetMyCoordinates} from '../hooks/useGetMyCoordinates';
import {useCreateCoordinates} from '../hooks/useCreateCoordinates';

import MapView, {Marker} from 'react-native-maps';
import {useUpdateCoordinates} from '../hooks/useUpdateCoordinates';
import {useGetSignedUrl} from '../hooks/useUploadImg';
const MyCoordinatesScreen = ({navigation}) => {
  const {coordinates, loading, refetch} = useGetMyCoordinates();
  console.log('coords ', coordinates);
  const [marker, setMarker] = useState();
  const [manualMarker, setManualMarker] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [gps, setGps] = useState({lat: null, lng: null});
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');
  const [social, setSocial] = useState({url: '', platform: ''});
  const [socials, setSocials] = useState([]);

  const {createCoordinates, loading: loadingCr} = useCreateCoordinates();
  const {updateCoordinates} = useUpdateCoordinates();
  const [img, setImg] = useState('');
  const [imgIdx, setImgIdx] = useState(1);
  const {getSignedUrl} = useGetSignedUrl();
  const [id, setId] = useState('');
  const updateId = id => {
    setId(id);
  };

  const resetSteps = () => {
    setCreateMode(false);
    setStep1(false);
    setStep2(false);
    setStep3(false);
    setStep4(false);
    setMarker(null);
    setManualMarker(false);
    setTags([]);
    setSocials([]);
  };

  return (
    <View style={styles.container}>
      {/* <Text>{coordinates && JSON.stringify(coordinates[0].gps)}</Text> */}
      <Button
        style={styles.button}
        color={'#52a160'}
        title="Create Coordinates"
        onPress={() => {
          setCreateMode(true);
          setStep1(true);
        }}
      />

      {createMode && !marker && (
        <View style={{padding: 3, flexDirection: 'column'}}>
          <Text style={{marginVertical: 4}}>
            Click on the map to get Gps Coordinates
          </Text>
          <Text
            style={{
              textDecorationLine: 'underline',
              marginVertical: 4,
              padding: 4,
            }}
            onPress={() => {
              setManualMarker(true);
            }}>
            Or insert them manually
          </Text>
        </View>
      )}
      {createMode && (marker || manualMarker) && (
        <View>
          {step1 && (
            <>
              <TextInput
                style={styles.inputField}
                placeholder="Latitude..."
                placeholderTextColor={'#000'}
                value={marker?.lat.toString()}
                onChangeText={lat => setMarker({...marker, lat: lat})}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Longitude..."
                placeholderTextColor={'#000'}
                value={marker?.lng.toString()}
                onChangeText={lng => setMarker({...marker, lng: lng})}
              />
              <View style={{flexDirection: 'row'}}>
                {tags?.map((t, idx) => (
                  <View
                    style={{
                      padding: 2,
                      backgroundColor: '#626363',
                      marginLeft: 16,
                      alignSelf: 'flex-start',
                    }}>
                    <Text
                      onPress={() => {
                        Alert.alert('Alert', 'Keep or Delete this tag', [
                          {
                            text: 'Yes',
                            onPress: () =>
                              setTags(curr => tags?.filter(e => e !== t)),
                          },
                          {
                            text: 'No',
                            style: 'cancel',
                          },
                        ]);
                      }}>
                      {t}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  value={tag}
                  style={{...styles.inputField, width: '80%'}}
                  placeholder="Tag..."
                  placeholderTextColor={'#000'}
                  onChangeText={t => setTag(t)}
                />
                <Button
                  color={'#6ecc86'}
                  title="Add"
                  onPress={() => {
                    if (tag && tags?.length < 3) {
                      setTags(curr => [...curr, tag]);
                      setTag('');
                    }
                  }}
                />
              </View>
              <View>
                <Button
                  color={'#52a160'}
                  title="Next"
                  onPress={async () => {
                    const res = await createCoordinates({
                      gps: {lat: marker.lat, lng: marker.lng},
                      tags: tags,
                    });
                    console.log('res create', res);
                    if (res.coordinates) {
                      updateId(res.coordinates.id);
                      setStep1(false);
                      setStep2(true);
                    } else if (res.errors) {
                      Alert.alert('Alert Title', res.errors[0].message, [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ]);
                    }
                  }}
                />
                <Button
                  color={'#404040'}
                  title="Cancel"
                  onPress={() => {
                    resetSteps();
                  }}
                />
              </View>
            </>
          )}
          {step2 && (
            <>
              <TextInput
                style={styles.inputField}
                placeholder="Country..."
                placeholderTextColor={'#000'}
                value={country}
                onChangeText={c => setCountry(c)}
              />
              <TextInput
                style={styles.inputField}
                placeholder="City..."
                placeholderTextColor={'#000'}
                value={city}
                onChangeText={c => setCity(c)}
              />
              <TextInput
                style={styles.inputField}
                placeholder="District..."
                placeholderTextColor={'#000'}
                value={district}
                onChangeText={d => setDistrict(d)}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Street..."
                placeholderTextColor={'#000'}
                value={street}
                onChangeText={s => setStreet(s)}
              />

              <View>
                <Button
                  color={'#52a160'}
                  title="Next"
                  onPress={async () => {
                    const res = await updateCoordinates(id, {
                      address: {city, country, street, district},
                    });

                    if (res.coordinates) {
                      setStep2(false);
                      setStep3(true);
                    } else if (res.error) {
                      Alert.alert('Error', res.error, [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => console.log('OK Pressed'),
                          style: 'cancel',
                        },
                      ]);
                    }
                  }}
                />
                <Button
                  color={'#404040'}
                  title="Cancel"
                  onPress={() => {
                    resetSteps();
                  }}
                />
              </View>
            </>
          )}
          {step3 && (
            <>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flexDirection: 'column', width: '80%'}}>
                  {socials?.map((s, idx) => (
                    <View
                      style={{
                        padding: 2,
                        backgroundColor: '#626363',
                        marginLeft: 16,
                        alignSelf: 'flex-start',
                      }}>
                      <Text
                        onPress={() => {
                          Alert.alert(
                            'Alert',
                            'Keep or Delete this social media',
                            [
                              {
                                text: 'Yes',
                                onPress: () =>
                                  setSocials(curr =>
                                    socials?.filter(e => e.url !== s.url),
                                  ),
                              },
                              {
                                text: 'No',
                                style: 'cancel',
                              },
                            ],
                          );
                        }}>
                        {s.url}
                      </Text>
                    </View>
                  ))}
                  <TextInput
                    style={styles.inputField}
                    placeholder="Social Media Platform..."
                    placeholderTextColor={'#000'}
                    value={social.platform}
                    onChangeText={p => setSocial({...social, platform: p})}
                  />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Url..."
                    placeholderTextColor={'#000'}
                    value={social.url}
                    onChangeText={u => setSocial({...social, url: u})}
                  />
                </View>
                <Button
                  color={'#6ecc86'}
                  title="Add"
                  onPress={() => {
                    if (social && socials?.length < 3) {
                      setSocials(curr => [...curr, social]);
                      setSocial({platform: '', url: ''});
                    }
                  }}
                />
              </View>

              <View>
                <Button
                  color={'#52a160'}
                  title="Next"
                  onPress={async () => {
                    const res = await updateCoordinates(id, {
                      socials: socials,
                    });
                    console.log('res update ', res);
                    if (res.coordinates) {
                      setStep3(false);
                      setStep4(true);
                    } else if (res.error) {
                      Alert.alert('Error', res.error, [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => console.log('OK Pressed'),
                          style: 'cancel',
                        },
                      ]);
                    }
                  }}
                />
                <Button
                  color={'#404040'}
                  title="Cancel"
                  onPress={() => {
                    resetSteps();
                  }}
                />
              </View>
            </>
          )}
          {step4 && (
            <>
              <Image
                style={{width: 200, height: 200}}
                source={{
                  uri: img
                    ? img
                    : 'https://projecta-profile-pictures.s3.eu-west-3.amazonaws.com/staticImages/imagePlaceholder.png',
                }}
              />
              <Button
                title="Upload Image"
                color={'#52a160'}
                onPress={async () => {
                  const res = await launchImageLibrary({
                    mediaType: 'photo',
                    quality: 1,
                    includeBase64: false,
                  });

                  const file = res.assets[0];

                  const response = await getSignedUrl({
                    input: {fileName: `${id}-${1}`, fileType: 'image/png'},
                  });
                  const {signedUrl} = response;
                  if (signedUrl) {
                    try {
                      const putRes = await fetch(signedUrl, {
                        method: 'PUT',
                        body: file,
                      });

                      const url = putRes.url.split('?')[0];
                      setImg(url);
                      const res = await updateCoordinates(id, {
                        photos: [{url: url, idx: imgIdx}],
                      });
                      if (res.coordinates) {
                        setCreateMode(false);
                        await refetch();
                        Alert.alert(
                          'Sucess',
                          'Coordinates created succesfully',
                        );
                      }
                    } catch (err) {
                      console.log('Error uploading ', err.message);
                    }
                  }
                }}
              />
              <View>
                <Button
                  color={'#404040'}
                  title="Cancel"
                  onPress={() => {
                    resetSteps();
                  }}
                />
              </View>
            </>
          )}
        </View>
      )}
      <MapView
        onPress={e => {
          if (createMode) {
            setMarker({
              lat: e.nativeEvent.coordinate.latitude,
              lng: e.nativeEvent.coordinate.longitude,
            });
          }
        }}
        style={styles.map}
        initialRegion={{
          latitude: 31.616953,
          longitude: -8.012095,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {coordinates?.map((c, idx) => (
          <Marker
            key={idx}
            coordinate={{latitude: +c.gps.lat, longitude: +c.gps.lng}}
            onPress={() => {
              Alert.alert(
                c.tags.join(', '),
                `GPS: ${c.gps.lat} |${c.gps.lat} \n Socials: ${c.socials
                  .map(s => s.url)
                  .join(', ')} \n`,
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'See infos',
                    onPress: () => navigation.push('Details', {id: c.id}),
                  },
                ],
              );
            }}
          />
        ))}
        {marker && (
          <Marker
            pinColor="green"
            coordinate={{latitude: marker.lat, longitude: marker.lng}}
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
  inputField: {
    backgroundColor: '#fff',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#000',
  },
  container: {
    backgroundColor: '#242424',
  },
  button: {
    color: 'black',
  },
});
export default MyCoordinatesScreen;
