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

function Generator() {
  const { fullInformation } = useGlobalContext();

  const [triggerRender, setTriggerRender] = React.useState(false);

  //   React.useEffect(() => {
  //     setTriggerRender((prev) => !prev);
  //   }, [triggerRender]);

  const BackToFormButton = () => {
    return (
      <Link to="/">
        <Button variant="outline">Back to form</Button>;
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

const styles = StyleSheet.create({
  page: {
    paddingVertical: 20,
  },
  h1: {
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
  text: {
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
    width: 100,
    height: 100,
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

  Font.register({
    family: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
  });

  return (
    <Document>
      <Page style={styles.page} wrap={true}>
        <Text style={styles.h1} fixed>
          Cahier des charges Nettoyage
        </Text>
        <View style={styles.container} wrap={true}>
          <View>
            <Text style={styles.text}>Locaux ou domicile</Text>
            <Text style={styles.text}>le nom : {fullName} </Text>
            <Text style={styles.text}>Tel : {contactInfo} </Text>
            <Text style={styles.text}>Surface {surface} m² </Text>
            <Text style={styles.text}>Nombre de pièces : {roomCount}</Text>
            <Text style={styles.text}>Type de locaux : {spaceType}</Text>
            <Text style={styles.text}>
              Jours de passage :{" "}
              {preferredDays?.map((day, id, arr) => {
                if (id === arr.length - 1) return day + ".";
                return day + ", ";
              })}
            </Text>
            <Text style={styles.text}> Fréquence : {serviceFrequency}</Text>
          </View>
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
          <View>
            {workspaces?.map((workspace) => {
              console.log("workspace inside PdfTemplate: ", workspace);
              return (
                <View>
                  <View>
                    <WorkspaceTablePdf data={workspace} />
                  </View>
                  <View style={styles.imagesWrapper}>
                    {workspace.images?.map((image) => (
                      <Image style={styles.image} src={image} />
                    ))}
                  </View>
                  <Text style={styles.text}>Note : {workspace.comment}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
}

const WorkspaceTablePdf = ({ data }) => {
  return (
    <View style={styles.mt} wrap={false}>
      <Text style={styles.text}>Le Salon : ( {data.soilType} ) </Text>
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
