import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import feed from '../../services/orders';

export const Feed: FC = () => {
  const orders = useSelector(feed.orders);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
