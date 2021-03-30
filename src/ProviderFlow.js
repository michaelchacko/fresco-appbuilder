import React from 'react';
import {
  ReactFlowProvider,
} from 'react-flow-renderer';
import ContextMenu from "./ContextMenu";
import Sidebar from './Sidebar';
import Flow from "./Flow";
import './provider.css';

export const GRID_SIZE = 10;

// define a function called ProviderFlow that takes no arguments () and then runs =>
const ProviderFlow = () => { 

  return (
    <div className="providerflow">
      <ReactFlowProvider>
      <ContextMenu>
        <div
          style={{
                  alignItems: "stretch",
                  display: "flex",
                  height: "100vh",
                }}
          >
          <Flow />
          <Sidebar />
        </div>
      </ContextMenu>
      </ReactFlowProvider>
    </div>
  );
};
export default ProviderFlow;
