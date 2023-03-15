import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

const GlobalContext = createContext();

export const defaultGeneralInfo = {
  fullName: "", // nom
  contactInfo: "", // email / tel
  address: "", // adresse
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
  const [generatorAccess, setGeneratorAccess] = useState(false);

  useEffect(() => {
    setFullInformation({ generalInfo, workspaces, tools });
    validateGeneratorAccess();
    console.log("inside global useEffect : ", fullInformation);
  }, [generalInfo, workspaces, tools]);

  function validateGeneratorAccess() {
    console.log("inside validateGeneratorAccess", generatorAccess);
    if (generalInfo.fullName.length > 0 && workspaces.length > 0) {
      setGeneratorAccess(false);
    } else {
      setGeneratorAccess(true);
    }
  }

  const generateDocumentId = () => {
    let title = "";
    title += generalInfo.fullName.replace(" ", "_");
    let currentDate = new Date();
    title += `_${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
    return title;
  };

  const uploadToFirebase = async () => {
    console.log("upload to firebase");
    return setDoc(
      doc(db, "collectedData", generateDocumentId()),
      fullInformation
    );
  };

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
        setFullInformation,
        selectedWorkspaces,
        setSelectedWorkspaces,
        generatorAccess,
        uploadToFirebase,
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
