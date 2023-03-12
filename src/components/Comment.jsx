import {
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Textarea,
  createStyles,
} from "@mantine/core";
import React, { useRef } from "react";

const useStyle = createStyles((theme) => ({
  commentInput: {
    width: "100%",
  },
}));

function Comment(props) {
  const { comment, setComment } = props;
  const { classes } = useStyle();

  const commentRef = useRef();

  const handleSave = () => setComment(commentRef.current.value);
  const handleDelete = () => {
    setComment("");
    commentRef.current.value = "";
  };

  console.log(comment);

  return (
    <Flex align="end" gap="sm">
      {comment === "" ? (
        <>
          <Textarea
            ref={commentRef}
            className={classes.commentInput}
            label="Ajouter un commentaire"
            placeholder="Ajouter un commentaire"
            autosize
            minRows={2}
          />
          <Stack spacing={5}>
            <Button size="xs" variant="light" onClick={handleSave}>
              Save
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Stack spacing={5} w="100%">
            <Text size="sm" color="neutral.6" weight="500">
              Commentaire
            </Text>
            <Paper p="md" withBorder>
              <Text size="sm">{comment}</Text>
            </Paper>
          </Stack>
          <Button size="xs" variant="light" color="red" onClick={handleDelete}>
            delete
          </Button>
        </>
      )}
    </Flex>
  );
}

export default Comment;
