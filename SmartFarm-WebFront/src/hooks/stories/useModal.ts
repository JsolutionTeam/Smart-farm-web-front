import { hiddenModal, visibleModal } from "@stories/modal/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/stories/rootReducer";

export default function useModal() {
  const modal = useSelector((root: RootState) => root.modalReducer);

  const dispatch = useDispatch();

  const __modalVisibleActionFromHooks = (component: JSX.Element) => {
    dispatch(visibleModal(component));
  };

  const __modalHiddenActionFromHooks = () => {
    dispatch(hiddenModal());
  };

  return { modal, __modalVisibleActionFromHooks, __modalHiddenActionFromHooks };
}
