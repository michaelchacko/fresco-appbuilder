import React from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';

export function buildFM_flow_arpTarget(buildProps) {
    return buildElement(
      "FM_flow_arpTarget", 
      "FM_flow_arpTarget", 
      {event: "INCOMMING_FLOW", 
      outputs: ["MAC_address"]}, 
      buildProps.position,
    );
}

// eslint-disable-next-line
const FM_flow_arpTarget = ({ data, id, selected, nodeType }) => {
    return (
      <NodeTemplate
       id={id}
       title={"FM_flow_arpTarget"}
       type={nodeType}
       outputs={data.outputs}
       
      />
    );
  };
  export default React.memo(FM_flow_arpTarget);
