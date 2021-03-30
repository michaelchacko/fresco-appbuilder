import React from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';

export function buildFM_flow_destinationPort(buildProps) {
    return buildElement(
      "FM_flow_destinationPort", 
      "FM_flow_destinationPort", 
      {event: "INCOMMING_FLOW", 
      outputs: ["port"]}, 
      buildProps.position,
    );
}

// eslint-disable-next-line
const FM_flow_destinationPort = ({ data, id, selected, nodeType }) => {
    return (
      <NodeTemplate
       id={id}
       title={"FM_flow_destinationPort"}
       type={nodeType}
       outputs={data.outputs}
       
      />
    );
  };
  export default React.memo(FM_flow_destinationPort);
