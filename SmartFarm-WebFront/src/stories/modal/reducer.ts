import { ModalActionType } from "./actions";

export type ModalState = JSX.Element | null;

export default function reducer(
  state: ModalState = null,
  { type, payload }: ModalActionType
) {
  switch (type) {
    case "VISIBLE":
      return payload;
    case "HIDDEN":
      return null;
    default:
      return state;
  }
}
