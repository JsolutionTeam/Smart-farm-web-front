import SiteManage from "../components/SiteManage";
import { SiteTypes } from "@typedef/components/Site/site.types";

type Type = "insert" | "update";

type Props = {
  type: Type;
  site: Type extends "update" ? SiteTypes : null;
};

const SiteManageContainer = ({}: Props) => {
  return <SiteManage />;
};

export default SiteManageContainer;
