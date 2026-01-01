import { configureStore } from "@reduxjs/toolkit"
import categoryreducer from "./slice/category.slice"
import subcategoryreducre from "./slice/subcategory.slice"

export const storeconfig = () => {
    const store = configureStore({
        reducer:{
            category:categoryreducer,
            subcategory:subcategoryreducre
        }
    })

    return store
}