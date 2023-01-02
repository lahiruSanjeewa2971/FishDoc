import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import { Text, View,  FlatList, StyleSheet , ImageBackground, SafeAreaView } from 'react-native';
import {auth, firebase} from '../../../firebase';
import { height } from './DiseaseIdentification';
console.disableYellowBox = true;
const Treatment = ({ route}) => {

    var [diseasetreatments, setDiseaseTreatments] = useState([]);
    const diseasename = route.params.diseasename;


    
    
    function getTreatment ({diseasename}){
    useEffect(() => {
        const subscriber = firebase.firestore().collection('diseasetreatments')
          .where("diseasename", "==", diseasename)
          .get()
          .then(documentSnapshot => {
            documentSnapshot.forEach(doc => {
              setDiseaseTreatments(doc.data().treatments)
           })
          });

          
    
        // Stop listening for updates when no longer required
        return () => subscriber();
      }, [diseasename]);
    }
    
   
         
    
    getTreatment({diseasename})
   return (
    
    <View style={styles.outer}>
    <ImageBackground
          blurRadius={7}
          source={require('../../../assets/tank.png')}
          style={{height: 50, width: 400}}
        />
      <Text style={styles.title}>Fish Disease Treatments</Text>
      <SafeAreaView style={styles.container}>
      <FlatList 
        data={diseasetreatments}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
      />
      </SafeAreaView>
  </View>
   )
    
   } 
   const styles = StyleSheet.create({
    outer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      alignSelf: 'center',
      position: 'absolute',
      padding:10,
      top:  10,
      fontSize: 20,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 75,
    },
    container: {
      flex: 1,
    },
    });
  
export default Treatment;