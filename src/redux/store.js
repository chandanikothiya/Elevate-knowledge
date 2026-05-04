import { combineReducers, configureStore, createReducer } from "@reduxjs/toolkit"
import categoryreducer from "./slice/category.slice"
import subcategoryreducre from "./slice/subcategory.slice"
import favcategoryreducre from "./slice/favcategory.slice"
import authreducre from "./slice/auth.slice"
import alertreducre from "./slice/alert.slice"
import courseReducer from "./slice/course.slice"
import { courseApi } from "./api/course.api"
import { sectionApi } from "./api/section.api"
import { contentApi } from "./api/content.api"
import { quizApi } from "./api/quiz.api"
import { questionApi } from "./api/question.api"
import { resultApi } from "./api/result.api"
import { wishlistApi } from "./api/wishlist.api"
import { cartApi } from "./api/cart.api"
// import storage from "redux-persist/lib/storage"
// import persistReducer from "redux-persist/es/persistReducer"
// import persistStore from "redux-persist/es/persistStore"

export const storeconfig = () => {
    const store = configureStore({
        reducer: {
            category: categoryreducer,
            subcategory: subcategoryreducre,
            favcategory: favcategoryreducre,
            auth: authreducre,
            alert: alertreducre,
            //course:courseReducer,
            [courseApi.reducerPath]: courseApi.reducer,
            [sectionApi.reducerPath]:sectionApi.reducer,
            [contentApi.reducerPath]:contentApi.reducer,
            [quizApi.reducerPath]:quizApi.reducer,
            [questionApi.reducerPath]:questionApi.reducer,
            [resultApi.reducerPath]:resultApi.reducer,
            [wishlistApi.reducerPath]:wishlistApi.reducer,
            [cartApi.reducerPath]:cartApi.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                courseApi.middleware,
                sectionApi.middleware,
                contentApi.middleware,
                quizApi.middleware,
                questionApi.middleware,
                resultApi.middleware,
                wishlistApi.middleware,
                cartApi.middleware
            ),
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