import userAuthSlice, {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logout
} from '@slices/auth';

const authReducer = userAuthSlice.reducer;

describe('Слайс авторизации (Auth Slice)', () => {
  const initialState = {
    isAuthChecked: false,
    isAuthenticated: false,
    user: null
  };

  const mockUser = {
    email: 'test@test.ru',
    name: 'Test User'
  };

  describe('registerUser', () => {
    it('pending: должен сбрасывать isAuthChecked в false', () => {
      const state = { ...initialState, isAuthChecked: true };
      const action = { type: registerUser.pending.type };
      const newState = authReducer(state, action);
      expect(newState.isAuthChecked).toBe(false);
    });

    it('fulfilled: должен сохранять пользователя и ставить флаги авторизации', () => {
      const action = { type: registerUser.fulfilled.type, payload: mockUser };
      const newState = authReducer(initialState, action);
      expect(newState.user).toEqual(mockUser);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.isAuthChecked).toBe(true);
    });

    it('rejected: должен ставить isAuthChecked в true (проверка завершена с ошибкой)', () => {
      const state = { ...initialState, isAuthChecked: false };
      const action = { type: registerUser.rejected.type };
      const newState = authReducer(state, action);
      expect(newState.isAuthChecked).toBe(true);
    });
  });

  describe('loginUser', () => {
    it('pending: должен сбрасывать isAuthChecked', () => {
      const state = { ...initialState, isAuthChecked: true };
      const action = { type: loginUser.pending.type };
      const newState = authReducer(state, action);
      expect(newState.isAuthChecked).toBe(false);
    });

    it('fulfilled: должен авторизовывать пользователя', () => {
      const action = { type: loginUser.fulfilled.type, payload: mockUser };
      const newState = authReducer(initialState, action);
      expect(newState.user).toEqual(mockUser);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.isAuthChecked).toBe(true);
    });

    it('rejected: должен ставить isAuthChecked в true', () => {
      const state = { ...initialState, isAuthChecked: false };
      const action = { type: loginUser.rejected.type };
      const newState = authReducer(state, action);
      expect(newState.isAuthChecked).toBe(true);
    });
  });

  describe('getUser', () => {
    it('pending: должен сбрасывать isAuthChecked', () => {
      const state = { ...initialState, isAuthChecked: true };
      const action = { type: getUser.pending.type };
      const newState = authReducer(state, action);
      expect(newState.isAuthChecked).toBe(false);
    });

    it('fulfilled: должен сохранять данные пользователя', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const newState = authReducer(initialState, action);
      expect(newState.user).toEqual(mockUser);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.isAuthChecked).toBe(true);
    });

    it('rejected: должен завершать проверку и сбрасывать пользователя', () => {
      const state = { ...initialState, isAuthChecked: false };
      const action = { type: getUser.rejected.type };
      const newState = authReducer(state, action);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.isAuthenticated).toBe(false);
    });
  });

  describe('logout', () => {
    it('pending: должен сбрасывать isAuthChecked', () => {
      const state = { ...initialState, isAuthChecked: true };
      const action = { type: logout.pending.type };
      const newState = authReducer(state, action);
      expect(newState.isAuthChecked).toBe(false);
    });

    it('fulfilled: должен удалять данные пользователя', () => {
      const state = { ...initialState, user: mockUser, isAuthenticated: true };
      const action = { type: logout.fulfilled.type };
      const newState = authReducer(state, action);
      expect(newState.user).toBeNull();
      expect(newState.isAuthenticated).toBe(false);
      expect(newState.isAuthChecked).toBe(true);
    });

    it('rejected: должен ставить isAuthChecked в true (даже если выход не удался на сервере, локально мы завершаем процесс)', () => {
      const state = { ...initialState, isAuthChecked: false };
      const action = { type: logout.rejected.type };
      const newState = authReducer(state, action);
      expect(newState.isAuthChecked).toBe(true);
    });
  });

  describe('updateUser', () => {
    it('pending: не должен менять состояние (по текущей логике)', () => {
      const action = { type: updateUser.pending.type };
      const newState = authReducer(initialState, action);
      expect(newState).toEqual(initialState);
    });

    it('fulfilled: должен обновлять данные пользователя', () => {
      const oldUser = { name: 'Old', email: 'old@test.ru' };
      const newUser = { name: 'New', email: 'new@test.ru' };
      const state = { ...initialState, user: oldUser, isAuthenticated: true };

      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: newUser }
      };
      const newState = authReducer(state, action);
      expect(newState.user).toEqual(newUser);
    });

    it('rejected: не должен менять состояние (по текущей логике)', () => {
      const action = { type: updateUser.rejected.type };
      const newState = authReducer(initialState, action);
      expect(newState).toEqual(initialState);
    });
  });
});
