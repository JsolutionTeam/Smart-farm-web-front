import { DECREASE, INCREASE } from './modules/actionType';

export const increaseCounter = () => {
  return {
    type: INCREASE,
  };
};

export const decreaseCounter = () => {
  return {
    type: DECREASE,
  };
};

export type CounterActionType =
  | ReturnType<typeof increaseCounter>
  | ReturnType<typeof decreaseCounter>;
