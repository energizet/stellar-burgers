import rootReducer from '../../src/services/rootReducer';
import store from '../../src/services/store';

describe('rootReducer (Корневой редьюсер)', () => {
  it('должен возвращать начальное состояние хранилища при вызове с undefined состоянием и неизвестным экшеном', () => {
    const expectedState = store.getState();

    const result = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(result).toEqual(expectedState);
  });
});
