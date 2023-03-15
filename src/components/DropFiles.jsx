import React, { useRef, useState } from "react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Stack,
  createStyles,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { FiTrash2 } from "react-icons/fi";

const useStyle = createStyles((theme) => ({
  carouselImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
}));

function DropFiles(props) {
  const { images, setImages } = props;
  const { classes } = useStyle();
  const openRef = useRef(null);

  const getImageUrl = (image) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImages((prev) => [...prev, reader.result]);
    };
    reader.readAsDataURL(image);
  };

  const deleteImage = (currentImg) => {
    setImages((prev) => prev.filter((image) => image !== currentImg));
  };

  const hanldeDrop = (imageFiles) => {
    imageFiles.forEach((image) => getImageUrl(image));
  };

  return (
    <>
      <Dropzone
        openRef={openRef}
        onDrop={hanldeDrop}
        activateOnClick={true}
        accept={IMAGE_MIME_TYPE}
        styles={{ inner: { pointerEvents: "all" } }}
      >
        <Group position="center">
          <Button variant="subtle">Selectionner des images</Button>
        </Group>
      </Dropzone>
      <Box mt="sm">
        {images.length === 0 || (
          <Carousel
            slideSize="25%"
            height={200}
            align="start"
            slideGap="md"
            slidesToScroll="auto"
            breakpoints={[
              {
                maxWidth: "xs",
                slideSize: "50%",
              },
              {
                maxWidth: "sm",
                slideSize: "33%",
              },
              {
                maxWidth: "md",
                slideSize: "25%",
              },
            ]}
          >
            {images.map((image) => (
              <Carousel.Slide key={image}>
                <Stack justify="space-between" h="100%">
                  <Box
                    style={{
                      flexGrow: 1,
                      overflow: "hidden",
                    }}
                  >
                    <img src={image} className={classes.carouselImg} />
                  </Box>
                  <ActionIcon
                    color="red"
                    style={{
                      minHeight: "max-content",
                    }}
                    onClick={() => deleteImage(image)}
                  >
                    <FiTrash2 />
                  </ActionIcon>
                </Stack>
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
      </Box>
    </>
  );
}

export default DropFiles;
