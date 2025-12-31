import { configureStore } from "@reduxjs/toolkit"
import categoryreducer from "./slice/category.slice"

export const storeconfig = () => {
    const store = configureStore({
        reducer:{
            category:categoryreducer
        }
    })

    return store
}