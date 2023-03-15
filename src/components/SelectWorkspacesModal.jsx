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
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const baseOptions = workspacesOptions;

  const handleSelect = useCallback(
    (value) => {
      const lastValue = value[value.length - 1];
      let selectedOption = null;
      for (let i = 0; i < baseOptions.length; i++) {
        const option = baseOptions[i];
        if (lastValue.startsWith(option.value)) {
          selectedOption = option;
          break;
        }
      }
      if (!selectedOption) {
        return;
      }
      const duplicateCount = selectedWorkspaces.some((option) =>
        option.value.startsWith(selectedOption.value)
      )
        ? selectedWorkspaces.filter((option) =>
            option.value.startsWith(selectedOption.value)
          ).length
        : 0;
      if (duplicateCount > 0) {
        setSelectedWorkspaces((prev) => [
          ...prev,
          {
            value: `${selectedOption.value} ${duplicateCount + 1}`,
            label: `${selectedOption.value} ${duplicateCount + 1}`,
            tasks: [...selectedOption.tasks], // add base option tasks
          },
        ]);
      } else {
        setSelectedWorkspaces((prev) => [...prev, selectedOption]);
      }
    },
    [selectedWorkspaces]
  );

  let allOptions = useMemo(() => {
    return baseOptions.flatMap((option) => {
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
  }, [selectedWorkspaces]);

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
          data={allOptions}
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
