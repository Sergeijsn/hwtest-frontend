import { useRecoilState, useRecoilValue } from "recoil";
import {
  backendListState,
  listState,
  symbolState,
  treeState,
  valueState,
} from "./state";

import Node from "./Node";
import { useEffect } from "react";
import { Node as INode } from "./domain/node/interfaces/Node";
import { NodeService } from "./domain/node/services/NodeService";

const App: React.FunctionComponent = () => {
  const [value, setValue] = useRecoilState(valueState);
  const [symbol, setSymbol] = useRecoilState(symbolState);
  const [list, setList] = useRecoilState(listState);

  const backendNodeList = useRecoilValue<INode[]>(backendListState);
  const tree = useRecoilValue(treeState);

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const onChangeSymbol: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setSymbol(event.target.value);
  };

  const onSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    const node = await NodeService.create({ value: Number(value) });
    setList([...list, node]);
  };

  useEffect(() => {
    setList(backendNodeList);
  }, [backendNodeList, setList]);

  return (
    <div className="App">
      {tree.map((node) => (
        <div key={node.id}>
          <Node key={node.id} node={node}></Node>
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <select value={symbol} onChange={onChangeSymbol}>
          <option>+</option>
          <option>-</option>
          <option>/</option>
          <option>*</option>
        </select>
        <input value={value} onChange={onChangeInput} type="number" />
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};

export default App;
