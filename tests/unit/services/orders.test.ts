import userOrdersSlice, {
  addIngredient,
  deleteIngredient,
  switchIngredientOrder
} from '@slices/orders';

const ordersReducer = userOrdersSlice.reducer;

describe('Слайс заказов (Логика конструктора)', () => {
  const bun = {
    _id: 'bun-1',
    name: 'Булка 1',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 10,
    price: 100,
    image: 'img',
    image_large: 'img',
    image_mobile: 'img'
  };

  const filling1 = { ...bun, _id: 'fill-1', type: 'main', name: 'Начинка 1' };
  const filling2 = { ...bun, _id: 'fill-2', type: 'main', name: 'Начинка 2' };

  const initialState = {
    myOrders: [],
    orderRequest: false,
    orderModalData: null,
    orders: {},
    feed: { total: 0, totalToday: 0 },
    isFeedLoading: null,
    order: {
      bun: null,
      ingredients: []
    }
  };

  it('должен обрабатывать экшен добавления булки (addIngredient)', () => {
    const newState = ordersReducer(initialState, addIngredient(bun));

    expect(newState.order.bun).toEqual(bun);
    expect(newState.order.ingredients).toHaveLength(0);
  });

  it('должен обрабатывать экшен добавления начинки (addIngredient)', () => {
    const newState = ordersReducer(initialState, addIngredient(filling1));

    expect(newState.order.ingredients).toHaveLength(1);
    expect(newState.order.ingredients[0]).toEqual(filling1);
  });

  it('должен обрабатывать экшен удаления ингредиента (deleteIngredient)', () => {
    const stateWithIngredient = {
      ...initialState,
      order: { ...initialState.order, ingredients: [filling1] }
    };

    const newState = ordersReducer(
      stateWithIngredient,
      deleteIngredient({ index: 0 })
    );

    expect(newState.order.ingredients).toHaveLength(0);
  });

  it('должен обрабатывать экшен изменения порядка ингредиентов (switchIngredientOrder)', () => {
    const stateWithIngredients = {
      ...initialState,
      order: { ...initialState.order, ingredients: [filling1, filling2] }
    };

    const newState = ordersReducer(
      stateWithIngredients,
      switchIngredientOrder({ index: 0, indexSwitch: 1 })
    );

    expect(newState.order.ingredients[0]).toEqual(filling2);
    expect(newState.order.ingredients[1]).toEqual(filling1);
  });
});
