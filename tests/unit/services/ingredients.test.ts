import userIngredientsSlice, { getIngredients } from '@slices/ingredients';

const ingredientsReducer = userIngredientsSlice.reducer;

describe('Слайс ингредиентов (Асинхронные экшены)', () => {
  const initialState = {
    ingredients: {},
    buns: [],
    mains: [],
    sauces: [],
    isIngredientsLoading: false
  };

  it('должен устанавливать флаг загрузки в true при pending экшене получения ингредиентов', () => {
    const action = { type: getIngredients.pending.type };
    const newState = ingredientsReducer(initialState, action);

    expect(newState.isIngredientsLoading).toBe(true);
  });

  it('должен записывать данные и сбрасывать флаг загрузки при fulfilled экшене', () => {
    const mockIngredients = [
      { _id: '1', type: 'bun', name: 'Булка' },
      { _id: '2', type: 'main', name: 'Начинка' },
      { _id: '3', type: 'sauce', name: 'Соус' }
    ];

    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };

    const newState = ingredientsReducer(initialState, action);

    expect(newState.isIngredientsLoading).toBe(false);
    expect(newState.ingredients['1']).toEqual(mockIngredients[0]);
    expect(newState.buns).toHaveLength(1);
    expect(newState.mains).toHaveLength(1);
    expect(newState.sauces).toHaveLength(1);
  });

  it('должен сбрасывать флаг загрузки при rejected экшене', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Ошибка сети' }
    };

    const stateLoading = { ...initialState, isIngredientsLoading: true };
    const newState = ingredientsReducer(stateLoading, action);

    expect(newState.isIngredientsLoading).toBe(false);
  });
});
