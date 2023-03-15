import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Paper,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import Workspaces from "../components/Workspaces";
import GeneralInfo from "../components/GeneralInfo";
import Tools from "../components/Tools";
import { useNavigate } from "react-router-dom";
import { defaultGeneralInfo, useGlobalContext } from "../utils/globalContext";

const useStyle = createStyles((theme) => ({
  main: {
    minHeight: "100vh",
    padding: "5% 0 15%",
  },
  generateBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: "1rem",
    backgroundColor: theme.colors.white,
    boxShadow: "0 -1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    borderRadius: 0,
    zIndex: 100,
  },
}));

function Home() {
  const { classes } = useStyle();
  const {
    generatorAccess,
    uploadToFirebase,
    setTools,
    setWorkspaces,
    setGeneralInfo,
  } = useGlobalContext();

  const navigate = useNavigate();

  const handleGenerate = async () => {
    await uploadToFirebase()
      .then((res) => {
        console.log("result is here : ", res);
        navigate("/generated_result");
      })
      .catch((err) => console.log(err));
  };

  const handleReset = () => {
    setGeneralInfo(defaultGeneralInfo);
    setWorkspaces([]);
    setTools({
      tools: [],
      comment: "",
    });
  };

  const GenerateButton = () => {
    return (
      <Button
        variant="outline"
        disabled={generatorAccess}
        onClick={handleGenerate}
      >
        Aperçu
      </Button>
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
          <Paper className={classes.generateBar} justify="center">
            <Container size="lg">
              <Group noWrap>
                <Button variant="outline" color="red" onClick={handleReset}>
                  Reset
                </Button>
                <Button
                  variant="gradient"
                  gradient={{
                    from: "blue.6",
                    to: "blue.4",
                  }}
                  fullWidth
                  size="md"
                  disabled={generatorAccess}
                  onClick={handleGenerate}
                >
                  Générer le planning
                </Button>
              </Group>
            </Container>
          </Paper>
        </main>
      </Container>
    </>
  );
}

export default Home;
