import { FC } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';

import { getCount, incrementCount } from './redux/reducers/mainSlice';
import { UsersContainer } from './components/UsersContainer/UsersContainer';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(getCount);

  const increment = () => {
    dispatch(incrementCount(1))
  };
  return (
    <>
      <h1>{count}</h1>
      <button type="button" onClick={increment}>Increment</button>
      <UsersContainer />
    </>
  );
}
