import React, { useEffect } from "react";
import Reading from "./pages/reading/index.js";
import Sidebar from "./components/navbar/index.js";
import useIpfs from "./hooks/useIpfs";

import "./App.css";

export const IpfsContext = React.createContext({});

function App() {
  const { ipfs, ipfsState } = useIpfs();
  useEffect(() => {
    if (ipfsState) {
      if (process.env.NODE_ENV === "development") {
        ipfs.swarm
          .connect(process.env.REACT_APP_IPFS_MULTIADDR)
          .then(console.log("connected to dev node"))
          .catch(console.log);
      }
    }
  }, [ipfs, ipfsState]);

  return (
    <div className="App">
      <IpfsContext.Provider value={{ ipfs, ipfsState }}>
        <Sidebar />
        <div className="Content">
          <Reading />
        </div>
      </IpfsContext.Provider>
    </div>
  );
}

export default App;
