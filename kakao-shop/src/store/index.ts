import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './rootReducer';
import rootSaga from './rootSaga';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
// });

// sagaMiddleware.run(rootSaga);
