import React from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';

export function buildFM_flow_sourceMAC(buildProps) {
    return buildElement(
      "FM_flow_sourceMAC", 
      "FM_flow_sourceMAC", 
      {event: "INCOMMING_FLOW", 
      outputs: ["MAC_address"]}, 
      buildProps.position,
    );
}

// eslint-disable-next-line
const FM_flow_sourcePort = ({ data, id, selected, nodeType }) => {
    return (
      <NodeTemplate
       id={id}
       title={"FM_flow_sourceMAC"}
       type={nodeType}
       outputs={data.outputs}
       
      />
    );
  };
  export default React.memo(FM_flow_sourceMAC);
