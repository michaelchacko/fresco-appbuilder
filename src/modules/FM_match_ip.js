import React, { useState, useEffect } from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';
import { useProject } from "../context/ProjectContext";

export function buildFM_match_ip(buildProps) {
    return buildElement(
      "FM_match_ip", 
      "FM_match_ip", 
      {event: "PULL", 
      parameters: ["0.0.0.0"], 
      outputs: ["bool"], 
      inputs: ["ip_address"], 
      }, 
      buildProps.position,
      );
}

// eslint-disable-next-line
const FM_match_ip = ({ data, id, selected, nodeType }) => {
    const [ipAddress, setIP] = useState(data.parameters[0]);
    const [event, setEvent] = useState(data.event);

    const { setElements } = useProject();
    useEffect(() => {
      setElements((els) =>
        els.map((el) => {
          if (el.id === id) {
            // it's important that you create a new object here
            // in order to notify react flow about the change
            el.data = {
              ...el.data,
              parameters: [ipAddress],
              event: event,
            };
          }

          return el;
        })
      );      
    }, [ipAddress, event, id, setElements]);
    return (
        <div>
          <NodeTemplate
          id={id}
          title={`FM_match_ip: ${ipAddress}`}
          type={nodeType}
          inputs={data.inputs}
          outputs={data.outputs}
          >
            {selected && (
              <div className="customNode_editor">
                <div className="customNode_item">
                    <span>IP Address:</span>
                    <input onChange={e => setIP(e.target.value)} value={ipAddress}/>
                </div>
                <div className="customNode_item">
                    <span>Event:</span>
                    <input onChange={e => setEvent(e.target.value)} value={event} />
              </div>
            </div>

            )}
            </NodeTemplate>
        </div>

    );
  };
export default React.memo(FM_match_ip);
