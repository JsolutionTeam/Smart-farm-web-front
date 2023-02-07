import { CounterActionType } from './actions';

const initialState = 0;

export default function reducer(
  state = initialState,
  { type }: CounterActionType,
) {
  switch (type) {
    case 'DECREASE':
      return state - 1;
    case 'INCREASE':
      return state + 1;
    default:
      return state;
  }
}
