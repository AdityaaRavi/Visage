import { configureStore } from '@reduxjs/toolkit'
import userIdReducer from './redux-slices/userIdSlice'
// creating a redux store. This is where we will store the user's id and session id.
export default configureStore({
  reducer: {
    userId: userIdReducer,
  },
})