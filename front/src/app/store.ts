import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import ideaReducer from '../features/idea/ideaSlice';
import { fetchIdeasByPageSaga, fetchIdeasByIdSaga } from '../features/idea/ideaSagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    idea: ideaReducer
  },
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(fetchIdeasByPageSaga);
sagaMiddleware.run(fetchIdeasByIdSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
