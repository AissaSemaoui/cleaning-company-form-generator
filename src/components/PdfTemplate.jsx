import React from "react";
import { Font, Image, View } from "@react-pdf/renderer";
import { Document, Page, StyleSheet, Text } from "@react-pdf/renderer";
import {
  DataTableCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "@david.kucsai/react-pdf-table";

// fonts
import RobotoBold from "../assets/fonts/Roboto-Bold.ttf";
import RobotoRegular from "../assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "../assets/fonts/Roboto-Medium.ttf";

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

//* ------------------------- Pdf Template Component ------------------------- */

function PdfTemplate({ fullInformation, generateDocumentTitle }) {
  const { generalInfo, workspaces, tools } = fullInformation;

  const {
    fullName,
    contactInfo,
    address,
    surface,
    roomCount,
    preferredDays,
    spaceType,
    serviceFrequency,
  } = generalInfo || {};

  return (
    <Document title={generateDocumentTitle()}>
      <Page style={styles.page} wrap={true}>
        <Text style={styles.h1}>Cahier des charges Nettoyage</Text>
        <View style={styles.container} wrap={true}>
          <View>
            {/* <Text style={styles.title}>Locaux ou domicile</Text> */}
            <Text style={styles.title}>
              Le nom : <Text style={styles.text}>{fullName} </Text>
            </Text>
            <Text style={styles.title}>
              Le Contact : <Text style={styles.text}>{contactInfo} </Text>
            </Text>
            <Text style={styles.title}>
              Address : <Text style={styles.text}>{address} </Text>
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
              return workspace.selectedTasks.length > 0 ||
                workspace.comment !== "" ||
                workspace.images?.length > 0 ? (
                <View key={workspace?.id}>
                  {workspace.selectedTasks.length > 0 ? (
                    <View>
                      <WorkspaceTablePdf data={workspace} />
                    </View>
                  ) : (
                    <Text style={styles.text}>Aucun Tache</Text>
                  )}
                  {workspace?.comment && (
                    <Text style={{ ...styles.mt, ...styles.text }}>
                      Remarque : {workspace.comment}
                    </Text>
                  )}
                  <View style={styles.imagesWrapper}>
                    {workspace.images?.map((image) => (
                      <Image
                        key={image?.temporaryUrl}
                        style={styles.image}
                        src={image?.temporaryUrl}
                      />
                    ))}
                  </View>
                </View>
              ) : null;
            })}
          </View>
          <View style={styles.mt} wrap={false}>
            <Text style={styles.title}>les outils disponible : </Text>
            <Text style={styles.text}>
              {tools?.tools?.length > 0
                ? tools?.tools?.map((tool, index, self) =>
                    self.length - 1 === index ? tool + ". " : tool + ", "
                  )
                : "Aucun"}
            </Text>
            {tools?.comment && (
              <Text style={styles.text}>Remarque : {tools?.comment}</Text>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

//* --------------------- Workspaces Table Pdf Component --------------------- */

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

export default PdfTemplate;
