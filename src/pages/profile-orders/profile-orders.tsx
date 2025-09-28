import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import ordersStore, { getOrders } from '../../services/orders';

export const ProfileOrders: FC = () => {
  const orders = useSelector(ordersStore.myOrders);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
