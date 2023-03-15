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
  Textarea,
  Title,
  createStyles,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useGlobalContext } from "../utils/globalContext";
import { useDidUpdate } from "@mantine/hooks";

const useStyle = createStyles((theme) => ({
  input: {
    minWidth: 280,
    maxWidth: "100%",
    width: "49%",
  },
  singleInput: {
    minWidth: 280,
    maxWidth: "100%",
    width: "49%",
    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      width: "100%",
    },
  },
}));

const GeneralInfo = () => {
  const { setGeneralInfo, generalInfo } = useGlobalContext();
  const [disabled, setDisabled] = useState(false);
  const { classes } = useStyle();

  const defaultGeneralInfo = {
    fullName: "", // nom
    contactInfo: "", // email / tel
    address: "", // adresse
    surface: "", // m²
    roomCount: "", // nombre de pièces
    preferredDays: [], // jours d'intervention souhaitée
    spaceType: "", // professionnel / particulier
    serviceFrequency: "", // ponctuel / recurrent
  };

  const form = useForm({
    initialValues: generalInfo || defaultGeneralInfo,
    validate: {
      fullName: (value) => (value.length > 0 ? null : "Nom est obligatoire"),
      contactInfo: (value) =>
        value.length > 0 ? null : "Téléphone ou email est obligatoire",
      address: (value) => (value.length > 0 ? null : "Adresse est obligatoire"),
      surface: (value) => (value > 0 ? null : "Surface est obligatoire"),
      roomCount: (value) =>
        value > 0 ? null : "Nombre de pièces est obligatoire",
      preferredDays: (value) =>
        value.length > 0
          ? null
          : "Jours d'intervention souhaitée est obligatoire",
      spaceType: (value) =>
        value.length > 0 ? null : "Type d'espace est obligatoire",
      serviceFrequency: (value) =>
        value.length > 0 ? null : "Fréquence de service est obligatoire",
    },
  });

  const handleSubmit = (values) => {
    setGeneralInfo(values);
    setDisabled(true);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setDisabled(false);
  };

  const isFormEmpty = () => {
    return (
      generalInfo.fullName === "" &&
      generalInfo.contactInfo === "" &&
      generalInfo.address === "" &&
      generalInfo.surface === "" &&
      generalInfo.roomCount === "" &&
      generalInfo.preferredDays.length === 0 &&
      generalInfo.spaceType === "" &&
      generalInfo.serviceFrequency === ""
    );
  };

  useDidUpdate(() => {
    if (isFormEmpty()) {
      setDisabled(false);
      form.reset();
    }
  }, [generalInfo]);

  return (
    <Paper shadow="xs" mt="3rem" p="md" bg="background.1">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Title order={2} weight={500} pb="md">
          Informations générales
        </Title>
        <Flex gap="md" direction="column">
          <Group noWrap={false} grow>
            <TextInput
              placeholder="ex: John Doe"
              label="Nom complet"
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
          <TextInput
            placeholder="ex: 12 rue de la paix, 75000 Paris"
            label="Adresse du lieu"
            name="address"
            mb="md"
            className={classes.singleInput}
            withAsterisk
            disabled={disabled}
            {...form.getInputProps("address")}
          />
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
              label="Journée d'intervention souhaitée"
              name="preferredDays"
              className={classes.input}
              withAsterisk
              disabled={disabled}
              {...form.getInputProps("preferredDays")}
            />
            <Select
              data={["professionnel", "particulier"]}
              placeholder="professionnel / particulier"
              label="L'espace à nettoyer est-il"
              name="spaceType"
              className={classes.input}
              withAsterisk
              disabled={disabled}
              {...form.getInputProps("spaceType")}
            />
          </Group>
          <Select
            data={["ponctuel", "recurrent"]}
            placeholder="ponctuel / recurrent"
            label="Le nettoyage est-il"
            name="serviceFrequency"
            className={classes.singleInput}
            withAsterisk
            disabled={disabled}
            {...form.getInputProps("serviceFrequency")}
          />
          <Group position="right">
            {disabled ? (
              <Button type="button" onClick={handleEdit}>
                Modifier
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
