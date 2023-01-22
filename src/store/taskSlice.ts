import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TaskFilter = 'all' | 'active' | 'completed';

interface State {
  filter: TaskFilter;
}

const initialState: State = {
  filter: 'all'
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    changeFilter: (state, action: PayloadAction<TaskFilter>) => {
      state.filter = action.payload;
    }
  }
});

export const { changeFilter } = taskSlice.actions;

export default taskSlice.reducer;
