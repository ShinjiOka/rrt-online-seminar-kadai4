import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  },
  
  extraReducers(builder) {
    builder.addCase(incrementAsync.pending, (state, action) => {
      console.log('pendingです:', state, action);
      
    })
    builder.addCase(incrementAsync.fulfilled, (state, action) => {
      state.value += action.payload
    })
    builder.addCase(incrementAsync.rejected, (state, action) => {
      console.log('rejectedです:', state, action);
      
    })
  }
})

export const incrementAsync = createAsyncThunk<number, number>(
  'counter/incrementAsync',
  async (amount) => {
    await wait(1000);
    return amount;
  }
)

const wait = (ms = 0) => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const selectCount = (state: RootState) => { state.counter.value }

export default counterSlice.reducer