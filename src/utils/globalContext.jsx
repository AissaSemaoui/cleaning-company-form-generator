import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const GlobalContext = createContext();

const defaultGeneralInfo = {
  fullName: "Aissa", // nom
  contactInfo: "", // email / tel
  surface: "", // m²
  roomCount: "", // nombre de pièces
  preferredDays: [], // jours d'intervention souhaitée
  spaceType: "", // professionnel / particulier
  serviceFrequency: "", // ponctuel / recurrent
};

function GlobalContextWrapper({ children }) {
  const [generalInfo, setGeneralInfo] = useState(defaultGeneralInfo);
  const [workspaces, setWorkspaces] = useState([]);
  const [tools, setTools] = useState({
    tools: [],
    comment: "",
  });
  const [fullInformation, setFullInformation] = useState({});
  const [selectedWorkspaces, setSelectedWorkspaces] = useState([]);

  useEffect(() => {
    setFullInformation({ generalInfo, workspaces, tools });
  }, [generalInfo, workspaces, tools]);

  console.log("inside global context wrapper", fullInformation);

  return (
    <GlobalContext.Provider
      value={{
        generalInfo,
        setGeneralInfo,
        workspaces,
        setWorkspaces,
        tools,
        setTools,
        fullInformation,
        selectedWorkspaces,
        setSelectedWorkspaces,
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
