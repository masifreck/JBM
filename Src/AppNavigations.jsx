import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screen imports
import Splash from './Screens/Splash';
import Login from './Screens/Login';
import Dashboard from './Screens/Dashboard';

import RegisterLoading from './Screens/RegisterLoading';
import RegisterUnloading from './Screens/RegisterUnloading';
import ShowLoading from './Screens/ShowLoading';
import ShowUnloading from './Screens/ShowUnloading';
import Loading from './Screens/Loading';
import Unloading from './Screens/Unloading';
import PrintChallan from './Screens/PrintChallan';
import UpdateLoading from './Screens/UpdateLoading';

const Stack = createNativeStackNavigator();
const AppNavigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
    
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
       
       <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
        {/* =============== */}
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Unloading"
          component={Unloading}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrintChallan"
          component={PrintChallan}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="UpdateLoading"
          component={UpdateLoading}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterLoading"
          component={RegisterLoading}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterUnloading"
          component={RegisterUnloading}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShowLoading"
          component={ShowLoading}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShowUnloading"
          component={ShowUnloading}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigations;
