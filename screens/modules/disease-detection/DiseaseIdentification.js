import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  Platform,
  Dimensions,
  useColorScheme,
  View,
  TouchableOpacity,
  ImageBackground,
  Button,
  AsyncStorage,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Permissions, {usePermissions} from 'expo-permissions';
import axios from 'axios';
import {DISEASE_URL} from '@env';
import * as MediaLibrary from 'expo-media-library';
import {useNavigation} from '@react-navigation/core';
console.disableYellowBox = true;
//import * as ImagePicker from 'expo-image-picker';
export const {height, width} = Dimensions.get('window');

export const configureUrl = url => {
  let authUrl = url;
  if (url && url[url.length - 1] === '/') {
    authUrl = url.substring(0, url.length - 1);
  }
  return authUrl;
};



const options = {
  mediaType: 'photo',
  quality: 1,
  width: 224,
  height: 224,
  includeBase64: true,
};

const FishDiseaseIdentification = () => {
    const [result, setResult] = useState('');
    const [label, setLabel] = useState('');
    const isDarkMode = useColorScheme() === 'dark';
    const [image, setImage] = useState('');
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      };
    const navigation = useNavigation();
      
  const getPredication = async params => {
      return new Promise((resolve, reject) => {
          const bodyFormData = new FormData();
          bodyFormData.append('file', params);
          const url = {DISEASE_URL};
          console.log(bodyFormData)
          return axios
            .post(url.DISEASE_URL, bodyFormData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              transformRequest: (bodyFormData, headers) => {
                return bodyFormData; // this is doing the trick
              },
            })
            .then(response=>{
              resolve(response);
            })
            .catch(error =>{
              console.log(error)
              setLabel('Failed to predicting.');
              reject('err', error)
            })
            
            
        });
  };
  const pickImage = async () => {
   
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        Alert.alert("For this to work app needs media library/gallery permissions...");
        return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        presentationStyle: 0, // without this iOS was crashing
    });
   
    const asset = await MediaLibrary.createAssetAsync(pickerResult.uri);
  
  

    if (pickerResult.cancelled === true) {
        return;
    }

    
      const uri = pickerResult.uri;
      console.log(pickerResult.fileName, pickerResult.type)
      const path = uri;
      getResult(path, pickerResult);
    // setSelectedImage({ localUri: pickerResult.uri });

    // } else {
    //   const uri = response.assets[0].uri;
    //   const path = uri;
    //   getResult(path, response);
    // }
    
  };
  const openCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
        Alert.alert("For this to work app needs camera roll permissions...");
        return;
    }

    let cameraResult = await ImagePicker.launchCameraAsync({
        // ...
    });
    console.log(cameraResult);

    if (cameraResult.cancelled === true) {
        return;
    }
    Alert.alert('Successfull');
    const uri = cameraResult.uri;
    const path = uri;
    getResult(path, cameraResult);
    //setSelectedImage({ localUri: cameraResult.uri });
};
  const getResult = async (path, response) => {
    setImage(path);
    setLabel('Predicting...');
    setResult('');
    const params = {
      uri: path,
      name: "diseaseimg",
      type: "image/jpeg",
    };
    const res = await getPredication(params);
    if (res?.data?.class) {
      setLabel(res.data.class);
      setResult(res.data.confidence);
    } else {
      setLabel('Failed to predict');
    }
    
  };

  const clearOutput = () => {
    setResult('');
    setImage('');
  };
    return (
      <View style={[backgroundStyle, styles.outer] }>
         <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ImageBackground
          blurRadius={7}
          source={require('../../../assets/backdisease.jpg')}
          style={{height: height, width: height}}
        />
         <Text style={styles.title}>{'Fish Disease Prediction'}</Text>
        <TouchableOpacity onPress={clearOutput} style={styles.clearStyle}>
          <Image source={require('../../../assets/clean.png')} style={styles.clearImage} />
        </TouchableOpacity>
        {(image?.length && (
          <Image 
          source={{uri: image}} 
          style={styles.imageStyle} 
          />
        )) ||
          null}
        {(result && label && (
          <View style={styles.mainOuter}>
            <Text style={[styles.space, styles.labelText]}>
              {'Disease: \n'}
              <Text style={styles.resultText}>{label}</Text>
            </Text>
            <Text style={[styles.space, styles.labelText]}>
              {'Confidence: \n'}
              <Text style={styles.resultText}>
                {parseFloat(result).toFixed(2) + '%'}
              </Text>
            </Text>
            <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('FishDiseaseTreatments', { diseasename: label})}
            style={styles.treatmentsButton}>
            <Text>View Treatments</Text>
            </TouchableOpacity>
          </View>
        )) ||
          (image && <Text style={styles.emptyText}>{label}</Text>) || (
            <Text style={styles.emptyText}>
              Use below buttons to select a picture of a infected fish .
            </Text>
          )}
          <View style={styles.btn}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={openCamera}
            style={styles.btnStyle}>
            <Image 
            source={require('../../../assets/camera.png')} 
            style={styles.imageIcon} 
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={pickImage}
            style={styles.btnStyle}>
            <Image 
            source={require('../../../assets/gallery.png')} 
            style={styles.imageIcon}
             />
             
             
          </TouchableOpacity>
        </View>
    </View>
    );
  };
const styles = StyleSheet.create({
  outer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  treatmentsButton: {
    backgroundColor: '#FFF',
    opacity: 0.8,
    marginHorizontal: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    borderRadius: 20,
    backgroundColor: '#6ec9fa',
  },
  title: {
    alignSelf: 'center',
    position: 'absolute',
    top:  10,
    fontSize: 20,
    color: '#FFF',
  },
  clearStyle: {
    position: 'absolute',
    top: 80,
    right: 30,
    tintColor: '#FFF',
    zIndex: 10,
  },
  imageStyle: {
    marginBottom: 50,
    width: width / 1.5,
    height: width / 1.8,
    borderRadius: 20,
    position: 'absolute',
    borderWidth: 0.3,
    borderColor: '#FFF',
    top: height / 4.5,
  },
  mainOuter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: height / 1.8,
    alignSelf: 'center',
  },
  clearImage: {height: 40, width: 40, tintColor: '#FFF'},
  space: {marginVertical: 10, marginHorizontal: 5},
  labelText: {color: '#FFF', fontSize: 16},
  resultText: {fontSize: 18},
  emptyText: {
    position: 'absolute',
    top: height / 1.9,
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 20,
    maxWidth: '70%'
  },
  btn: {
    position: 'absolute',
    bottom: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btnStyle: {
    backgroundColor: '#FFF',
    opacity: 0.8,
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 20,
  },
  imageIcon: {height: 40, width: 40, tintColor: '#000'},
  });

export default FishDiseaseIdentification;