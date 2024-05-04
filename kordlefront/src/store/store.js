import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './dataslice';

const store = configureStore({
    reducer: {
        data: dataSlice.reducer
    },
});

export default store;