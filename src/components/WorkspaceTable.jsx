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

const WorkspaceTable = (props) => {
  const { currentWorkspace, selectedTasks, setSelectedTasks, tasks } = props;
  const addTaskRef = useRef(null);

  const handleAddTask = () => {
    tasks.push({
      task: addTaskRef.current.value,
    });
    addTaskRef.current.value = "";
    setSelectedTasks((prev) => [...prev]);
  };

  return (
    <Table
      miw={{
        xs: 550,
        sm: "100%",
      }}
      verticalSpacing={10}
      withBorder
      highlightOnHover
    >
      <thead>
        <tr>
          <th></th>
          <th style={{ width: "60%" }}>Le nom de tache</th>
          <th style={{ width: "25%" }}>Fréquence</th>
          <th style={{ witdth: "15%" }}>Le nombre</th>
        </tr>
      </thead>
      <tbody>
        <Rows
          tasks={tasks}
          currentWorkspace={currentWorkspace}
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
};

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

const Rows = ({ currentWorkspace, selectedTasks, setSelectedTasks, tasks }) => {
  return tasks.map((task) => {
    const currentTask = currentWorkspace?.selectedTasks.find(
      (t) => t.task === task.task
    );

    return (
      <Row
        key={task.task}
        task={task}
        currentTask={currentTask}
        selectedTasks={selectedTasks}
        setSelectedTasks={setSelectedTasks}
      />
    );
  });
};

//* ------------------------------ Row Component ----------------------------- */

const Row = React.memo(
  ({ task, selectedTasks, setSelectedTasks, currentTask }) => {
    const { classes } = useStyle();

    const defaultTask = useRef({
      task: task?.task,
      selected: false,
      frequency: "H",
      frequencyCount: 1,
    });

    const [frequencyInputs, setFrequencyInputs] = useState({
      frequency: currentTask?.frequency || defaultTask.current.frequency,
      frequencyCount:
        currentTask?.frequencyCount || defaultTask.current.frequencyCount,
    });

    const [checked, setChecked] = useState(
      currentTask?.selected || defaultTask.current.selected
    );

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

    return (
      <tr key={task.task}>
        <td className={classes.cursorPointer} onClick={handleCheck}>
          <Checkbox
            size="md"
            checked={checked}
            onChange={handleCheck}
          ></Checkbox>
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
  }
);
