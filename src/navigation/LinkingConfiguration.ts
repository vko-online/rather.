import { type LinkingOptions } from '@react-navigation/native'
import * as Linking from 'expo-linking'

import { type RootStackParamList } from 'src/navigation/types'

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      GameMode: {
        screens: {
          GameMode: 'GameMode',
          Game: 'Game'
        }
      }
    }
  }
}

export default linking
