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
import { Link } from "react-router-dom";

const useStyle = createStyles((theme) => ({
  main: {
    minHeight: "100vh",
    padding: "5% 0 15%",
  },
}));

function Home() {
  const { classes } = useStyle();

  const GenerateButton = () => {
    return (
      <Link to="/generated_result">
        <Button variant="outline">Preview</Button>
      </Link>
    );
  };

  return (
    <>
      <header>
        <Navbar Button={<GenerateButton />} />
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
