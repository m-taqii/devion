import { configureStore } from '@reduxjs/toolkit'
import modelReducer from '../features/modelSlice'
const store = configureStore({
    reducer: {
        model: modelReducer
    }
})

export default store