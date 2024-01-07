import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";

// The configureStore() function accepts a single configuration object parameter, which can include the following options:

// reducer: A function that returns the root reducer for the store, typically combining the slice reducers as mentioned above.
// middleware: An array of Redux middleware to install. Any middleware you specify will be run in the order listed, before the slice reducers are executed.
// devTools: Whether to enable Redux DevTools integration. Defaults to true.
// preloadedState: The initial state value to be given to the store.
// enhancers: An array of store enhancers to apply. See the Redux documentation for details about store enhancers.
// reducerEnhancer: A function that allows you to enhance the store's reducer. See the Redux documentation for details about store enhancers.
// Note: The configureStore() function is intended to be used for the store instance that is used for the entire application. You should not use it to create multiple stores for the same application.

// The configureStore() function returns a Redux store object that you can use to access the state and dispatch actions. The store object has the following properties:
 
// dispatch: The Redux dispatch function.

// getState: The function to read the Redux state tree value from the store.

// subscribe: The function to add a change listener to the store.

// replaceReducer: The function to replace the reducer currently used by the store to calculate the state.

// [$$observable]: The function to create an observable that can be used by libraries such as Redux-Observable.

// The store object also has the following methods:

// dispatch(action): Dispatches an action. This is the only way to trigger a state change.

// subscribe(listener): Adds a change listener. It will be called any time an action is dispatched, and some part of the state tree may potentially have changed. You may then call getState() to read the current state tree inside the callback.

// createStore
const store = configureStore({
    reducer: {
        allCart: cartSlice,
    },
});

export default store;