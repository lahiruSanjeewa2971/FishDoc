import React from 'react';
import {  View , StyleSheet, TouchableOpacity, Text, Dimensions, ImageBackground, StatusBar, useColorScheme} from 'react-native';
import {auth} from '../firebase';
import {useNavigation} from '@react-navigation/core';
import {Colors} from 'react-native/Libraries/NewAppScreen';
export const fonts = {
    Bold: {fontFamily: 'Roboto-Bold'},
  };
  export const {height, width} = Dimensions.get('window');
const MenuPage = ( ) => {
  const navigationPage = useNavigation();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const isDarkMode = useColorScheme() === 'dark';

  return (
        <View style={[styles.maincontainer, backgroundStyle]}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
           
            <TouchableOpacity style={styles.logoutBtn}  >
              <Text style={styles.logoutButtonText} onPress={() => navigationPage.navigate('LoginPage')}>Log out</Text>
            </TouchableOpacity>

            <View style={styles.mainPageMenu}>
              <View style={styles.menuPageRow}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigationPage.navigate('FishGrowth', { name: 'Fish Growth' })}>
                  <Text style={styles.menuText}>Growth Analysis</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigationPage.navigate('FishDisease', { name: 'Fish Disease' })}>
                  <Text style={styles.menuText}>Diseases Diagnose</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.menuPageRow}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigationPage.navigate('Fishidentification', { name: 'Fishidentification' })}>
                  <Text style={styles.menuText}>Fish Identification</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigationPage.navigate('Gender', { name: 'Gender' })}>
                  <Text style={styles.menuText}>Gender Identification</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.menuPageRow}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigationPage.navigate('Plants', { name: 'Plants' })}>
                  <Text style={styles.menuText}>Aquatic Plants</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigationPage.navigate('BreedingSuitability', { name: 'BreedingSuitability' })}>
                  <Text style={styles.menuText}>Breeding Suitability</Text>
                </TouchableOpacity>
              </View>

            </View>
            {/*<TouchableOpacity onPress={() => navigation.navigate('FishDisease', { name: 'Fish Disease' })}>
                <View style={[styles.box]} >
                    <Text style={[styles.textlabel]}>Fish Disease</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('FishGrowth', { name: 'Fish Growth' })}>
                <View style={[styles.box]}>
                    <Text style={[styles.textlabel]}>Fish Growth</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('FishDisease', { name: 'Fish Disease' })}>
                <View style={[styles.box]}>
                    <Text style={[styles.textlabel]}>Fish Gender</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('FishGrowth', { name: 'Fish Growth' })}>
                <View style={[styles.box]}>
                    <Text style={[styles.textlabel]}>Fish Species</Text>
                </View>
            </TouchableOpacity>*/}
         </View>
    );
};
const styles = StyleSheet.create({
  mainPageMenu: {
    marginTop: 15,
    backgroundColor: 'white'
  },
  menuPageRow: {
    flexDirection: 'row',
    width: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  menuItem: {
    width : 140,
    height: 120,
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 20
    },
    shadowOpacity: 0.95,
    shadowRadius: 13.84,
    elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(137, 182, 248, 0.8)',
  },
  menuText: {
    fontSize: 17,
    color: 'blue'
  },

  logoutBtn: {
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 180
  },
  logoutButtonText: {
    backgroundColor: 'red',
    width: '60%',
    height: 40,
    paddingLeft: 30,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    color: 'white',
  },
    maincontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingBottom: 50,
      
      },
      box: {
        width: 300,
        height: 80,
        backgroundColor: 'white',
        marginBottom: 8,
        marginTop: 30,
        opacity: 0.9,
        elevation: 2,
      },
      textlabel: {
       fontSize: 25,
       fontWeight: '500',
       ...fonts.Bold,
       marginLeft: 60,
       marginTop: 30,
      },
      row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      button: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: 'oldlace',
        alignSelf: 'flex-start',
        marginHorizontal: '1%',
        marginBottom: 6,
        minWidth: '48%',
        textAlign: 'center',
      },
      selected: {
        backgroundColor: 'coral',
        borderWidth: 0,
      },
      buttonLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: 'coral',
      },
      selectedLabel: {
        color: 'white',
      },
      label: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 24,
      },
});
export default MenuPage;

