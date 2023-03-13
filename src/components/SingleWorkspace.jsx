import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../utils/globalContext";
import { Box } from "@mantine/core";
import WorkspaceTable from "./WorkspaceTable";
import Comment from "./Comment";
import DropFiles from "./DropFiles";
import { defaultSoilType } from "../utils/data";
import { useDidUpdate } from "@mantine/hooks";

function SingleWorkspace({ tasks, id }) {
  const { setWorkspaces, workspaces } = useGlobalContext();

  const [selectedTasks, setSelectedTasks] = useState([]);
  const [images, setImages] = useState([]);
  const [comment, setComment] = useState("");

  console.log("workspaces inside single workspace: ", workspaces);

  useEffect(() => {
    const currentWorkspace = workspaces.find(
      (workspace) => workspace.id === id
    );
    setSelectedTasks(currentWorkspace?.selectedTasks || []);
  }, []);

  useDidUpdate(() => {
    const data = {
      id,
      selectedTasks,
      images,
      comment,
      soilType: defaultSoilType,
    };
    setWorkspaces((prev) => {
      const workspaceIndex = prev.findIndex((workspace) => workspace.id === id);
      if (workspaceIndex !== -1) {
        prev[workspaceIndex] = data;
      } else {
        prev.push(data);
      }
      return [...prev];
    });
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
          tasks={tasks}
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
}

export default SingleWorkspace;
