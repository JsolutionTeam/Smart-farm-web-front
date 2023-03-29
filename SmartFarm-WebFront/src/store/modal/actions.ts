import { HIDDEN, VISIBLE } from "./modules/actionType";

export const visibleModal = (component: JSX.Element) => {
  return {
    type: VISIBLE,
    payload: component,
  };
};

export const hiddenModal = () => {
  return {
    type: HIDDEN,
    payload: null,
  };
};

export type ModalActionType =
  | ReturnType<typeof visibleModal>
  | ReturnType<typeof hiddenModal>;
