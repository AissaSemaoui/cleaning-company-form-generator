import { Box, Checkbox, Flex, Paper, Title } from "@mantine/core";
import React, { useState } from "react";
import { useGlobalContext } from "../utils/globalContext";
import Comment from "./Comment";
import { toolsOptions } from "../utils/data";

function Tools() {
  const { tools, setTools } = useGlobalContext();
  const [comment, setComment] = useState(tools?.comment || "");

  tools.comment = comment;

  const hanldeCheckTools = (value) => {
    setTools((prev) => ({ ...prev, tools: value }));
  };

  return (
    <Box mt="6rem">
      <Title order={3} weight={500} mb="xl">
        Outils
      </Title>
      <Paper shadow="xs" p="lg">
        <Checkbox.Group
          value={tools.tools}
          onChange={hanldeCheckTools}
          label="Selectionner les outils desponible"
        >
          <Flex wrap="wrap" mt="md" mb="xl" gap="xl">
            {toolsOptions.map((tool) => (
              <Checkbox key={tool} value={tool} label={tool}></Checkbox>
            ))}
          </Flex>
        </Checkbox.Group>
        <Comment comment={comment} setComment={setComment} />
      </Paper>
    </Box>
  );
}

export default Tools;
