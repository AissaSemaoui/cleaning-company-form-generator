import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Button, Container } from "@mantine/core";
// import PdfTemplate from "../components/PdfTemplate";
import { Font, PDFViewer, View } from "@react-pdf/renderer";
import { Document, Page, StyleSheet, Text } from "@react-pdf/renderer";
import {
  DataTableCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "@david.kucsai/react-pdf-table";

function Generator() {
  const [triggerRender, setTriggerRender] = React.useState(false);

  //   React.useEffect(() => {
  //     setTriggerRender((prev) => !prev);
  //   }, [triggerRender]);

  useEffect(() => {
    console.log("rerendered");
  });

  const Component = () => {
    return (
      <PDFViewer width="100%" height="800px">
        <PdfTemplate setTriggerRender={setTriggerRender} />
      </PDFViewer>
    );
  };

  return (
    <>
      <header>
        <Navbar Button={<Button variant="outline">Go back to form</Button>} />
      </header>
      <main>
        <Container>
          <h1>Generator</h1>
          <Component />
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
    marginBottom: 30,
  },
  container: {
    width: "90%",
    height: "90%",
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
});

function PdfTemplate({ setTriggerRender }) {
  Font.register({
    family: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Cahier des charges Nettoyage</Text>
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>Locaux ou domicile</Text>
            <Text style={styles.text}>le nom : Aissa semaoui </Text>
            <Text style={styles.text}>Tel : 0795914857 </Text>
            <Text style={styles.text}>Surface : environ 77m2 </Text>
            <Text style={styles.text}>
              Nombre de pièces : salon et deux chambres
            </Text>
            <Text style={styles.text}>
              Teletravail le lundi et vendredi Clement
            </Text>
          </View>
          <View style={styles.mt}>
            <Text style={styles.text}>
              Le chiffre indiqué correspond à la fréquence de l’opération dans
              la période concernée, hors samedi, dimanche et jours fériés
            </Text>
            <Text style={styles.text}> H = Hebdomadaire</Text>
            <Text style={styles.text}> M = Mensuel </Text>
            <Text style={styles.text}> A = Annuel </Text>
          </View>
          <WorkspaceTablePdf />
        </View>
      </Page>
    </Document>
  );
}

const WorkspaceTablePdf = ({ data }) => {
  return (
    <View style={styles.mt}>
      <Text style={styles.text}>Le Salon : ( Carellage ) </Text>
      <Table
        data={[
          {
            tache: "John",
            H: "-",
            M: "-",
            BM: "3",
            T: "-",
            A: "-",
          },
        ]}
      >
        <TableHeader fontSize={10}>
          <TableCell weighting={11} style={{ paddingLeft: 5 }}>
            Tache
          </TableCell>
          <TableCell weighting={1} style={{ paddingLeft: 5 }}>
            H
          </TableCell>
          <TableCell weighting={1} style={{ paddingLeft: 5 }}>
            M
          </TableCell>
          <TableCell weighting={1} style={{ paddingLeft: 5 }}>
            BM
          </TableCell>
          <TableCell weighting={1} style={{ paddingLeft: 5 }}>
            T
          </TableCell>
          <TableCell weighting={1} style={{ paddingLeft: 5 }}>
            A
          </TableCell>
        </TableHeader>
        <TableBody fontSize={11}>
          <DataTableCell
            style={{ paddingLeft: 5 }}
            weighting={11}
            getContent={(r) => r.tache}
          />
          <DataTableCell
            weighting={1}
            style={{ paddingLeft: 5 }}
            getContent={(r) => r.H}
          />
          <DataTableCell
            weighting={1}
            style={{ paddingLeft: 5 }}
            getContent={(r) => r.M}
          />
          <DataTableCell
            weighting={1}
            style={{ paddingLeft: 5 }}
            getContent={(r) => r.BM}
          />
          <DataTableCell
            weighting={1}
            style={{ paddingLeft: 5 }}
            getContent={(r) => r.T}
          />
          <DataTableCell
            weighting={1}
            style={{ paddingLeft: 5 }}
            getContent={(r) => r.A}
          />
        </TableBody>
      </Table>
    </View>
  );
};
