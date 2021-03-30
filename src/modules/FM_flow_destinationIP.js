import React from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';

export function buildFM_flow_destinationIP(buildProps) {
    return buildElement(
      "FM_flow_destinationIP", 
      "FM_flow_destinationIP", 
      {event: "INCOMMING_FLOW", 
      outputs: ["integer"]}, 
      buildProps.position,
    );
}

// eslint-disable-next-line
const FM_flow_destinationIP = ({ data, id, selected, nodeType }) => {
    return (
      <NodeTemplate
       id={id}
       title={"FM_flow_destinationIP"}
       type={nodeType}
       outputs={data.outputs}
       
      />
    );
  };
  export default React.memo(FM_flow_destinationIP);
