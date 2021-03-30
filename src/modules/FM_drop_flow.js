import React from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';

export function buildFM_drop_flow(buildProps) {
    return buildElement(
      "FM_drop_flow", 
      "FM_drop_flow", 
      {event: "PUSH", 
      inputs: ["bool"]}, 
      buildProps.position,
    );
}

// eslint-disable-next-line
const FM_drop_flow = ({ data, id, selected, nodeType }) => {
    return (
      <NodeTemplate
       id={id}
       title={"FM_drop_flow"}
       type={nodeType}
       inputs={data.inputs}

      />
    );
  };
  export default React.memo(FM_drop_flow);
