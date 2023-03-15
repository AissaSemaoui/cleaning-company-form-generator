import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Button, Container, Title } from "@mantine/core";
// import PdfTemplate from "../components/PdfTemplate";
import { PDFViewer } from "@react-pdf/renderer";

import { useGlobalContext } from "../utils/globalContext";
import { Link } from "react-router-dom";
import PdfTemplate from "../components/PdfTemplate";

function Generator() {
  const { fullInformation } = useGlobalContext();

  const [triggerRender, setTriggerRender] = React.useState(false);

  //   React.useEffect(() => {
  //     setTriggerRender((prev) => !prev);
  //   }, [triggerRender]);

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
              setTriggerRender={setTriggerRender}
              fullInformation={fullInformation}
            />
          </PDFViewer>
        </Container>
      </main>
    </>
  );
}

export default Generator;
