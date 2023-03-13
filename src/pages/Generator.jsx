import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Button, Container } from "@mantine/core";
// import PdfTemplate from "../components/PdfTemplate";
import { Font, Image, PDFViewer, View } from "@react-pdf/renderer";
import { Document, Page, StyleSheet, Text } from "@react-pdf/renderer";
import {
  DataTableCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "@david.kucsai/react-pdf-table";
import { useGlobalContext } from "../utils/globalContext";
import { Link } from "react-router-dom";

// fonts
import RobotoBold from "../assets/fonts/Roboto-Bold.ttf";
import RobotoRegular from "../assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "../assets/fonts/Roboto-Medium.ttf";

function Generator() {
  const { fullInformation } = useGlobalContext();

  const [triggerRender, setTriggerRender] = React.useState(false);

  //   React.useEffect(() => {
  //     setTriggerRender((prev) => !prev);
  //   }, [triggerRender]);

  const BackToFormButton = () => {
    return (
      <Link to="/">
        <Button variant="outline">Back to form</Button>
      </Link>
    );
  };

  return (
    <>
      <header>
        <Navbar Button={<BackToFormButton />} />
      </header>
      <main>
        <Container>
          <h1>Generator</h1>
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

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: RobotoRegular,
    },
    {
      src: RobotoBold,
      fontWeight: "bold",
    },
    {
      src: RobotoMedium,
      fontWeight: "normal",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingVertical: 20,
  },
  h1: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: 900,
    textAlign: "center",
    marginVertical: 30,
  },
  container: {
    width: "90%",

    // backgroundColor: "#004c6a",
    marginHorizontal: "auto",
  }, // page style
  title: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 10,
    lineHeight: 1.5,
  },
  text: {
    fontFamily: "Roboto",
    fontWeight: "normal",
    fontSize: 12,
    marginBottom: 10,
    lineHeight: 1.5,
  },
  mt: {
    marginTop: 10,
  },
  imagesWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 20,
  },
  image: {
    height: 100,
    objectFit: "contain",
  },
});

function PdfTemplate({ fullInformation }) {
  const { generalInfo, workspaces, tools } = fullInformation;

  const {
    fullName,
    contactInfo,
    surface,
    roomCount,
    preferredDays,
    spaceType,
    serviceFrequency,
  } = generalInfo || {};

  console.log("fullInformation inside Generator.jsx: ", fullInformation);

  return (
    <Document>
      <Page style={styles.page} wrap={true}>
        <Text style={styles.h1}>Cahier des charges Nettoyage</Text>
        <View style={styles.container} wrap={true}>
          <View>
            {/* <Text style={styles.title}>Locaux ou domicile</Text> */}
            <Text style={styles.title}>
              le nom : <Text style={styles.text}>{fullName} </Text>
            </Text>
            <Text style={styles.title}>
              Tel : <Text style={styles.text}>{contactInfo} </Text>
            </Text>
            <Text style={styles.title}>
              Surface : <Text style={styles.text}>{surface} m²</Text>
            </Text>
            <Text style={styles.title}>
              Nombre de pièces : <Text style={styles.text}>{roomCount} </Text>
            </Text>
            <Text style={styles.title}>
              Type de locaux : <Text style={styles.text}>{spaceType} </Text>
            </Text>
            <Text style={styles.title}>
              Jours de passage :
              <Text style={styles.text}>
                {" "}
                {preferredDays?.map((day, id, arr) => {
                  if (id === arr.length - 1) return day + ".";
                  return day + ", ";
                })}
              </Text>
            </Text>
            <Text style={styles.title}>
              {" "}
              Fréquence : <Text style={styles.text}>{serviceFrequency} </Text>
            </Text>
          </View>
          <View>
            <View style={styles.mt}>
              <Text style={styles.text}>
                Le chiffre indiqué correspond à la fréquence de l’opération dans
                la période concernée, hors samedi, dimanche et jours fériés
              </Text>
              <Text style={styles.text}> H = Hebdomadaire</Text>
              <Text style={styles.text}> M = Mensuel </Text>
              <Text style={styles.text}> BM = Bi-mensuelle </Text>
              <Text style={styles.text}> T = Trimestrielle </Text>
              <Text style={styles.text}> A = Annuelle </Text>
            </View>
            {workspaces?.map((workspace) => {
              console.log("workspace inside PdfTemplate: ", workspace);
              return (
                <View>
                  <View>
                    <WorkspaceTablePdf data={workspace} />
                  </View>
                  {workspace?.comment && (
                    <Text style={{ ...styles.mt, ...styles.text }}>
                      note : {workspace.comment}
                    </Text>
                  )}
                  <View style={styles.imagesWrapper}>
                    {workspace.images?.map((image) => (
                      <Image style={styles.image} src={image} />
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.mt}>
            <Text style={styles.title}>les outils disponible : </Text>
            <Text style={styles.text}>
              {tools?.tools?.length > 0
                ? tools?.tools?.map((tool, index, self) =>
                    self.length - 1 === index ? tool + ". " : tool + ", "
                  )
                : "Aucun"}
            </Text>
            {tools?.comment && (
              <Text style={styles.text}>note : {tools?.comment}</Text>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

const WorkspaceTablePdf = ({ data }) => {
  return (
    <View style={styles.mt} wrap={true}>
      <Text style={styles.title}>
        {data.id} : ( {data.soilType} )
      </Text>
      <Table data={data.selectedTasks}>
        <TableHeader fontSize={10}>
          <TableCell weighting={11} style={{ padding: 5 }}>
            Tache
          </TableCell>
          <TableCell weighting={1} textAlign="center" style={{ padding: 5 }}>
            H
          </TableCell>
          <TableCell weighting={1} textAlign="center" style={{ padding: 5 }}>
            M
          </TableCell>
          <TableCell weighting={1} textAlign="center" style={{ padding: 5 }}>
            BM
          </TableCell>
          <TableCell weighting={1} textAlign="center" style={{ padding: 5 }}>
            T
          </TableCell>
          <TableCell weighting={1} textAlign="center" style={{ padding: 5 }}>
            A
          </TableCell>
        </TableHeader>
        <TableBody fontSize={11}>
          <DataTableCell
            style={{ padding: 5 }}
            weighting={11}
            getContent={(r) => r.task}
          />
          <DataTableCell
            weighting={1}
            textAlign="center"
            style={{ padding: 5 }}
            getContent={(r) => (r.frequency === "H" ? r.frequencyCount : "-")}
          />
          <DataTableCell
            weighting={1}
            textAlign="center"
            style={{ padding: 5 }}
            getContent={(r) => (r.frequency === "M" ? r.frequencyCount : "-")}
          />
          <DataTableCell
            weighting={1}
            textAlign="center"
            style={{ padding: 5 }}
            getContent={(r) => (r.frequency === "BM" ? r.frequencyCount : "-")}
          />
          <DataTableCell
            weighting={1}
            textAlign="center"
            style={{ padding: 5 }}
            getContent={(r) => (r.frequency === "T" ? r.frequencyCount : "-")}
          />
          <DataTableCell
            weighting={1}
            textAlign="center"
            style={{ padding: 5 }}
            getContent={(r) => (r.frequency === "A" ? r.frequencyCount : "-")}
          />
        </TableBody>
      </Table>
    </View>
  );
};
