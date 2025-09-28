import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import orders, {
  clearOrderModalData,
  orderBurger
} from '../../services/orders';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(orders.myOrder);
  const orderRequest = useSelector(orders.orderRequest);
  const orderModalData = useSelector(orders.orderModalData);

  const dispatch = useDispatch();
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    dispatch(
      orderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((x) => x._id)
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce((s, v) => s + v.price, 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
