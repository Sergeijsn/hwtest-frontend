import { CreateNodeDto } from "../interfaces/CreateNodeDto";
import { Node as INode } from "../interfaces/Node";

interface NodeApiResponse {
  id: number;
  value: number;
  symbol?: string;
  parent?: NodeApiResponse;
}

const apiUrl = process.env.REACT_APP_API_URL;

export const NodeService = {
  async getAll(): Promise<INode[]> {
    const response = await fetch(`${apiUrl}/nodes`);
    return (await response.json()).map(
      (e: NodeApiResponse): INode => ({
        ...e,
        parent: e.parent ? e.parent.id : undefined,
      })
    );
  },
  async create(createNodeDto: CreateNodeDto): Promise<INode> {
    const res = await fetch(`${apiUrl}/nodes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createNodeDto),
    });

    const data = await res.json();

    const node: INode = {
      id: data.id,
      value: data.value,
      parent: data.parent ? data.parent.id : undefined,
      symbol: data.symbol ?? undefined,
    };

    return node;
  },
};
