import React from 'react';
import { ActivityIndicator , TextInput , Picker , Alert , View, StyleSheet, TouchableOpacity, Text, Image , AsyncStorage , Dimensions  , ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from "firebase";
import AwesomeAlert from 'react-native-awesome-alerts';
import moment from "moment";
import axios from "axios";

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Fish_Identification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      type: '',
      accuracy: '',
      message:'',
      showAlert: false,
      result: false,
      title:'',
      loader: false,
    };

  }
  
  static navigationOptions = ({navigation}) => ({
    title: 'Fish Identification',
    headerStyle: {
      backgroundColor: '#00baff',
      elevation: 0,
    },
    headerTintColor: '#000000',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24,
    },

    headerLeft: () => (
      <View style={{marginLeft: 10, marginTop:5}}>
        <TouchableOpacity  onPress={ () =>  navigation.navigate('MainPage') }>
          <MaterialCommunityIcons name="menu" color='#000000' size={30} />
        </TouchableOpacity>
      </View>
    ),
  });

  uploadImage = async(uri,imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("images/" + imageName);
    
    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  }
  
  guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  onInsert = e =>{
    if(this.state.localUri!=""){

      this.setState({name:"Waiting...",type:"Waiting...",accuracy:"Waiting..."})

      this.setState({loader:true})

      const currentDate = moment(new Date()).format('YYYY-MM-DD_hh:mm:ss')

      this.uploadImage(this.state.localUri,this.guidGenerator()+"_"+currentDate).then(async(imageUrl) => {
        this.setState({loader:false})
        console.log(imageUrl)
        //const url="http://"+LocalIP+":3500/Fish_identification/upload"
        const data = JSON.stringify({ img_url: imageUrl });
        await axios.post(url,data,{
            headers: {'Content-Type': 'application/json'}
        }).then( res =>{
            console.log(res.data['data'])
            console.log(res.data['data']['success']=="true")
            if(res.data['data']['success']=="true"){
              this.setState({name:res.data['data']['main'],type:res.data['data']['sub'],accuracy:res.data['data']['accuracy']})
            }
        })
      })
      .catch((error) => {
        this.setState({loader:false})
        this.setState({title:"Error!",message:error})
        this.showAlert()
      });
    }else{
        this.setState({title:"Required!",message:"Please choose image!"})
        this.showAlert()
    }
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
      message: "",
      title: "",
    });
  };

  openImagePickerAsync = async (x) => {
    
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      this.setState({title:"Permission Denied!",message:"Permission to access camera roll is required!"})
      this.showAlert()
      return;
    }

    let pickerResult

    if(x===1){
  
      pickerResult = await ImagePicker.launchImageLibraryAsync();

    }else{
      
      pickerResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      });

    }

    if (pickerResult.cancelled === true) {
      return;
    }

    await this.setState({ localUri: pickerResult.uri});
    
  }

  open_image_option = async() =>{
    Alert.alert('Select Option', 'Camera or Gallery', [
      {
        text: 'Camera',
        onPress: () => {this.openImagePickerAsync(0)}
      },
      { text: 'Gallery',
        onPress: () => {this.openImagePickerAsync(1)} },
    ]);
  }

  render() {
    const { showAlert } = this.state;
    
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.center}>
            <Image
              source={require("./../../../assets/logo.png")}
              style={{ width: 150, height: 150, marginBottom: 20, marginTop: 10 }}
            />
          </View>

        <Text  style={styles.labelText}>Upload Image:</Text>
        <View style={styles.center}>
          <TouchableOpacity onPress={this.open_image_option} style={{width: 80 + '%', 
            height: Dimensions.get('window').width*0.8 ,
            borderWidth: 1,
            marginBottom:10 , 
            marginTop: 10,
            borderColor: '#c4c4c4',
            }}>
              <View>
                <Image source={{ uri: this.state.localUri }}
                  style={{width: 100 + '%', 
                  height: 100 + '%' 
                  }}
                  />
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonContainer, styles.registerButton , {width: 50 + '%'}]} onPress={this.open_image_option}>
            <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Choose Image</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.center}>
          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.onInsert}>
            {!this.state.loader ? (
              <Text style={{color: '#000000', fontWeight: 'bold'}}>Upload</Text>
            ) : null}
            {this.state.loader ? (
                <ActivityIndicator size="large" color={"#000000"} />
            ) : null}
          </TouchableOpacity>
        </View>

        <Text  style={styles.labelText}>Fish Name:</Text>
        <View style={styles.center}>
          <TextInput 
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
            placeholder={'-'}
            style={styles.input}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        
        <Text  style={styles.labelText}>Fish Type:</Text>
        <View style={styles.center}>
          <TextInput 
            value={this.state.type}
            onChangeText={(type) => this.setState({ type })}
            placeholder={'-'}
            style={styles.input}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>

        <Text  style={styles.labelText}>Accuracy:</Text>
        <View style={styles.center}>
          <TextInput 
            value={this.state.accuracy}
            onChangeText={(accuracy) => this.setState({ accuracy })}
            placeholder={'-'}
            style={styles.input}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>

        <AwesomeAlert
            show={showAlert}
            title={this.state.title}
            message={this.state.message}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            cancelText="Close"
            cancelButtonColor="#AEDEF4"
            onCancelPressed={() => {
              this.hideAlert();
            }}
          />

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  center:{
    alignItems: 'center',
  },
  labelText:{
    fontWeight: 'bold' ,
    fontSize: 14 , 
    marginLeft: 10+'%'
  },
  firstLabelText:{
    fontWeight: 'bold' ,
    fontSize: 14 , 
    marginLeft: 10+'%',
    marginTop: 2+'%',
  },
  input: {
    borderBottomWidth: 1,
    width: 80 + '%',
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    borderBottomColor: '#c4c4c4',
    color: '#000000'
  },
  TextInputStyleClass:{
    borderBottomWidth: 1,
    width: 80 + '%',
    height:100,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    marginLeft: 4, 
    borderBottomColor: '#c4c4c4',
    color: '#000000'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width: 80 + '%',
    height: 40,
  },
  loginButton: {
    backgroundColor: "#00baff",
  },
  registerButton: {
    backgroundColor: "#000000",
  }
});