import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import combinedReducers from './combinedReducers'
import rootSaga from './rootSaga'
import { persistConfig } from '../config'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [ sagaMiddleware ]

const persistedReducers = persistReducer(persistConfig, combinedReducers)

const store = createStore(
  persistedReducers,
  compose(applyMiddleware(...middlewares))
)
sagaMiddleware.run(rootSaga)

const persistor = persistStore(store)

const config = {
  store,
  persistor
}

export default config
