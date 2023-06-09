import React, { useEffect, useState } from "react";
import { Box } from "@mantine/core";
import WorkspaceTable from "./WorkspaceTable";
import Comment from "./Comment";
import DropFiles from "./DropFiles";
import { defaultSoilType } from "../utils/data";

function SingleWorkspace({ tasks, id, currentWorkspace, setWorkspaces }) {
  const [selectedTasks, setSelectedTasks] = useState(
    currentWorkspace?.selectedTasks || []
  );
  const [images, setImages] = useState(currentWorkspace?.images || []);
  const [comment, setComment] = useState(currentWorkspace?.comment || "");

  useEffect(() => {
    const data = {
      id,
      selectedTasks,
      images,
      comment,
      soilType: defaultSoilType,
    };
    if (currentWorkspace) {
      currentWorkspace.id = id;
      currentWorkspace.selectedTasks = selectedTasks;
      currentWorkspace.comment = comment;
      currentWorkspace.images = images;
    } else {
      setWorkspaces((prev) => {
        prev.push(data);
        return prev;
      });
    }
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
          currentWorkspace={currentWorkspace}
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
