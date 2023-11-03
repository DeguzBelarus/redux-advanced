import { FC } from 'react';

import { IUser } from '../../../redux/types';
import { userApi } from '../../../redux/services/userService';
import styles from './UserItem.module.scss';

interface Props {
  data: IUser;
}

export const UserItem: FC<Props> = ({ data: { id, email, name } }) => {
  const [removeUser, {}] = userApi.useDeleteUserMutation();
  const [updateUser, {}] = userApi.useUpdateUserMutation();

  const removeUserHandler = async () => {
    await removeUser(id);
  };

  const updateUserHandler = async () => {
    const newName = prompt('Name:') || name;
    const newEmail = prompt('email:') || email;
    await updateUser({ id, name: newName, email: newEmail });
  };
  return <div className={styles.UserItem}>
    <p>
      <span>{id}</span>
      <span>{name}</span>
      <span>{email}</span>
    </p>
    <div className={styles['buttons-container']}>
      <button type="button" onClick={updateUserHandler}>Update</button>
      <button type="button" onClick={removeUserHandler}>Delete</button>
    </div>
  </div>;
};
