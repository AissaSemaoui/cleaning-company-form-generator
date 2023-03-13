import React, { useState } from "react";
import {
  Button,
  Flex,
  Group,
  MultiSelect,
  NumberInput,
  Paper,
  Select,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useGlobalContext } from "../utils/globalContext";

const useStyle = createStyles((theme) => ({
  input: {
    minWidth: 280,
    maxWidth: "100%",
    width: "49%",
  },
}));

const GeneralInfo = () => {
  const { setGeneralInfo } = useGlobalContext();
  const [disabled, setDisabled] = useState(false);
  const { classes } = useStyle();

  const defaultGeneralInfo = {
    fullName: "", // nom
    contactInfo: "", // email / tel
    surface: "", // m²
    roomCount: "", // nombre de pièces
    preferredDays: [], // jours d'intervention souhaitée
    spaceType: "", // professionnel / particulier
    serviceFrequency: "", // ponctuel / recurrent
  };

  const form = useForm({
    initialValues: defaultGeneralInfo,
  });

  const handleSubmit = (values) => {
    setGeneralInfo(values);
    setDisabled(true);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setDisabled(false);
  };
  console.log(disabled);

  return (
    <Paper shadow="xs" mt="3rem" p="md" bg="background.1">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Title order={2} weight={500} pb="md">
          General Info
        </Title>
        <Flex gap="md" direction="column">
          <Group noWrap={false} grow>
            <TextInput
              placeholder="Your name"
              label="Full name"
              name="fullName"
              className={classes.input}
              withAsterisk
              disabled={disabled}
              {...form.getInputProps("fullName")}
            />
            <TextInput
              placeholder="Téléphone  / Email du contact"
              label="Téléphone  / Email du contact"
              name="contactInfo"
              className={classes.input}
              withAsterisk
              disabled={disabled}
              {...form.getInputProps("contactInfo")}
            />
          </Group>
          <Group noWrap={false} grow>
            <NumberInput
              placeholder="m²"
              label="Surface"
              name="surface"
              className={classes.input}
              withAsterisk
              disabled={disabled}
              {...form.getInputProps("surface")}
            />
            <NumberInput
              placeholder="Nombre de pièces"
              label="Nombre de pièces"
              name="roomCount"
              className={classes.input}
              withAsterisk
              disabled={disabled}
              {...form.getInputProps("roomCount")}
            />
          </Group>
          <Group grow>
            <MultiSelect
              data={["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]}
              placeholder="jour d'intervention souhaitée"
              label="journée d'intervention souhaitée"
              name="preferredDays"
              className={classes.input}
              withAsterisk
              disabled={disabled}
              {...form.getInputProps("preferredDays")}
            />
            <Select
              data={["professionnel", "particulier"]}
              placeholder="professionnel / particulier"
              label="l'espace à nettoyer est-il"
              name="spaceType"
              className={classes.input}
              withAsterisk
              disabled={disabled}
              {...form.getInputProps("spaceType")}
            />
          </Group>
          <Group grow>
            <Select
              data={["ponctuel", "recurrent"]}
              placeholder="ponctuel / recurrent"
              label="le nettoyage est-il"
              name="serviceFrequency"
              className={classes.input}
              withAsterisk
              disabled={disabled}
              {...form.getInputProps("serviceFrequency")}
            />
          </Group>
          <Group position="right">
            {disabled ? (
              <Button type="button" onClick={handleEdit}>
                Edit
              </Button>
            ) : (
              <Button type="submit">Ajouter</Button>
            )}
          </Group>
        </Flex>
      </form>
    </Paper>
  );
};

export default GeneralInfo;
