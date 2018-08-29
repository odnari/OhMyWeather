import storage from 'redux-persist/lib/storage'

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: []
}

export const APP_PREFIX = '@ohmyweather'

export const getFullActionName = module => name => `${APP_PREFIX}/${module}/${name}`
