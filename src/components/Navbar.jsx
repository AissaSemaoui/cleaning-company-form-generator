import { Title, createStyles } from "@mantine/core";
import React from "react";

const useStyle = createStyles((theme) => ({
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100vw",
    padding: "10px 20px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
  },
}));

function Navbar({ Button }) {
  const { classes } = useStyle();

  return (
    <div className={classes.nav}>
      <Title order={2} size="h3">
        ClickCv
      </Title>
      {Button}
    </div>
  );
}

export default Navbar;
