import { Node } from "./Node";

export interface NodeTree extends Node {
  children: Array<NodeTree>;
}