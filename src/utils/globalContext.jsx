import React, { useState } from "react";
import { createContext, useContext } from "react";

const GlobalContext = createContext();

function GlobalContextWrapper({ children }) {
  const [generalInfo, setGeneralInfo] = useState({});
  const [workspaces, setWorkspaces] = useState([]);
  const [tools, setTools] = useState([]);

  console.log("inside global context wrapper", generalInfo, workspaces, tools);

  return (
    <GlobalContext.Provider
      value={{
        generalInfo,
        setGeneralInfo,
        workspaces,
        setWorkspaces,
        tools,
        setTools,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};

export default GlobalContextWrapper;
