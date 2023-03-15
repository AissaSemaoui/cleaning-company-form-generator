import {
  Accordion,
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Select,
  Stack,
  Title,
  createStyles,
} from "@mantine/core";
import React, { useState } from "react";
import { FiXCircle } from "react-icons/fi";
import { defaultSoilType, floorType } from "../utils/data";
import SingleWorkspace from "./SingleWorkspace";
import SelectWorkspacesModal from "./SelectWorkspacesModal";
import { useDisclosure } from "@mantine/hooks";
import { useGlobalContext } from "../utils/globalContext";

const useStayles = createStyles((theme) => ({
  workspacesSelectRoot: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  workspacesSelectLabel: {
    fontSize: "14px",
    color: theme.colors.neutral[5],
  },
  accordion: {
    backgroundColor: theme.colors.background[0],
    // border: `1px solid ${theme.colors.neutral[3]}`,
    boxShadow: theme.shadows.xs,
  },
}));

function Workspaces() {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStayles();

  const {
    setWorkspaces,
    workspaces,
    selectedWorkspaces,
    setSelectedWorkspaces,
  } = useGlobalContext();

  return (
    <Box mt="6rem">
      <Group position="apart" mb="xl">
        <Title order={2} weight={500}>
          Les espace a nettoyer
        </Title>
        <Button onClick={open}>Ajouter un espace</Button>
      </Group>
      <Stack>
        <Accordion variant="separated" chevronPosition="left">
          {selectedWorkspaces.map((selectedWorkspace) => {
            const currentWorkspace = workspaces.find(
              (workspace) => workspace.id === selectedWorkspace.value
            );

            return (
              <Accordion.Item
                key={selectedWorkspace.value}
                value={selectedWorkspace.value}
                className={classes.accordion}
              >
                <AccordionControl
                  setSelectedWorkspaces={setSelectedWorkspaces}
                  currentWorkspace={currentWorkspace}
                  id={selectedWorkspace.value}
                >
                  {selectedWorkspace.label}
                </AccordionControl>
                <Accordion.Panel>
                  <SingleWorkspace
                    id={selectedWorkspace.value}
                    tasks={selectedWorkspace.tasks}
                    currentWorkspace={currentWorkspace}
                    setWorkspaces={setWorkspaces}
                  />
                </Accordion.Panel>
              </Accordion.Item>
            );
          })}
          {selectedWorkspaces.length === 0 && (
            <Title order={4} align="center" color="neutral" mt="xl">
              vous n'avez pas encore ajouté d'espace de travail
            </Title>
          )}
        </Accordion>
      </Stack>
      <SelectWorkspacesModal
        selectedWorkspaces={selectedWorkspaces}
        setSelectedWorkspaces={setSelectedWorkspaces}
        opened={opened}
        close={close}
      />
    </Box>
  );
}

const AccordionControl = (props) => {
  const { setWorkspaces, setSelectedWorkspaces } = useGlobalContext();
  const { currentWorkspace } = props;
  const { classes } = useStayles();
  const id = props.id;
  const [soilType, setSoilType] = useState(
    currentWorkspace?.soilType || defaultSoilType
  );

  console.log("soilType inside accordion : ", soilType);

  const handleDelete = (event) => {
    setWorkspaces((prev) => [
      ...prev.filter((workspace) => workspace.id !== id),
    ]);
    setSelectedWorkspaces((prev) => [
      ...prev.filter((workspace) => workspace.value !== id),
    ]);
  };
  // console.log("workspaces inside workspaces : ", currentWorkspace);

  const handleChangeSoilType = (value) => {
    console.log("soiltype value ", value);
    currentWorkspace.soilType = value;
    setSoilType(value);
  };

  return (
    <Flex
      wrap={{
        xs: "wrap",
        sm: "nowrap",
      }}
      justify="right"
    >
      <Accordion.Control p="md">
        <Group position="apart" className="accordion__control">
          <Title order={3} size="h4" weight={500}>
            {props.children}
          </Title>
        </Group>
      </Accordion.Control>
      <Flex align="center" gap="md" p="md" miw="max-content">
        <Select
          label="Type de sol"
          classNames={{
            root: classes.workspacesSelectRoot,
            label: classes.workspacesSelectLabel,
          }}
          size="sm"
          data={floorType}
          value={soilType}
          onChange={handleChangeSoilType}
        />
        <ActionIcon variant="subtle" color="red" onClick={handleDelete}>
          <FiXCircle />
        </ActionIcon>
      </Flex>
    </Flex>
  );
};

export default Workspaces;
