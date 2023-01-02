import { View, Text, FlatList, StyleSheet, Dimensions, ImageBackground, SafeAreaView } from 'react-native'
import React, {useEffect, useState} from 'react'
import {auth, firebase} from '../../../firebase';

console.disableYellowBox = true;
export const {height, width} = Dimensions.get('window');
const FishGrowthGuide = ({route}) => {
    var [growthguidesteps, setGrowthGuideSteps] = useState([]);
    const month = route.params.month;
    


    console.log(month)
    function getFishGrowthGuide({month}){
    useEffect(() => {
        const subscriber = firebase.firestore().collection('fishgrowthguides')
            .where("month", "==", month)
            .get()
            .then(documentSnapshot => {
              documentSnapshot.forEach(doc => {
                setGrowthGuideSteps(doc.data().guides)
            })
            });
  
            
      
          // Stop listening for updates when no longer required
          return () => subscriber();
        }, [month]);
    }
    getFishGrowthGuide({month})


  return (
    <View style={styles.outer}>
       <ImageBackground
          blurRadius={7}
          source={require('../../../assets/tank.png')}
          style={{height: 50, width: 400}}
        />
      <Text style={styles.title}>FishGrowthGuide</Text>
      <SafeAreaView style={styles.container}>
      <FlatList 
        data={growthguidesteps}
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
    height: 80,
  },
  container: {
    flex: 1,
  },
  });


export default FishGrowthGuide