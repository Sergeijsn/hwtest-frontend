import { atom, selector } from "recoil";
import { Node as INode } from "./domain/node/interfaces/Node";
import { NodeTree as INodeTree } from "./domain/node/interfaces/NodeTree";
import { NodeService } from "./domain/node/services/NodeService";

export const listState = atom<INode[]>({
  key: "listState",
  default: [],
});

export const backendListState = selector<INode[]>({
  key: "backendListState",
  get: async () => {
    return await NodeService.getAll()
  },
});

export const treeState = selector<INodeTree[]>({
  key: "treeState",
  get: ({ get }) => {
    const list = get(listState);
    const rec = (node: INode): INodeTree => {
      return {
        ...node,
        children: [
          ...list.filter((e) => e.parent === node.id).map((e) => rec(e)),
        ],
      };
    };
    return [...list.filter(e => !e.parent).map((e) => rec(e))];
  },
});

export const valueState = atom<string>({
  key: "valueState",
  default: ""
});

export const symbolState = atom<string>({
  key: "symbolState",
  default: "+",
});