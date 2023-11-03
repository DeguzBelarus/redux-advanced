import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';

import { fetchUsersAsync } from '../../redux/reducers/actionCreators';
import { userApi } from '../../redux/services/userService';
import { UserItem } from './UserItem/UserItem';
import styles from './UsersContainer.module.scss';

export const UsersContainer: FC = () => {
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState(10);
  const { data: usersData, error, isLoading, refetch } = userApi.useFetchUsersQuery(limit,
    { pollingInterval: 10000 }
  );
  const [addUser, {}] = userApi.useAddUserMutation();

  const addUserHandler = async () => {
    const name = prompt('Name:');
    const email = prompt('email:');
    if (!name || !email) return;
    await addUser({ id: (usersData?.length || 0) + 1, name, email});
  };

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);
  return <div className={styles.UsersContainer}>
    <button type="button" onClick={addUserHandler}>Add</button>
    {usersData?.length && !isLoading ?
      usersData.map((userData) => {
        const { id } = userData;
        return <UserItem data={userData} key={id} />
      })
      : isLoading
        ? <p>loading...</p>
        : error
          ? <p>Something goes wrong ;(</p>
          : <p>no users</p>}
  </div>;
};
