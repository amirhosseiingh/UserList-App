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

// async thunk to fetch users from the api
export const fetchUsersFromAPI = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    // We fetch both pages of users from the API
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
    deleteUserById: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(user => user.id !== action.payload);
    },
  },

  // Reducers for async actions
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

export const { deleteUserById } = usersSlice.actions;

export default usersSlice.reducer;
