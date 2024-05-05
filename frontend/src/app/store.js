import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/userSlice.js'
import videoReducer from '../features/videoSlice.js'
import commentReducer from '../features/commentSlice.js'
import likeReducer from '../features/likeSlice.js'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from "redux-persist"
import { combineReducers } from '@reduxjs/toolkit'
//TODO: When the browser is repoened, the frontend persists the user but the backend doesn't. fix that
const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

const reducer = combineReducers({
    user: userReducer,
    video: videoReducer,
    comment: commentReducer,
    like: likeReducer
});
const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer
})


export default store