import { useRecoilState, useRecoilValue } from "recoil";
import { NodeTree as INodeTree } from "./domain/node/interfaces/NodeTree";
import { NodeService } from "./domain/node/services/NodeService";
import { valueState, listState, symbolState } from "./state";

const Node: React.FunctionComponent<{ node: INodeTree }> = ({ node }) => {
  const [list, setList] = useRecoilState(listState);

  const value = useRecoilValue(valueState);
  const symbol = useRecoilValue(symbolState);

  const onClick: React.MouseEventHandler = async () => {
    const _node = await NodeService.create({
      value: Number(value),
      symbol,
      parent: node.id,
    });
    setList([...list, _node]);
  };

  return (
    <div>
      {node.symbol} {node.value}
      <button onClick={onClick} type="button">
        add to thread
      </button>
      {node.children
        ? node.children.map((c: INodeTree) => (
            <div key={c.id} style={{ marginLeft: 10 }}>
              <Node node={c}></Node>
            </div>
          ))
        : " "}
    </div>
  );
};

export default Node;
