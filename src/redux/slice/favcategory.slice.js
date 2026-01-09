import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    favourite:[]
}

const favslice = createSlice({
    name:'favcategory',
    initialState,
    reducers:{
        addfavourite(state,actions) {
            
            const check = state.favourite.includes(actions.payload)
            console.log(check);
            if (!check) {
                state.favourite.push(actions.payload)
            } else {
                const index = state.favourite.findIndex(v => v === actions.payload)
                console.log(index)
                state.favourite.splice(index,1)
            }
            
        }
    }
})

export const { addfavourite,getfav } = favslice.actions
export default favslice.reducer;