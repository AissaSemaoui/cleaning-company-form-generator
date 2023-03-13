const defaultSoilType = "Carellage";

const frequencyOptions = [
  { label: "H", value: "H" }, // Hebdomadaire
  { label: "M", value: "M" }, // Mensuelle
  { label: "BM", value: "BM" }, // Bi-mensuelle
  { label: "T", value: "T" }, // Trimestrielle
  { label: "A", value: "A" }, // Annuelle
];

const floorType = [
  "Lino",
  "Carellage",
  "Parquet",
  "Tomette",
  "Béton",
  "Sol particulier",
];

const workspacesOptions = [
  {
    label: "Bureau",
    value: "Bureau",
    tasks: [
      { task: "Nettoyage de bureau" },
      { task: "Nettoyage des sanitaires" },
      { task: "Nettoyage des vitres" },
      { task: "Nettoyage des sols" },
      { task: "Nettoyage des meubles" },
      { task: "Nettoyage des appareils électriques" },
      { task: "Nettoyage des poubelles" },
    ],
  },
  {
    label: "Salle de réunion",
    value: "Salle de réunion",
    tasks: [
      { task: "Nettoyage des sanitaires" },
      { task: "Nettoyage des vitres" },
      { task: "Nettoyage des sols" },
      { task: "Nettoyage des meubles" },
      { task: "Nettoyage des appareils électriques" },
      { task: "Nettoyage des poubelles" },
    ],
  },
];

export { workspacesOptions, frequencyOptions, floorType, defaultSoilType };
