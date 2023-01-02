import React from 'react';
import { ActivityIndicator ,TextInput , View, StyleSheet, TouchableOpacity, Text, Image , AsyncStorage , Dimensions  , ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
export default class BreedingSuitability extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Breeding Suitability',
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

  constructor(props) {
    super(props);

    //const { params } = this.props.navigation.state;

    this.state = {
      type: '',
      gender: '',
      month: '',
      year: '',
      resultTxt:'',
      imageUri:"",
      message:'',
      showAlert: false,
      title:'',
    };

  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false,
      message: '',
      title: ''
    });
  };

  onInsert = async(e)  =>{
    if(this.state.year!=""){
      if(this.state.month!=""){

        if(!(this.state.year==0&&this.state.month==0)){

          if(this.state.type=="betta"){
            if((this.state.year<=1&&this.state.month<=2)||(this.state.year==0&&this.state.month>=2)){
              this.setState({resultTxt:"Suitable For Breeding"})
            }else{
              this.setState({resultTxt:"Not Suitable For Breeding"})
            }
          }else if(this.state.type=="guppy"){
            if((this.state.month>7&&this.state.gender=="male")||(this.state.month>10&&this.state.gender=="female")){
              this.setState({resultTxt:"Suitable For Breeding"})
            }else{
              this.setState({resultTxt:"Not Suitable For Breeding"})
            }
          }else if(this.state.type=="goldfish"){
            if(this.state.year>=1||this.state.month==12){
              this.setState({resultTxt:"Suitable For Breeding"})
            }else{
              this.setState({resultTxt:"Not Suitable For Breeding"})
            }
          }

        }else{
          this.setState({title:"Error!",message:"Invalid Age!"})
          this.showAlert()
        }

      }else{
        this.setState({title:"Required!",message:"Please Select Month!"})
        this.showAlert()
      }
    }else{
        this.setState({title:"Required!",message:"Please Select Year!"})
        this.showAlert()
    }
  }

  render() {
    const {showAlert} = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>

        <View style={styles.center}>
          <Image
            source={require("./../../../assets/logo.png")}
            style={{ width: 150, height: 150, marginBottom: 20, marginTop: 10 }}
          />
        </View>

        <Text  style={styles.labelText}>Type:</Text>
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

        <Text  style={styles.labelText}>Gender:</Text>
        <View style={styles.center}>
          <TextInput 
            value={this.state.gender}
            onChangeText={(gender) => this.setState({ gender })}
            placeholder={'-'}
            style={styles.input}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>

        <View style={styles.center}>
          <View
            style={{
              borderBottomWidth: 1,
              width: 80 + '%',
              height:45,
              marginBottom:20,
              flexDirection: 'row',
              alignItems:'center',
              marginLeft: 4, 
              borderBottomColor: '#c4c4c4',
              color: '#000000'
            }}>
            <Picker
              selectedValue={this.state.year}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({year: itemValue})}
            >
              <Picker.Item label="Select Year" value="" />
              <Picker.Item label="0 Year" value="0" />
              <Picker.Item label="1 Year" value="1" />
              <Picker.Item label="2 Years" value="2" />
              <Picker.Item label="3 Years" value="3" />
              <Picker.Item label="4 Years" value="4" />
              <Picker.Item label="5 Years" value="5" />
            </Picker>
          </View>
        </View>

        <View style={styles.center}>
          <View
            style={{
              borderBottomWidth: 1,
              width: 80 + '%',
              height:45,
              marginBottom:20,
              flexDirection: 'row',
              alignItems:'center',
              marginLeft: 4, 
              borderBottomColor: '#c4c4c4',
              color: '#000000'
            }}>
            <Picker
              selectedValue={this.state.month}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({month: itemValue})}
            >
              <Picker.Item label="Select Month" value="" />
              <Picker.Item label="0 Month" value="0" />
              <Picker.Item label="1 Month" value="1" />
              <Picker.Item label="2 Months" value="2" />
              <Picker.Item label="3 Months" value="3" />
              <Picker.Item label="4 Months" value="4" />
              <Picker.Item label="5 Months" value="5" />
              <Picker.Item label="6 Months" value="6" />
              <Picker.Item label="7 Months" value="7" />
              <Picker.Item label="8 Months" value="8" />
              <Picker.Item label="9 Months" value="9" />
              <Picker.Item label="10 Months" value="10" />
              <Picker.Item label="11 Months" value="11" />
              <Picker.Item label="12 Months" value="12" />
            </Picker>
          </View>
        </View>

        <View style={styles.center}>
          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.onInsert}>
            {!this.state.loader ? (
              <Text style={{color: '#000000', fontWeight: 'bold'}}>Check</Text>
            ) : null}
            {this.state.loader ? (
                <ActivityIndicator size="large" color={"#000000"} />
            ) : null}
          </TouchableOpacity>
        </View>

        <View style={styles.center}>
            <Text style={{ fontWeight: 'bold' , fontSize: 20 , marginBottom: 20}}>{ this.state.resultTxt }</Text>
        </View>

        <View style={styles.center}>
            <TouchableOpacity style={[styles.buttonContainer, styles.registerButton]} onPress={() =>  this.props.navigation.navigate("MainPage")}>
              <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Back</Text>
            </TouchableOpacity>
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
};

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