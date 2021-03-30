import React from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';

export function buildFM_flow_tcpip(buildProps) {
    return buildElement(
      "FM_flow_tcpip", 
      "FM_flow_tcpip", 
      {event: "INCOMMING_FLOW", 
      outputs: ["ip_address", "ip_address", "port", "port"]}, 
      buildProps.position,
    );
}

// eslint-disable-next-line
const FM_flow_destinationIP = ({ data, id, selected, nodeType }) => {
    return (
      <NodeTemplate
       id={id}
       title={"FM_flow_tcpip"}
       type={nodeType}
       outputs={data.outputs}
       
      />
    );
  };
  export default React.memo(FM_flow_destinationIP);
