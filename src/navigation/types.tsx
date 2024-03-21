import { type NativeStackScreenProps } from '@react-navigation/native-stack'

import { type Level } from 'src/store/slices/game'

declare global {
  // eslint-disable-next-line
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
// eslint-disable-next-line
export type RootStackParamList = {
  GameMode: undefined
  Game: {
    level: Level
  }
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
RootStackParamList,
Screen
>
