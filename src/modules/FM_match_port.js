import React, { useState, useEffect } from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';
import { useProject } from "../context/ProjectContext";

export function buildFM_match_port(buildProps) {
    return buildElement(
      "FM_match_port", 
      "FM_match_port", 
      {event: "PULL", 
      parameters: ["80"], 
      outputs: ["bool"], 
      inputs: ["port"], 
      }, 
      buildProps.position,
      );
}

// eslint-disable-next-line
const FM_match_port = ({ data, id, selected, nodeType }) => {
    const [port, setIP] = useState(data.parameters[0]);

    const { setElements } = useProject();
    useEffect(() => {
      setElements((els) =>
        els.map((el) => {
          if (el.id === id) {
            // it's important that you create a new object here
            // in order to notify react flow about the change
            el.data = {
              ...el.data,
              parameters: [port],
            };
          }

          return el;
        })
      );      
    }, [port, id, setElements]);
    return (
        <div>
          <NodeTemplate
          id={id}
          title={`FM_match_port: ${port}`}
          type={nodeType}
          inputs={data.inputs}
          outputs={data.outputs}
          >
            {selected && (
              <div className="customNode_editor">
                <div className="customNode_item">
                    <span>Port:</span>
                    <input onChange={e => setIP(e.target.value)} value={port}/>
                </div>
            </div>

            )}
            </NodeTemplate>
        </div>

    );
  };
export default React.memo(FM_match_port);
