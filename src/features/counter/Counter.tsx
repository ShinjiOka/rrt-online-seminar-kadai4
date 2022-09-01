import type { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { increment, decrement, incrementByAmount, selectCount, incrementAsync } from './counterSlice';

export const Counter: FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  // const count = useSelector((state: RootState) => state.counter.value);
  // const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          aria-label="Increment By Amount"
          onClick={() => dispatch(incrementByAmount(10))}
        >
          Increment By Amount
        </button>
        <button
          aria-label="Increment Async"
          onClick={() => dispatch(incrementAsync(100))}
        >
          Increment Async
        </button>
      </div>
    </div>
  )
}