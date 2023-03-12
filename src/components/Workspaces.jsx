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
  rem,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { FiXCircle } from "react-icons/fi";
import WorkspaceTable from "./WorkspaceTable";
import Comment from "./Comment";
import DropFiles from "./DropFiles";
import { floorType } from "../utils/data";
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
  const { classes } = useStayles();

  return (
    <Box mt="6rem">
      <Group position="apart" mb="xl">
        <Title order={2} weight={500}>
          Workspaces
        </Title>
        <Button>Ajouter un espace de travail</Button>
      </Group>
      <Stack>
        <Accordion variant="separated" chevronPosition="left">
          <Accordion.Item value="salon" className={classes.accordion}>
            <AccordionControl>Salon</AccordionControl>
            <Accordion.Panel>
              <Workspace />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </Box>
  );
}

export default Workspaces;

const Workspace = () => {
  const { workspaces, setWorkspaces } = useGlobalContext();

  const [selectedTasks, setSelectedTasks] = useState([]);
  const [images, setImages] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const data = {
      selectedTasks,
      images,
      comment,
    };
    setWorkspaces((prev) => [...prev, data]);
  }, [selectedTasks, images, comment]);

  return (
    <>
      <Box
        bg="neutral.1"
        mb="xl"
        style={{
          overflowX: "auto",
        }}
      >
        <WorkspaceTable
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
        />
      </Box>
      <Box mb="xl">
        <DropFiles images={images} setImages={setImages} />
      </Box>
      <Comment comment={comment} setComment={setComment} />
    </>
  );
};

const AccordionControl = (props) => {
  const { classes } = useStayles();

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
          defaultValue="Lino"
          onClick={(event) => event.stopPropagation()}
        />
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={(event) => event.stopPropagation()}
        >
          <FiXCircle />
        </ActionIcon>
      </Flex>
    </Flex>
  );
};
