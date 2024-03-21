import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  type PersistConfig,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'

import gameReducer, { type GameState } from './slices/game'

const rootReducer = combineReducers({
  game: gameReducer
})

interface StoreType {
  game: GameState
}

const persistConfig: PersistConfig<StoreType> = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['game']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
