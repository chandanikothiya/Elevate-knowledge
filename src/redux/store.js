import { combineReducers, configureStore, createReducer } from "@reduxjs/toolkit"
import categoryreducer from "./slice/category.slice"
import subcategoryreducre from "./slice/subcategory.slice"
import favcategoryreducre from "./slice/favcategory.slice"
import authreducre from "./slice/auth.slice"
import  alertreducre  from "./slice/alert.slice"

import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/es/persistReducer"
import persistStore from "redux-persist/es/persistStore"

export const storeconfig = () => {
    const store = configureStore({
        reducer: {
            category: categoryreducer,
            subcategory: subcategoryreducre,
            favcategory: favcategoryreducre,
            auth:authreducre,
            alert:alertreducre
        }
    })

    return store
}

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ["favcategory"]
// }

// const rootreducer = combineReducers({
//     category: categoryreducer,
//     subcategory: subcategoryreducre,
//     favcategory: favcategoryreducre
// })

// const persistedReducer = persistReducer(persistConfig, rootreducer)

// export const persistor = persistStore(storeconfig); 