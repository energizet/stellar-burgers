import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import feed, { getFeeds } from '../../services/orders';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(feed.orders);
  const isFeedLoading = useSelector(feed.isFeedLoading);

  if (isFeedLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
