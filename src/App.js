import React from "react";
import Reading from "./pages/reading/index.js";
import Sidebar from "./components/sidebar/index.js";
import useIpfs from "./hooks/useIpfs";

import "./App.css";

export const IpfsContext = React.createContext({});

function App() {
  const { ipfs, ipfsState } = useIpfs();
  return (
    <div className="App">
      <IpfsContext.Provider value={{ ipfs, ipfsState }}>
        <Sidebar />
        <div className="Container">
          <Reading />
        </div>
      </IpfsContext.Provider>
    </div>
  );
}

export default App;
