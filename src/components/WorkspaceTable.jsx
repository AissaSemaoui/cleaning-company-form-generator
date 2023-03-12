import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  NumberInput,
  Radio,
  Table,
  TextInput,
  createStyles,
} from "@mantine/core";
import { FiPlus } from "react-icons/fi";
import { frequencyOptions } from "../utils/data";

function WorkspaceTable(props) {
  const { selectedTasks, setSelectedTasks } = props;

  return (
    <Table verticalSpacing={10} withBorder highlightOnHover>
      <thead>
        <tr>
          <th></th>
          <th style={{ width: "60%" }}>Le nom de tache</th>
          <th style={{ width: "25%" }}>Frequency</th>
          <th style={{ witdth: "15%" }}>number</th>
        </tr>
      </thead>
      <tbody>
        <Rows
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
        />
        <tr>
          <td colSpan={3}>
            <TextInput placeholder="nom de tache" size="sm" />
          </td>
          <td>
            <Button variant="filled" size="sm" color="blue" fullWidth>
              Ajouter&nbsp;
              <FiPlus />
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default WorkspaceTable;

const useStyle = createStyles((theme) => ({
  radioLabel: {
    paddingLeft: 5,
  },
}));

//* ----------------------------- Rows Component ----------------------------- */

const Rows = ({ selectedTasks, setSelectedTasks }) => {
  const elements = [
    {
      name: "Nettoyage des têtes de distributeurs de boissons dans les fontaines à soda et les bars doivent nettoyer les pointes des pistolets à soda",
    },
    {
      name: "Désinfection des surfaces de la zone de préparation avec des produits désinfectants de surface",
    },
    {
      name: "Nettoyage et désinfection des éviers.",
    },
  ];

  return elements.map((task) => (
    <Row
      key={task.name}
      task={task}
      selectedTasks={selectedTasks}
      setSelectedTasks={setSelectedTasks}
    />
  ));
};

//* ------------------------------ Row Component ----------------------------- */

const Row = ({ task, selectedTasks, setSelectedTasks }) => {
  const { classes } = useStyle();

  const [checked, setChecked] = useState(false);

  const defaultTask = {
    name: task?.name,
    selected: false,
    frequency: "Hebdomadaire",
    frequencyCount: 1,
  };

  const removeFromSelectedTasks = (task) => {
    setSelectedTasks((prev) =>
      prev.filter((selectedTask) => selectedTask.name !== task.name)
    );
  };

  const handleCheck = (e) => {
    setChecked(e.currentTarget.checked);

    if (e.currentTarget.checked) {
      setSelectedTasks((prev) => [...prev, defaultTask]);
    } else {
      removeFromSelectedTasks(defaultTask);
    }
  };

  const updateFrequency = (value) => {
    defaultTask.frequency = value;
    selectedTasks.map((selectedTask) => {
      selectedTask.name === defaultTask.name
        ? (selectedTask.frequency = value)
        : null;
      return selectedTask;
    });
  };

  const updateFrequencyCount = (value) => {
    defaultTask.frequencyCount = value;
    selectedTasks.map((selectedTask) => {
      selectedTask.name === defaultTask.name
        ? (selectedTask.frequencyCount = value)
        : null;
      return selectedTask;
    });
  };

  return (
    <tr key={task.name}>
      <td>
        <Checkbox size="md" checked={checked} onChange={handleCheck}></Checkbox>
      </td>
      <td>{task.name}</td>
      <td>
        <Radio.Group
          defaultValue="Hebdomadaire"
          onChange={updateFrequency}
          withAsterisk
        >
          <Flex wrap="wrap" gap={10} mt="xs">
            {frequencyOptions.map((item) => (
              <Radio
                value={item.value}
                labelPosition="right"
                label={item.label}
                classNames={{
                  label: classes.radioLabel,
                }}
              />
            ))}
          </Flex>
        </Radio.Group>
      </td>
      <td>
        <NumberInput
          size="xs"
          onChange={updateFrequencyCount}
          defaultValue={1}
          min={1}
        />
      </td>
    </tr>
  );
};
