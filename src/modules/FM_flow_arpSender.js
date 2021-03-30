import React from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';

export function buildFM_flow_arpSender(buildProps) {
    return buildElement(
      "FM_flow_arpSender", 
      "FM_flow_arpSender", 
      {event: "INCOMMING_FLOW", 
      outputs: ["MAC_address"]}, 
      buildProps.position,
    );
}

// eslint-disable-next-line
const FM_flow_arpSender = ({ data, id, selected, nodeType }) => {
    return (
      <NodeTemplate
       id={id}
       title={"FM_flow_arpSender"}
       type={nodeType}
       outputs={data.outputs}
       
      />
    );
  };
  export default React.memo(FM_flow_arpSender);
