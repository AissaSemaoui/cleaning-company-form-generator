import { Box, Checkbox, Flex, Paper, Title } from "@mantine/core";
import React from "react";
import { useGlobalContext } from "../utils/globalContext";

function Tools() {
  const { tools, setTools } = useGlobalContext();

  return (
    <Box mt="6rem">
      <Title order={3} weight={500} mb="xl">
        Outils
      </Title>
      <Paper shadow="xs" p="lg">
        <Checkbox.Group
          value={tools}
          onChange={setTools}
          label="Selectionner les outils desponible"
        >
          <Flex wrap="wrap" mt="md" gap="xl">
            <Checkbox value="Aspirateurs" label="Aspirateurs"></Checkbox>
            <Checkbox
              value="Chariot de lavage"
              label="Chariot de lavage"
            ></Checkbox>
            <Checkbox value="mono_brosses" label="mono brosses"></Checkbox>
            <Checkbox value="Produits" label="Produits"></Checkbox>
          </Flex>
        </Checkbox.Group>
      </Paper>
    </Box>
  );
}

export default Tools;
