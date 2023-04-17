import 'react-native-gesture-handler';
import {enableLatestRenderer} from 'react-native-maps';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-native-paper';
import SplashScreen from './src/screens/SplashScreen';
import SignInScreen from './src/screens/SignInScreen';
import OtpVerify from './src/screens/OtpVerify';
import {Provider as StoreProvider} from 'react-redux';
import {Store} from './src/redux/store';
import {createDrawerNavigator} from '@react-navigation/drawer';
import UserHomePage from './src/screens/UserHomePage';
import UserDashboard from './src/components/UserDashboard';
import CustomerProfile from './src/screens/CustomerProfile';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import OnboardingScreen from './src/screens/OnboardingScreens/OnboardingScreen';
import SignupScreen from './src/screens/SignupScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import {theme} from 'native-base';
import SmallPack from './src/screens/ProductDetailScreen/SmallPack';
import AllProducts from './src/screens/ProductDetailScreen/AllProducts';
import PlaceNewOrder from './src/screens/PlaceNewOrder';
import SelectedCartItems from './src/SelectedCartItems';
import AddressConfirmation from './src/screens/AddressConfirmation';
import Checkout from './src/screens/Checkout';
import Orders from './src/screens/Orders';
import CompletedOrder from './src/screens/CompletedOrder';
import SupportPage from './src/screens/SupportPage';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

enableLatestRenderer();

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

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="UserHomePage"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="UserHomePage"
        component={UserHomePage}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#018795',
          tabBarIcon: () => (
            <Image
              source={require('./src/assets/home.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={PlaceNewOrder}
        options={{
          tabBarLabel: 'Cart',
          tabBarActiveTintColor: '#018795',
          tabBarIcon: () => (
            <Image
              source={require('./src/assets/cart.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={SelectedCartItems}
        options={{
          tabBarLabel: 'Orders',
          tabBarActiveTintColor: '#018795',
          tabBarIcon: () => (
            <Image
              source={require('./src/assets/orders.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={CustomerProfile}
        options={{
          tabBarLabel: 'Accounts',
          tabBarActiveTintColor: '#018795',
          tabBarIcon: () => (
            <Image
              source={require('./src/assets/avatar.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

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
            <Stack.Screen
              name="onboarding"
              component={OnboardingScreen}
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
              name="Signup"
              component={SignupScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TabNavigation"
              component={TabNavigation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SmallPack"
              component={SmallPack}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AllProducts"
              component={AllProducts}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SelectedCartItems"
              component={SelectedCartItems}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddressConfirmation"
              component={AddressConfirmation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CompletedOrder"
              component={CompletedOrder}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SupportPage"
              component={SupportPage}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </StoreProvider>
  );
};

export default App;
