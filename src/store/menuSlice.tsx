import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import db from '../assets/db.json'
import { Locale } from './UISlice'

export interface StateMenuItem {
  id: number
  name: string
  ingredients: string
  price: number
  img: string
  contains_gluten: boolean
  contains_lactose: boolean
}

export interface MenuCategory {
  category: string
  quick_access: {
    name: string
    icon: string
  }
  items: StateMenuItem[]
}

type SelectedItem = StateMenuItem & { qtd: number }

export interface MenuState {
  availableItems: MenuCategory[]
  selectedItems: SelectedItem[]
}

const initialState: MenuState = {
  availableItems: [],
  selectedItems: [],
}

const menuSlice = createSlice({
  name: 'menu',
  initialState: initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<Locale>) => {
      state.availableItems = db[action.payload]['menu']
    },
    selectItem: (state, action: PayloadAction<SelectedItem>) => {
      state.selectedItems.push(action.payload)
    },
    updateOrder: (state, action: PayloadAction<SelectedItem>) => {
      if (state.selectedItems.some((i) => i.name === action.payload.name)) {
        state.selectedItems = state.selectedItems.map((item) =>
          item.name === action.payload.name ? action.payload : item
        )
      } else {
        state.selectedItems.push(action.payload)
      }
    },
    unselectItem: (state, action: PayloadAction<StateMenuItem>) => {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.name !== action.payload.name
      )
    },
    resetOrder: (state) => {
      state.selectedItems = []
    },
  },
})

export const { selectItem, updateOrder, unselectItem, resetOrder, setMenu } =
  menuSlice.actions

export default menuSlice.reducer
