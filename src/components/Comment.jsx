import {
  Button,
  Flex,
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
  const { classes } = useStyle();
  const { comment, setComment } = props;

  const commentRef = useRef();

  const handleSave = () => {
    if (commentRef.current.value === "") return;
    setComment(commentRef.current.value);
  };
  const handleDelete = () => {
    setComment("");
    commentRef.current.value = "";
  };

  return (
    <Flex align="end" gap="sm">
      {comment === "" ? (
        <>
          <Textarea
            ref={commentRef}
            className={classes.commentInput}
            defaultValue={comment}
            label="Ajouter une remarque"
            placeholder="Votre remarque ici"
            autosize
            minRows={2}
          />
          <Stack spacing={5}>
            <Button size="xs" variant="light" onClick={handleSave}>
              sauvegarder
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Stack spacing={5} w="100%">
            <Text size="sm" color="neutral.6" weight="500">
              Remarque
            </Text>
            <Paper p="md" withBorder>
              <Text size="sm">{comment}</Text>
            </Paper>
          </Stack>
          <Button size="xs" variant="light" color="red" onClick={handleDelete}>
            supprimer
          </Button>
        </>
      )}
    </Flex>
  );
}

export default Comment;
