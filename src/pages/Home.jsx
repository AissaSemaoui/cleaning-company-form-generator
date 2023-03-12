import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Container,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import Workspaces from "../components/Workspaces";
import GeneralInfo from "../components/GeneralInfo";
import Tools from "../components/Tools";

const useStyle = createStyles((theme) => ({
  main: {
    minHeight: "100vh",
    padding: "5% 0 15%",
  },
}));

function Home() {
  const { classes } = useStyle();

  return (
    <>
      <header>
        <Navbar Button={<Button variant="outline">Preview</Button>} />
      </header>
      <Container size="lg" className="container">
        <main className={classes.main}>
          <Box mb="xl">
            <Title order={1} mb="xs" align="center">
              Bonjour, bienvenue sur votre espace de gestion de nettoyage
            </Title>
            <Text align="center">
              Vous pouvez ajouter des informations générales sur votre espace de
              travail
            </Text>
          </Box>
          <div>
            <GeneralInfo />
            <Workspaces />
            <Tools />
          </div>
        </main>
      </Container>
    </>
  );
}

export default Home;
