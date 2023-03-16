import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

export const defaultFullInformation = {
  generalInfo: defaultGeneralInfo,
  workspaces: [],
  tools: {
    tools: [],
    comment: "",
  },
};

function GlobalContextWrapper({ children }) {
  const [generalInfo, setGeneralInfo] = useState(defaultGeneralInfo);
  const [workspaces, setWorkspaces] = useState([]);
  const [tools, setTools] = useState({
    tools: [],
    comment: "",
  });
  const [fullInformation, setFullInformation] = useState(
    defaultFullInformation
  );
  const [selectedWorkspaces, setSelectedWorkspaces] = useState([]);
  const [generatorAccess, setGeneratorAccess] = useState(false);
  const [shouldWaitUpload, setShouldWaitUpload] = useState(false);

  function validateGeneratorAccess() {
    if (generalInfo.fullName.length > 0 && workspaces.length > 0) {
      setGeneratorAccess(false);
    } else {
      setGeneratorAccess(true);
    }
  }

  useEffect(() => {
    validateGeneratorAccess();
  }, [generalInfo, workspaces, tools]);

  const collectFullInfo = () => {
    setFullInformation({ generalInfo, workspaces, tools });
  };

  const generateDocumentId = () => {
    let title = "";
    title += generalInfo.fullName.replace(" ", "_");
    let currentDate = new Date();
    title += `_${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;
    return title;
  };

  const generateDocumentTitle = () => {
    let title = "";
    title += generalInfo?.fullName;
    let currentDate = new Date();
    title += `_${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;
    return title;
  };

  const uploadToFirebase = async () => {
    setShouldWaitUpload(true);
    const newWorkspaces = await Promise.all(
      workspaces.map(async (workspace) => {
        const imagesUrls = await Promise.all(
          workspace.images.map(async (image) => {
            const storageRef = ref(
              storage,
              `images/${fullInformation.generalInfo.fullName}/${image.file.name}`
            );

            await uploadBytes(storageRef, image.file);
            return await getDownloadURL(storageRef);
          })
        );

        return {
          ...workspace,
          images: imagesUrls,
        };
      })
    );

    const dataToUpload = {
      generalInfo,
      workspaces: newWorkspaces,
      tools,
    };

    return setDoc(
      doc(db, "collectedData", generateDocumentId()),
      dataToUpload
    ).then(() => setShouldWaitUpload(false));
  };

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
        collectFullInfo,
        generateDocumentTitle,
        shouldWaitUpload,
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
