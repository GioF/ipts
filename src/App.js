import React from "react";
import { Route, Switch } from "react-router-dom";
import IpfsRouter from "ipfs-react-router";
import Reading from "./pages/reading/index.js";
import Navbar from "./components/navbar/index.js";
import useIpfs from "./hooks/useIpfs";

import "./App.css";

export const IpfsContext = React.createContext({});

function App() {
  const { ipfs, ipfsState } = useIpfs();

  return (
    <div className="App">
      <IpfsContext.Provider value={{ ipfs, ipfsState }}>
        <IpfsRouter>
          <Navbar />
          <Switch>
            <Route path="/reading">
              <div className="Content">
                <Reading />
              </div>
            </Route>
          </Switch>
        </IpfsRouter>
      </IpfsContext.Provider>
    </div>
  );
}

export default App;
