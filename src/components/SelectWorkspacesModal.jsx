import {
  Button,
  Flex,
  Group,
  Modal,
  MultiSelect,
  Select,
  Stack,
  createStyles,
} from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { workspacesOptions } from "../utils/data";

const useStyle = createStyles({
  modalContent: {
    overflowY: "visible",
  },
});

function SelectWorkspacesModal({
  opened,
  close,
  selectedWorkspaces,
  setSelectedWorkspaces,
}) {
  const { classes } = useStyle();
  const allOptions = useRef([]);
  const baseOptions = workspacesOptions;

  console.log("selectedWorkspaces inside modal : ", selectedWorkspaces);

  const handleSelect = (value) => {
    const selectedOption = baseOptions.find((option) =>
      value[value.length - 1].startsWith(option.value)
    );

    if (!selectedOption) return;

    const duplicateCount = selectedWorkspaces.filter((option) =>
      option.value.startsWith(selectedOption.value)
    ).length;

    if (duplicateCount > 0) {
      setSelectedWorkspaces((prev) => [
        ...prev,
        {
          ...selectedOption,
          value: `${selectedOption.value} ${duplicateCount + 1}`,
          label: `${selectedOption.value} ${duplicateCount + 1}`,
          tasks: [...selectedOption.tasks], // add base option tasks
        },
      ]);
    } else {
      setSelectedWorkspaces((prev) => [...prev, selectedOption]);
    }
  };

  allOptions.current = baseOptions.flatMap((option) => {
    const duplicateCount = selectedWorkspaces.filter((selected) =>
      selected.value.startsWith(option.value)
    ).length;
    const options = [{ ...option }];
    for (let i = 2; i <= duplicateCount + 1; i++) {
      options.push({
        value: `${option.value} ${i}`,
        label: `${option.value} ${i}`,
        tasks: option.tasks, // add base option tasks
      });
    }
    return options;
  });

  return (
    <Modal
      closeOnClickOutside={false}
      classNames={{
        content: classes.modalContent,
      }}
      centered
      opened={opened}
      onClose={close}
    >
      <Stack>
        <MultiSelect
          data={allOptions.current}
          placeholder="Select workspaces"
          label="Workspaces"
          onChange={handleSelect}
        ></MultiSelect>

        <Flex justify="right">
          <Button onClick={close}>OK</Button>
        </Flex>
      </Stack>
    </Modal>
  );
}

export default React.memo(SelectWorkspacesModal);
