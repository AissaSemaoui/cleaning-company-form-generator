import React, { useEffect } from "react";
import { Document, Page, StyleSheet, Text } from "@react-pdf/renderer";

function PdfTemplate({ setTriggerRender }) {
  const styles = StyleSheet.create({
    h1: {
      fontSize: 44,
      textAlign: "center",
    },
    page: {
      flexDirection: "row",
    }, // page style
  });

  return (
    <Document>
      <Page size="A4">
        <Text style={styles.h1}>Cahier de charge</Text>
      </Page>
    </Document>
  );
}

export default PdfTemplate;
