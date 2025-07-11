import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers as apiFetchUsers, User } from '@/lib/api';

interface UsersState {
  list: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UsersState = {
  list: [],
  status: 'idle',
};

export const fetchUsersFromAPI = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const firstPage = await apiFetchUsers(1);
    const secondPage = await apiFetchUsers(2);
    const allUsers = [...firstPage.data, ...secondPage.data];
    const uniqueUsers = Array.from(
      new Map(allUsers.map(user => [user.id, user])).values()
    );
    return uniqueUsers;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Omit<User, 'id'>>) => {
      const newUser: User = {
        id: Date.now(),
        ...action.payload,
      };
      state.list.unshift(newUser);
    },
    deleteUserById: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(user => user.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsersFromAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsersFromAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsersFromAPI.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { addUser, deleteUserById } = usersSlice.actions;

export default usersSlice.reducer;
