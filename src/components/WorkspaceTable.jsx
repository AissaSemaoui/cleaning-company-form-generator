import React, { useEffect, useRef, useState } from "react";
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
  const { selectedTasks, setSelectedTasks, tasks } = props;
  const addTaskRef = useRef(null);

  const handleAddTask = () => {
    tasks.push({
      task: addTaskRef.current.value,
    });
    addTaskRef.current.value = "";
    setSelectedTasks((prev) => [...prev]);
  };

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
          tasks={tasks}
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
        />
        <tr>
          <td colSpan={3}>
            <TextInput placeholder="nom de tache" size="sm" ref={addTaskRef} />
          </td>
          <td>
            <Button
              variant="filled"
              size="sm"
              color="blue"
              onClick={handleAddTask}
              fullWidth
            >
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
  cursorPointer: {
    cursor: "pointer",
  },
}));

//* ----------------------------- Rows Component ----------------------------- */

const Rows = ({ selectedTasks, setSelectedTasks, tasks }) => {
  return tasks.map((task) => (
    <Row
      key={task.task}
      task={task}
      selectedTasks={selectedTasks}
      setSelectedTasks={setSelectedTasks}
    />
  ));
};

//* ------------------------------ Row Component ----------------------------- */

const Row = ({ task, selectedTasks, setSelectedTasks }) => {
  const { classes } = useStyle();

  const defaultTask = useRef({
    task: task?.task,
    selected: false,
    frequency: "H",
    frequencyCount: 1,
  });

  const [frequencyInputs, setFrequencyInputs] = useState({
    frequency: defaultTask.current.frequency,
    frequencyCount: defaultTask.current.frequencyCount,
  });

  const currentTask =
    selectedTasks.find((t) => t.task === task.task) || defaultTask.current;

  console.log("selected tasks inside row : ", currentTask);

  const [checked, setChecked] = useState(true);

  const removeFromSelectedTasks = (task) => {
    setSelectedTasks((prev) =>
      prev.filter((selectedTask) => selectedTask.task !== task.task)
    );
  };

  const handleCheck = (e) => {
    setChecked((checked) => !checked);

    if (checked === false) {
      setSelectedTasks((prev) => [
        ...prev,
        { ...defaultTask.current, selected: true },
      ]);
    } else {
      removeFromSelectedTasks(defaultTask.current);
    }
  };

  const updateFrequency = (value) => {
    defaultTask.current.frequency = value;
    setFrequencyInputs((prev) => ({ ...prev, frequency: value }));
    selectedTasks.map((selectedTask) => {
      selectedTask.task === defaultTask.current.task
        ? (selectedTask.frequency = value)
        : null;
      return selectedTask;
    });
  };

  const updateFrequencyCount = (value) => {
    defaultTask.current.frequencyCount = value;
    setFrequencyInputs((prev) => ({ ...prev, frequencyCount: value }));
    selectedTasks.map((selectedTask) => {
      selectedTask.task === defaultTask.current.task
        ? (selectedTask.frequencyCount = value)
        : null;
      return selectedTask;
    });
  };

  useEffect(() => {
    console.log(frequencyInputs);
    setFrequencyInputs({
      frequency: currentTask.frequency,
      frequencyCount: currentTask.frequencyCount,
    });
    setChecked(currentTask.selected);
  }, [selectedTasks]);

  return (
    <tr key={task.task}>
      <td className={classes.cursorPointer} onClick={handleCheck}>
        <Checkbox size="md" checked={checked} onChange={handleCheck}></Checkbox>
      </td>
      <td className={classes.cursorPointer} onClick={handleCheck}>
        {task.task}
      </td>
      <td>
        <Radio.Group
          defaultValue={"H"}
          value={frequencyInputs.frequency}
          onChange={updateFrequency}
          withAsterisk
        >
          <Flex wrap="wrap" gap={10} mt="xs">
            {frequencyOptions.map((item) => (
              <Radio
                key={item.value}
                value={item.label}
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
          value={frequencyInputs.frequencyCount}
          onChange={updateFrequencyCount}
          defaultValue={1}
          min={1}
        />
      </td>
    </tr>
  );
};
