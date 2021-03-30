import React from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';

export function buildFM_flow_sourceIP(buildProps) {
    return buildElement(
      "FM_flow_sourceIP", 
      "FM_flow_sourceIP", 
      {event: "INCOMMING_FLOW", 
      outputs: ["ip_address"]}, 
      buildProps.position,
    );
}

// eslint-disable-next-line
const FM_flow_sourceIP = ({ data, id, selected, nodeType }) => {
    return (
      <NodeTemplate
       id={id}
       title={"FM_flow_sourceIP"}
       type={nodeType}
       outputs={data.outputs}
       
      />
    );
  };
export default FM_flow_sourceIP;
