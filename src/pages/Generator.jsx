import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Button, Container, Text, Title } from "@mantine/core";
// import PdfTemplate from "../components/PdfTemplate";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

import { useGlobalContext } from "../utils/globalContext";
import { Link } from "react-router-dom";
import PdfTemplate from "../components/PdfTemplate";
import { notifications } from "@mantine/notifications";

function Generator() {
  const { fullInformation, generateDocumentTitle, shouldWaitUpload } =
    useGlobalContext();

  useEffect(() => {
    if (shouldWaitUpload) {
      notifications.show({
        title: "S'il vous plaît, attendez",
        message: "Nous téléchargeons vos données",
        color: "blue",
        loading: true,
      });
    } else {
      notifications.clean({
        title: "S'il vous plaît, attendez",
      });
    }
  }, [shouldWaitUpload]);

  const BackToFormButton = () => {
    return (
      <Link to="/">
        <Button variant="outline">Retour au formulaire</Button>
      </Link>
    );
  };

  return (
    <>
      <header>
        <Navbar Button={<BackToFormButton />} />
      </header>
      <main>
        <Container my="md">
          <Title order={1} size="h2" my="sm">
            Générateur de cahier des charges
          </Title>
          <PDFViewer width="100%" height="800px">
            <PdfTemplate
              generateDocumentTitle={generateDocumentTitle}
              fullInformation={fullInformation}
            />
          </PDFViewer>
          <PDFDownloadLink
            fileName={`${generateDocumentTitle()}.pdf`}
            document={
              <PdfTemplate
                generateDocumentTitle={generateDocumentTitle}
                fullInformation={fullInformation}
              />
            }
          >
            Télécharger
          </PDFDownloadLink>
        </Container>
      </main>
    </>
  );
}

export default Generator;
