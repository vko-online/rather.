import React from 'react'
import { type ColorSchemeName } from 'react-native'

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Colors from 'src/components/Colors'
import useColorScheme from 'src/components/useColorScheme'
import { type RootStackParamList } from 'src/navigation/types'
import GameScreen from 'src/screens/Game'
import GameModeScreen from 'src/screens/GameMode'

import LinkingConfiguration from './LinkingConfiguration'
import NavigationRef from './NavigationRef'

const mapping = {
  1: 'Normal',
  2: 'Absurd',
  3: 'Omega Absurd'
}

export default function Navigation ({ colorScheme }: { colorScheme: ColorSchemeName }): JSX.Element {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      ref={(ref) => {
        if (ref != null) {
          NavigationRef.setTopLevelNavigator(ref)
        }
      }}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator (): JSX.Element {
  const colorScheme = useColorScheme()

  return (
    <Stack.Navigator initialRouteName="GameMode"

      screenOptions={{ contentStyle: { backgroundColor: Colors[colorScheme].background } }}>
      <Stack.Screen name='GameMode' component={GameModeScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Game' component={GameScreen} options={({ route }) => ({
        headerTitle: mapping[route.params.level]
      })} />
    </Stack.Navigator>
  )
}
