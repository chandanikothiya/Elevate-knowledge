import { configureStore } from "@reduxjs/toolkit"
import categoryreducer from "./slice/category.slice"
import subcategoryreducre from "./slice/subcategory.slice"
import favcategoryreducre from "./slice/favcategory.slice"

export const storeconfig = () => {
    const store = configureStore({
        reducer:{
            category:categoryreducer,
            subcategory:subcategoryreducre,
            favcategory:favcategoryreducre
        }
    })

    return store
}