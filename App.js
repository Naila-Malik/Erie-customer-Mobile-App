import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-native-paper';
import SplashScreen from './src/screens/SplashScreen';
import SignInScreen from './src/screens/SignInScreen';
import OtpVerify from './src/screens/OtpVerify';
import {Provider as StoreProvider} from 'react-redux';
import {Store} from './src/redux/store';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './src/components/DrawerContent';
import {theme} from './src/core/theme';
import {Avatar} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserHomePage from './src/screens/UserHomePage';
import OrdersHistory from './src/screens/OrdersHistory';
import OrderInvoice from './src/screens/OrderInvoice';
import UserDashboard from './src/components/UserDashboard';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="SignInScreen">
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

// const DrawerNavigatorRoutes = ({ navigation }) => {

//   const [img, setImg] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHqNM4oqOODWPU5kEKklqChBr2mpZBgbh1SJDhzH8Wv20thhR2Cz_AzbXAK9yDYC_MHAE&usqp=CAU');
//   const [name, setName] = useState('')

//   useEffect(() => {
//     AsyncStorage.getItem('token').then((value) => {
//       console.log("after navigation" , value)
//       if (value != null) {
//         let val = JSON.parse(value)
//         setImg(val.avatar)
//         setName(val.name)
//       }

//     })
//   })

//   return (
//     // <Provider>
//     <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>

//       <Drawer.Screen
//         name="OrderDelivery"
//         component={OrderDelivery}
//         options={{
//           title: 'Order',
//           headerTitleAlign: 'center',
//           headerLeftContainerStyle: {
//             left: 20
//           },
//           headerTintColor: theme.colors.default,
//           headerLeft: () => (
//             <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
//               <Avatar.Image
//                 source={{ uri: img }}
//                 size={40}
//               />
//             </TouchableOpacity>
//           ),
//           headerStyle: {
//             backgroundColor: theme.colors.primary
//           },
//           headerTitleStyle: {
//             color: theme.colors.default
//           },

//         }}
//       />

//     </Drawer.Navigator>
//     // </Provider>
//   );
// };

const App = () => {
  return (
    <StoreProvider store={Store}>
      <Provider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">
            {/* SplashScreen which will come once for 5 Seconds */}
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              // Hiding header for Splash Screen
              options={{headerShown: false}}
            />
            {/* Auth Navigator: Include Login and Signup */}
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OtpVerify"
              component={OtpVerify}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserHomePage"
              component={UserHomePage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OrdersHistory"
              component={OrdersHistory}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OrderInvoice"
              component={OrderInvoice}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserDashboard"
              component={UserDashboard}
              options={{headerShown: false}}
            />

            {/* <Stack.Screen
              name="OrderDelivery"
              component={OrderDelivery}
              options={{
                title: 'Order Delivery',
                headerTintColor: theme.colors.default,
                headerStyle: {
                  backgroundColor: theme.colors.primary
                },
                headerTitleStyle: {
                  color: theme.colors.default,
                },
              }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </StoreProvider>
  );
};

export default App;
