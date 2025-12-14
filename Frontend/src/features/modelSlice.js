import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    interaction: true,
    enableEffects: true,
    dpr: 1.5
}

const modelSlice = createSlice({
    name: "model",
    initialState: initialState,
    reducers: {
        setInteraction: (state, action) => {
            state.interaction = action.payload
        },
        setEnableEffects: (state, action) => {
            state.enableEffects = action.payload
        },
        setDpr: (state, action) => {
            state.dpr = action.payload
        }
    }
})

export const { setInteraction, setEnableEffects, setDpr } = modelSlice.actions
export default modelSlice.reducer