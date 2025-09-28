import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import auth from '../../services/auth';

export const AppHeader: FC = () => {
  const user = useSelector(auth.user);
  return <AppHeaderUI userName={user?.name ?? ''} />;
};
