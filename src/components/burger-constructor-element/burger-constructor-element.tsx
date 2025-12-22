import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { deleteIngredient, switchIngredientOrder } from '../../services/orders';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () =>
      dispatch(switchIngredientOrder({ index, indexSwitch: index + 1 }));

    const handleMoveUp = () =>
      dispatch(switchIngredientOrder({ index, indexSwitch: index - 1 }));

    const handleClose = () => dispatch(deleteIngredient({ index }));

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
