import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { uuidv4 } from './src/utils/uuid';
import Focus from './src/features/focus/Focus';
import Timer from './src/features/timer/Timer';
import { setList, clearList, getList } from './src/utils/storage';
import UserList from "./src/features/list/UserList";
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserProfile from './src/features/list/UserProfile'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const STATUSES = {
  COMPLETED: 1,
  CANCELED: 0,
};

function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
            initialRouteName="UsersScreen"
            screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'UsersScreen') {
              iconName = focused
                  ? 'list'
                  : 'add-to-list';
            } else if (route.name === 'Focus') {
              iconName = 'time-slot';
            }

            // You can return any component that you like here!
            return <Entypo name={iconName} size={size} color={color}/>;
          },
          tabBarActiveTintColor: '#25224E',
          tabBarInactiveTintColor: 'gray',
        })}>
          <Tab.Screen name="UsersScreen" component={UsersScreen} />
          <Tab.Screen name="Focus" component={FocusScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

function UsersScreen() {
  return (
        <Stack.Navigator initialRouteName="Users">
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
        </Stack.Navigator>
  );
};

function Users({navigation}) {
  return (
      <View style={styles.container}>
        <UserList />
      </View>
  )}

const FocusScreen = ({navigation}) => {
  const [focusSubject, setFocusSubject] = useState();
  const [focusHistory, setFocusHistory] = useState([]);
  // const [fontLoaded, setFontLoaded] = useState(false);

  const [loaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
  });

  // const loadFonts = async () => {
  //   await Font.loadAsync({
  //     'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
  //     'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf')
  //   })
  //   setFontLoaded(true)
  // }

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  const addFocusHistory = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status, key: uuidv4() }]);
  };

  const saveFocusHistory = async () => {
    try {
      await setList(focusHistory);
    } catch (e) {
      console.log(e);
    }
  };

  const clearHistory = async () => {
    await clearList();
    await loadFocusHistory();
  };

  const loadFocusHistory = async () => {
    try {
      const history = await getList();

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      } else {
        setFocusHistory([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistory(focusSubject, STATUSES.COMPLETED);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            setFocusSubject(null);
            addFocusHistory(focusSubject, STATUSES.CANCELED);
          }}
        />
      ) : (
        <>
          <Focus
            setFocusSubject={setFocusSubject}
            focusHistory={focusHistory}
            clearHistory={clearHistory}
          />
        </>
      )}
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
