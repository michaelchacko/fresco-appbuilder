import React from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';

export function buildFM_logic_and(buildProps) {
    return buildElement(
      "FM_logic_and", 
      "FM_logic_and", 
      {event: "PUSH", 
      inputs: ["bool", "bool"],
      outputs: ["bool"]},
      buildProps.position,
    );
}

// eslint-disable-next-line
const FM_logic_and = ({ data, id, selected, nodeType }) => {
    return (
      <NodeTemplate
       id={id}
       title={"FM_logic_and"}
       type={nodeType}
       inputs={data.inputs}
       outputs={data.outputs}
      />
    );
  };
  export default React.memo(FM_logic_and);
