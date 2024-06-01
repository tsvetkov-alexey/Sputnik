import { RootState } from '../store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface FilterSliceState {
  allTasks: boolean;
  doneTasks: boolean;
  notDoneTasks: boolean;
  favouriteTasks: boolean;
  tasksLoading: boolean;
}

const initialState: FilterSliceState = {
  allTasks: true,
  doneTasks: true,
  notDoneTasks: true,
  favouriteTasks: true,
  tasksLoading: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAllTasks(state, action: PayloadAction<boolean>) {
      state.allTasks = action.payload;
    },
    setDoneTasks(state, action: PayloadAction<boolean>) {
      state.doneTasks = action.payload;
    },
    setNotDoneTasks(state, action: PayloadAction<boolean>) {
      state.notDoneTasks = action.payload;
    },
    setFavouriteTasks(state, action: PayloadAction<boolean>) {
      state.notDoneTasks = action.payload;
    },
    setTasksLoading(state, action: PayloadAction<boolean>) {
      state.tasksLoading = action.payload;
    },
  },
});

export const { setAllTasks, setDoneTasks, setNotDoneTasks, setFavouriteTasks, setTasksLoading } =
  filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
