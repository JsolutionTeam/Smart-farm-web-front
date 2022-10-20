import { ListTypes } from "@typedef/components/Common/CSelect/list.types";

const SELECTED = "@selected" as const;

export default function useSelected() {
  const getSelected = () => {
    return JSON.parse(sessionStorage.getItem(SELECTED) || "{}") as ListTypes;
  };
  const setSelected = (selected: ListTypes) => {
    sessionStorage.setItem(SELECTED, JSON.stringify(selected));
    window.location.reload();
  };
  const clearSelected = () => {
    sessionStorage.removeItem(SELECTED);
    window.location.reload();
  };

  return {
    getSelected,
    setSelected,
    clearSelected,
  };
}
