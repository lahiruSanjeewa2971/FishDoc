import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Ditection from './screens/Ditection';
import Login from './screens/auth/Login';
import FishDiseaseIdentification from './screens/modules/disease-detection/DiseaseIdentification';
import FishGrowthIdentification from './screens/modules/growth_detection/FishGrowthIdentification';
import MenuPage from './screens/MenuPage';
import Treatment from './screens/modules/disease-detection/Treatment';
import FishGrowthGuide from './screens/modules/growth_detection/FishGrowthGuide';
import { LogBox } from 'react-native';
import Gender from './screens/modules/gender-identification/Gender';
import Fish_Identification from './screens/modules/fish-identification/Fish_Identification';
import BreedingSuitability from './screens/modules/breedingsuitability/BreedingSuitability';
import Plants from './screens/modules/Plant identification/Plants';


LogBox.ignoreLogs(['Warning: ...']);


LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();

export default function App() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name='LoginPage' component={Login} />
        <Stack.Screen options={{headerShown: false}} name='Login' component={LoginScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Ditection' component={Ditection} />
        <Stack.Screen name='MenuPage' component={MenuPage} />
        <Stack.Screen name='FishDisease' component={FishDiseaseIdentification} />
        <Stack.Screen name='FishGrowth' component={FishGrowthIdentification} />
        <Stack.Screen name='FishDiseaseTreatments' component={Treatment} />
        <Stack.Screen name='FishGrowthGuide' component={FishGrowthGuide} />
        <Stack.Screen name='Gender' component={Gender} />
        <Stack.Screen name='Fishidentification' component={Fish_Identification} />
        <Stack.Screen name='Plants' component={Plants} />
        <Stack.Screen name='BreedingSuitability' component={BreedingSuitability} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
