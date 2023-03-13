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
import React, { useEffect, useRef, useState } from "react";
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

  const { selectedWorkspaces, setSelectedWorkspaces } = useGlobalContext();
  const { classes } = useStayles();

  return (
    <Box mt="6rem">
      <Group position="apart" mb="xl">
        <Title order={2} weight={500}>
          Workspaces
        </Title>
        <Button onClick={open}>Ajouter un espace de travail</Button>
      </Group>
      <Stack>
        <Accordion variant="separated" chevronPosition="left">
          {selectedWorkspaces.map((workspace) => (
            <Accordion.Item
              key={workspace.value}
              value={workspace.value}
              className={classes.accordion}
            >
              <AccordionControl
                setSelectedWorkspaces={setSelectedWorkspaces}
                id={workspace.value}
              >
                {workspace.label}
              </AccordionControl>
              <Accordion.Panel>
                <SingleWorkspace id={workspace.value} tasks={workspace.tasks} />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
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

export default Workspaces;

const AccordionControl = (props) => {
  const { workspaces, setWorkspaces, setSelectedWorkspaces } =
    useGlobalContext();
  const { classes } = useStayles();
  const id = props.id;
  const [soilType, setSoilType] = useState(defaultSoilType);
  const currentWorkspace =
    workspaces.find((workspace) => workspace.id === props.id) || {};

  const handleDelete = (event) => {
    event.stopPropagation();
    setWorkspaces((prev) => [
      ...prev.filter((workspace) => workspace.id !== id),
    ]);
    setSelectedWorkspaces((prev) => [
      ...prev.filter((workspace) => workspace.value !== id),
    ]);
  };
  console.log("workspaces inside workspaces : ", workspaces);

  const handleChangeSoilType = (value) => {
    currentWorkspace.soilType = value;
    setSoilType(value);
  };

  // useEffect(() => {
  //   setSoilType(currentWorkspace.soilType);
  // }, [currentWorkspace.soilType]);

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
          defaultValue={defaultSoilType}
          onChange={handleChangeSoilType}
          onClick={(event) => event.stopPropagation()}
        />
        <ActionIcon variant="subtle" color="red" onClick={handleDelete}>
          <FiXCircle />
        </ActionIcon>
      </Flex>
    </Flex>
  );
};
