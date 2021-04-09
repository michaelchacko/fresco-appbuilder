import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  removeElements,
  Controls
} from 'react-flow-renderer';
import './provider.css';
import { useContextMenu } from './context/ContextMenuContext';
import { v4 as uuidv4 } from "uuid";

/* HELP: Import new fresco modules here! */
import FM_drop_flow, {buildFM_drop_flow} from './modules/FM_drop_flow';
import FM_flow_sourceIP, {buildFM_flow_sourceIP} from './modules/FM_flow_sourceIP';
import FM_flow_sourcePort, {buildFM_flow_sourcePort} from './modules/FM_flow_sourcePort';
import FM_match_ip, {buildFM_match_ip} from './modules/FM_match_ip';
import FM_match_port, { buildFM_match_port } from './modules/FM_match_port';
import FM_flow_destinationIP, { buildFM_flow_destinationIP } from './modules/FM_flow_destinationIP';
import FM_logic_and, { buildFM_logic_and } from './modules/FM_logic_and';
import FM_custom, { buildFM_custom } from './modules/FM_custom';

const onElementClick = (event, element) => console.log();
const onLoad = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);
export const GRID_SIZE = 10;

const initialElements = [
];

const initialTransform = {
  x: 0,
  y: 0,
  zoom: 1,
};

const initialId = uuidv4();

function snapToGrid(position) {
  return Math.floor(position / GRID_SIZE) * GRID_SIZE;
}

