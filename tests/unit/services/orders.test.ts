import userOrdersSlice, {
  addIngredient,
  deleteIngredient,
  switchIngredientOrder,
  getFeeds,
  getOrders,
  orderBurger,
  getOrderByNumber,
  clearOrderModalData
} from '@slices/orders';

const ordersReducer = userOrdersSlice.reducer;

describe('Слайс заказов (Orders Slice)', () => {
  const bun = {
    _id: 'bun-1',
    name: 'Bun',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 10,
    price: 100,
    image: 'i',
    image_large: 'i',
    image_mobile: 'i'
  };
  const filling = { ...bun, _id: 'fill-1', type: 'main', name: 'Fill' };

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

  it('addIngredient: должен добавлять булку', () => {
    const newState = ordersReducer(initialState, addIngredient(bun));
    expect(newState.order.bun).toEqual(bun);
  });

  it('addIngredient: должен добавлять начинку', () => {
    const newState = ordersReducer(initialState, addIngredient(filling));
    expect(newState.order.ingredients[0]).toEqual(filling);
  });

  it('deleteIngredient: должен удалять ингредиент', () => {
    const state = {
      ...initialState,
      order: { ...initialState.order, ingredients: [filling] }
    };
    const newState = ordersReducer(state, deleteIngredient({ index: 0 }));
    expect(newState.order.ingredients).toHaveLength(0);
  });

  it('switchIngredientOrder: должен менять порядок', () => {
    const f1 = { ...filling, name: '1' };
    const f2 = { ...filling, name: '2' };
    const state = {
      ...initialState,
      order: { ...initialState.order, ingredients: [f1, f2] }
    };
    const newState = ordersReducer(
      state,
      switchIngredientOrder({ index: 0, indexSwitch: 1 })
    );
    expect(newState.order.ingredients[0]).toEqual(f2);
  });

  it('clearOrderModalData: должен очищать данные модалки', () => {
    const state = {
      ...initialState,
      orderModalData: { _id: '1', number: 1 } as any
    };
    const newState = ordersReducer(state, clearOrderModalData());
    expect(newState.orderModalData).toBeNull();
  });

  describe('getFeeds', () => {
    it('pending: ставит isFeedLoading = true', () => {
      const action = { type: getFeeds.pending.type };
      const newState = ordersReducer(initialState, action);
      expect(newState.isFeedLoading).toBe(true);
    });

    it('fulfilled: сохраняет заказы', () => {
      const payload = { orders: [{ number: 123 }], total: 100, totalToday: 1 };
      const action = { type: getFeeds.fulfilled.type, payload: payload as any };
      const newState = ordersReducer(initialState, action);
      expect(newState.isFeedLoading).toBe(false);
      expect(newState.feed.total).toBe(100);
    });

    it('rejected: ставит isFeedLoading = false', () => {
      const state = { ...initialState, isFeedLoading: true };
      const action = { type: getFeeds.rejected.type };
      const newState = ordersReducer(state, action);
      expect(newState.isFeedLoading).toBe(false);
    });
  });

  describe('getOrders', () => {
    it('pending: не меняет стейт (пустой редьюсер)', () => {
      const action = { type: getOrders.pending.type };
      const newState = ordersReducer(initialState, action);
      expect(newState).toEqual(initialState);
    });

    it('fulfilled: сохраняет историю заказов', () => {
      const payload = [{ number: 777 }];
      const action = {
        type: getOrders.fulfilled.type,
        payload: payload as any
      };
      const newState = ordersReducer(initialState, action);
      expect(newState.myOrders).toEqual(payload);
    });

    it('rejected: не меняет стейт (пустой редьюсер)', () => {
      const action = { type: getOrders.rejected.type };
      const newState = ordersReducer(initialState, action);
      expect(newState).toEqual(initialState);
    });
  });

  describe('orderBurger', () => {
    it('pending: ставит orderRequest = true', () => {
      const action = { type: orderBurger.pending.type };
      const newState = ordersReducer(initialState, action);
      expect(newState.orderRequest).toBe(true);
      expect(newState.orderModalData).toBeNull();
    });

    it('fulfilled: сохраняет данные и очищает конструктор', () => {
      const payload = { order: { number: 999 }, name: 'New' };
      const state = {
        ...initialState,
        orderRequest: true,
        order: { bun: bun, ingredients: [filling] }
      };

      const action = {
        type: orderBurger.fulfilled.type,
        payload: payload as any
      };
      const newState = ordersReducer(state, action);

      expect(newState.orderRequest).toBe(false);
      expect(newState.orderModalData).toEqual(payload.order);
      expect(newState.order.ingredients).toHaveLength(0);
    });

    it('rejected: сбрасывает orderRequest', () => {
      const state = { ...initialState, orderRequest: true };
      const action = { type: orderBurger.rejected.type };
      const newState = ordersReducer(state, action);
      expect(newState.orderRequest).toBe(false);
    });
  });

  describe('getOrderByNumber', () => {
    it('fulfilled: не должен менять стейт (нет обработчика в редьюсере)', () => {
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: [] }
      };
      const newState = ordersReducer(initialState, action);
      expect(newState).toEqual(initialState);
    });
  });
});
