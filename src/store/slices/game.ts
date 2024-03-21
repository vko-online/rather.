import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface GameState {
  viewedQuestionIds: string[]
}

export type Level = 1 | 2 | 3

const initialState: GameState = { viewedQuestionIds: [] }

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addEntry (state: GameState, action: PayloadAction<string>) {
      state.viewedQuestionIds = [...state.viewedQuestionIds, action.payload]
    },
    removeEntry (state: GameState, action: PayloadAction<string>) {
      const index = state.viewedQuestionIds.indexOf(action.payload)
      if (index !== -1) {
        state.viewedQuestionIds = [
          ...state.viewedQuestionIds.slice(0, index),
          ...state.viewedQuestionIds.slice(index + 1)
        ]
      }
    },
    resetLevel (state: GameState, action: PayloadAction<Level>) {
      state.viewedQuestionIds = [
        ...state.viewedQuestionIds.filter(v => v.split('-')[0] !== String(action.payload))
      ]
    }
  }
})

export const { addEntry, removeEntry, resetLevel } = gameSlice.actions
export default gameSlice.reducer
