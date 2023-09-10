import { JapanJSONEntry } from "../japan/types";
import { WorldJSONEntry } from "../world/types";

export type IndexPageProps = {
  world: WorldJSONEntry[];
  japan: JapanJSONEntry[];
};
