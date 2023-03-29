import { hiddenModal, visibleModal } from "src/store/modal/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/rootReducer";

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