export default function Flow() {

  /* HELP: Add new fresco module types here! */
  const nodeTypes = {
    FM_drop_flow: FM_drop_flow,
    FM_flow_sourceIP: FM_flow_sourceIP,
    FM_flow_destinationIP: FM_flow_destinationIP,
    FM_flow_sourcePort: FM_flow_sourcePort,
    FM_match_ip: FM_match_ip,
    FM_match_port: FM_match_port,
    FM_logic_and: FM_logic_and,
    FM_custom: FM_custom,
  };

  const contextMenu = useContextMenu();
  
  /* useState will create a state variable called 'elements' 
     that originally holds 'initialElements'. We update the state with 'setElements()' */
  const [elements, setElements] = useState(initialElements);
  const [transform, setTransform] = useState(initialTransform);
  const [id, setId] = useState(initialId);

  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const addElement = (elementToAdd) => {
    setElements((els) => els.concat([elementToAdd]));
  };

  // Load project from URL
  useEffect(() => {
    const project = atob(window.location.hash.substr(1));
    try {
      const { elements, id, transform } = JSON.parse(project);
      setElements(elements);
      setId(id ?? uuidv4());
      setTransform(transform);
    } catch (e) {
      console.error(e);
    }
  }, [setElements, setId, setTransform]);

  // Store project in URL
  useEffect(() => {
    window.location.hash = btoa(
      JSON.stringify({
        elements: elements.map(element => ({ ...element, __rf: undefined })),
        id,
        transform,
      })
    );
  }, [elements, id, transform]);

  const onChange = useCallback(
    (e) => {
      try {
        const { elements, id, transform } = JSON.parse(e.target.value);
        setElements(elements);
        setId(id ?? uuidv4());
        setTransform(transform);
      } catch (e) {
        console.error(e);
      }
    },
    [setElements, setId, setTransform]
  );

  const addNode = useCallback(
    (buildFunction) => {
      const position = {
        x: snapToGrid((contextMenu.getRect().left)),
        y: snapToGrid((contextMenu.getRect().top)),
      };
      const buildProps = {
        setElements,
        position,
      }
      addElement(buildFunction(buildProps))
      contextMenu.hide();
    },
    [contextMenu, setElements]
  );

  const onPaneClick = useCallback(() => {
    contextMenu.hide();
  }, [contextMenu]);

  const onPaneContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      contextMenu.setRect({ width: 0, height: 0, top: event.clientY, right: 0, bottom: 0, left: event.clientX });
      contextMenu.show(<FlowContextMenu />);
    },
    [contextMenu]
  );
  
  function FlowContextMenu() {
    return (
      <ul className="contextMenu">
        {items.map(item => (
          <li key={item.label}>
            {item.label}
            <span>&#x276F;</span>
            {item.items && (
              <ul className="contextMenu sub">
                {item.items.map(subitem => (
                  <li key={subitem.label} onClick={() => addNode(subitem.build)}>
                    {subitem.label}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  }
  
  
  /* HELP: Add new FRESCO module here. This is the right-click toolbar */
  const items = [
    {
      items: [
        { label: "FM_flow_sourceIP", build: buildFM_flow_sourceIP },
        { label: "FM_flow_destinationIP", build: buildFM_flow_destinationIP },
        { label: "FM_flow_sourcePort", build: buildFM_flow_sourcePort },
        { label: "FM_flow_destinationPort", build: buildFM_flow_sourceIP },
        { label: "FM_flow_sourceMAC", build: buildFM_flow_sourceIP },
        { label: "FM_flow_destinationMAC", build: buildFM_flow_sourceIP },
        { label: "FM_flow_arpSender", build: buildFM_flow_sourceIP },
        { label: "FM_flow_arpTarget", build: buildFM_flow_sourceIP },
        { label: "FM_flow_tcpip", build: buildFM_flow_sourceIP },
        { label: "FM_drop_flow", build: buildFM_drop_flow },
        { label: "FM_match_ip", build: buildFM_match_ip },
      ],
      label: "Flow Utilities",
    },
    {
      items: [
        { label: "FM_match_ip", build: buildFM_match_ip },
        { label: "FM_match_port", build: buildFM_match_port },
        { label: "FM_match_mac", build: buildFM_match_ip },
        { label: "FM_arith_equal", build: buildFM_match_ip },
        { label: "FM_arith_larger", build: buildFM_match_ip },
        { label: "FM_arith_smaller", build: buildFM_match_ip },
        { label: "FM_logic_and", build: buildFM_logic_and },
        { label: "FM_logic_or", build: buildFM_match_ip },
        { label: "FM_count_ip", build: buildFM_match_ip },
        { label: "FM_output_bool", build: buildFM_match_ip },
        { label: "FM_output_int", build: buildFM_match_ip },
        { label: "FM_output_ip", build: buildFM_match_ip },
        { label: "FM_output_mac", build: buildFM_match_ip },
      ],
      label: "Basic Operations",
    },
    {
      items: [
        { label: "FM_drop_flow", build: buildFM_drop_flow },
        { label: "FM_forward_flow", build: buildFM_match_ip },
        { label: "FM_mirror_flow", build: buildFM_match_ip },
        { label: "FM_redirect_ip", build: buildFM_match_ip },
        { label: "FM_block_ip", build: buildFM_match_ip },
        { label: "FM_quarantine_ip", build: buildFM_match_ip },
      ],
      label: "Security Actions",
    },
    {
      items: [
        { label: "FM_find_scan", build: buildFM_match_ip },
        { label: "FM_find_arpSpoofing", build: buildFM_match_ip },
      ],
      label: "Network Attack Detection",
    },
    {
      items: [
        { label: "FM_load_balance", build: buildFM_match_ip },
      ],
      label: "Network Service",
    },
    {
      items: [
        { label: "FM_find_bufferoverflow", build: buildFM_match_ip },
        { label: "FM_http_extGuard", build: buildFM_match_ip },
        { label: "FM_calc_interval_freq", build: buildFM_match_ip },
        { label: "FM_custom", build: buildFM_custom },
      ],
      label: "Third Party",
    },
  ];

  return (
    <div className="reactflow-wrapper" >
      <ReactFlow
        elements={elements}
        onElementClick={onElementClick}
        onConnect={onConnect}
        onElementsRemove={onElementsRemove}
        onLoad={onLoad}
        nodeTypes={nodeTypes}
        onPaneClick={onPaneClick}
        onPaneContextMenu={onPaneContextMenu}
        selectNodesOnDrag={false}
        snapGrid={[GRID_SIZE, GRID_SIZE]}
        style={{ zIndex: 0 }}
      >
        <Background gap={GRID_SIZE} />
        <Controls />
      </ReactFlow>
  </div>
  )

  
};


