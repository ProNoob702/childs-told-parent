import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: {
  childsHeight: {
    [key: string]: number
  }
} = {
  childsHeight: {}
}

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setChildHeight(
      state,
      action: PayloadAction<{ key: string; newHeight: number }>
    ) {
      const { key, newHeight } = action.payload
      state.childsHeight[key] = newHeight
    }
  }
})

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
