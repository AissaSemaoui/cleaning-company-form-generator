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

const toolsOptions = ["brush", "Produits", "l'eau"];

const workspacesOptions = [
  {
    label: "SALON",
    value: "SALON",
    tasks: [
      { task: "Aération" },
      {
        task: "Vidage des corbeilles, changement des sacs et respect du tri sélectif",
      },
      { task: "Nettoyage de la vitrerie" },
      {
        task: "Dépoussiérage des dessus des luminaires à l’aide d’une tête de loup",
      },
      {
        task: "Nettoyage des pieds de chaises et de bureaux à l’exception des écrans et claviers d’ordinateurs",
      },
      { task: "Nettoyage des téléphones" },
      { task: "Désinfection de la main courante des escaliers" },
      {
        task: "Dépoussiérage des dessus d’armoires accessibles et non encombrés",
      },
      {
        task: "Dépoussiérage des plinthes, convecteurs et extincteurs accessibles",
      },
      { task: "Dépoussiérage des piétements de mobiliers" },
      {
        task: "Nettoyage des recoins et éventuelles toiles d'araignées à l'aide d'une tête de loup",
      },
      { task: "Aspiration des sols lisses et du tapis d’entrée si nécessaire" },
      {
        task: "Balayage humide ou aspiration des sols lisses et du tapis d’entrée si nécessaire",
      },
      {
        task: "Lavage des sols lisses accessibles à l’aide d’un produit approprié",
      },
      {
        task: "Lavage des sols lisses accessibles à l’aide d’un produit approprié « BUREAU",
      },
    ],
  },
  {
    label: "CUISINE",
    value: "CUISINE",
    tasks: [
      {
        task: "Déversement des corbeilles, remplacement des sacs et triage sélectif des déchets",
      },
      {
        task: "Enlèvement des éventuelles toiles d’araignées accessibles à l’aide d’une tête de loup",
      },
      { task: "Nettoyage intérieur et extérieur du four à micro-ondes" },
      { task: "Nettoyage des dessus de plans de travail non encombrés" },
      { task: "Nettoyage et désinfection de l’évier non encombré" },
      {
        task: "Nettoyage de l’intérieur du réfrigérateur (vidé au préalable par vos soins)",
      },
      { task: "Astiquage de la robinetterie et des parties chromées" },
      {
        task: "Dépoussiérage des plinthes / convecteurs et extincteurs accessibles",
      },
      { task: "Dépoussiérage des piétements de mobiliers accessibles" },
      {
        task: "Nettoyage des sols lisses accessibles avec l’utilisation de produit adapté",
      },
      { task: "Nettoyage des pieds de chaises et de bureaux" },
      { task: "Nettoyage des plinthes" },
      { task: "Passage de l'aspirateur sur les sols textiles" },
      { task: "Nettoyage des sols thermoplastiques" },
      { task: "Nettoyage des sols carrelés" },
      { task: "Nettoyage des sols divers" },
    ],
  },
  {
    label: "SANITAIRE",
    value: "SANITAIRE",
    tasks: [
      {
        task: "Enlèvement des poubelles, remplacement des sacs poubelles et triage sélectif des déchets",
      },
      {
        task: "Dépoussiérage des distributeurs papier, savon et essuie-mains",
      },
      {
        task: "Nettoyage des miroirs",
      },
      {
        task: "Nettoyage et détartrage du lavabo et de la cuvette",
      },
      {
        task: "Nettoyage des robinetteries et miroirs",
      },
      {
        task: "Mise en place des fournitures sanitaires - fournie par le client",
      },
      {
        task: "Nettoyage des poignées de portes et interrupteurs électriques lavables",
      },
      {
        task: "Enlèvement des éventuelles traces sur la faïence murale et les portes accessibles et à hauteur d'homme",
      },
      {
        task: "Enlèvement des poussières des plinthes accessibles",
      },
      {
        task: "Dépoussiérage de hautes tuyauteries basses accessibles",
      },
      {
        task: "Lavage des sols à l'aide d'un détergent désinfectant approprié",
      },
    ],
  },
  {
    label: "CHAMBRE",
    value: "CHAMBRE",
    tasks: [
      {
        task: "Efficacité de vidage des corbeilles, enlèvement et remplacement des sacs, tri sélectif approprié",
      },
      {
        task: "Nettoyage de la vitrerie",
      },
      {
        task: "Nettoyage des luminaires avec une tête de loup",
      },
      {
        task: "Nettoyage des pieds de chaises et de bureaux à l’exception des écrans et claviers d’ordinateurs",
      },
      {
        task: "Désinfection des appareils mobiles",
      },
      {
        task: "Nettoyage de la main courante des escaliers",
      },
      {
        task: "Enlèvement de poussières au-dessus des armoires accessibles et non encombrés",
      },
      {
        task: "Nettoyage des extincteurs, convecteurs et plinthes",
      },
      {
        task: "Nettoyage des bases de mobiliers",
      },
      {
        task: "Une tête de loup pour l’enlèvement des éventuelles toiles d’araignées",
      },
      {
        task: "Balayage humide ou aspiration des sols lisses et du tapis d’entrée si nécessaire",
      },
      {
        task: "Nécessité d’une aspiration ou de balayage humide des sols lisses et du tapis",
      },
      {
        task: "Un produit approprié pour le lavage des sols lisses accessibles",
      },
      {
        task: "Un produit approprié “BUREAU” pour le nettoyage des sols lisses accessibles",
      },
    ],
  },

  {
    label: "HALL D'ENTRÉE",
    value: "HALL D'ENTRÉE",
    tasks: [
      { task: "Vidage des entrées et des placards, rangement des affaires." },
      {
        task: "Nettoyage la poussière et la saleté, passage de l'aspirateur sur le sol.",
      },
      {
        task: "Dépoussiérage des toiles d'araignées du plafond, des luminaires et la décoration murale.",
      },
      {
        task: "Nettoyage de tapis, paillassons et plinthes par aspiration ou nettoyage humide si nécessaire.",
      },
      {
        task: "Nettoyage du sol et du carrelage pour lui donner un éclat brillant.",
      },
      {
        task: "Utilisation d'un produit approprié pour un carrelage ou plancher de bois franc afin de rendre l'espace impeccable.",
      },
      {
        task: "Lavage des portes et fenêtres avec un chiffon chaud et humide et un savon doux.",
      },
      {
        task: "Utilisation d'une essence minérale pour éliminer les taches tenaces sur le revêtement.",
      },
      {
        task: "Désinfection des germes sur les poignées de porte, les interrupteurs d'éclairage, les crochets à clés, les meubles etc.",
      },
    ],
  },
  {
    label: "PARKING",
    value: "PARKING",
    tasks: [
      {
        task: "Enlèvement de la végétation indésirable qui jonche le parking.",
      },
      {
        task: "Enlèvement des déchets, saleté et tous les autres débris visibles et les mettre dans des sacs de vidage.",
      },
      {
        task: "Balayage des fissures et des nids de poule à l'aide d'une brosse métallique jusqu'à ce qu'ils soient exempts de sable ou de poussière.",
      },
      {
        task: "Enlèvement des tâches sur l'asphalte entraînant des moisissures avec les produits appropriés.",
      },
      {
        task: "Enlèvement de l'huile et liquide de voiture avec des produits de nettoyage sûrs et efficaces qui n'endommageront pas le parking.",
      },
      {
        task: "Nettoyage sous pression sur l'ensemble du parking en utilisant une méthode efficace sans prendre trop de temps.",
      },
      {
        task: "Utilisation d'eau chaude et des solutions de nettoyage appropriées pour l'asphalte pour éliminer les saletés tenaces et tout résidu de tache.",
      },
      {
        task: "Nettoyage avec un balai à poils raides pour enlever la saleté ou débris qui s'accrochent à l'asphalte.",
      },
    ],
  },
  {
    label: "PROFESSIONNEL",
    value: "PROFESSIONNEL",
    tasks: [
      {
        task: "Ramassage des débris et de papier et les mettre dans la poubelle.",
      },
      { task: "Vidage et nettoyage des poubelles." },
      {
        task: "Remplacement des sacs-poubelles remplis par des sacs neufs propres.",
      },
      { task: "Passage de l'aspirateur sur le sol et sur les tapis." },
      {
        task: "Nettoyage des taches et des empreintes digitales des fenêtres et des miroirs.",
      },
      { task: "Nettoyage des sols et des meubles de la réception." },
      {
        task: "Rangement des magazines, des dépliants, des brochures et les livres.",
      },
      {
        task: "Dépoussiérage et nettoyage des meubles de bureau tels que les classeurs, les bureaux, les étagères, les murs des cabines, etc",
      },
      {
        task: "Essuyage avec un chiffon en microfibre et d'un spray désinfectant de tous les accessoires et les appareils électroniques : téléphones, ordinateurs, moniteurs et les claviers, etc.",
      },
      {
        task: "Dépoussiérage des montants de porte et des rebords de fenêtre, les bouches de chauffage, les rebords, etc.",
      },
      {
        task: "Désinfection des toilettes en frottant les cuvettes des toilettes avec une brosse à toilettes et des nettoyants désinfectants.",
      },
      {
        task: "Rechargement des serviettes en papier, des rouleaux de papier hygiénique, des distributeurs de savon, etc.",
      },
      {
        task: "Nettoyage des sèche-mains, des distributeurs de serviettes en papier et des autres objets fixés au mur.",
      },
      {
        task: "Pulvérisation des sols à l'aide d'une polisseuse ou d'une machine à plancher pour raviver l'aspect « mouillé » de la surface.",
      },
      {
        task: "Nettoyage des zones tâches sur la moquette, des paillassons, des tapis de passage ou des tissus d'ameublement.",
      },
    ],
  },
  {
    label: "ENTREPÔT",
    value: "ENTREPÔT",
    tasks: [
      {
        task: "Enlèvement des débris visibles et les mettre dans des sacs-poubelles",
      },
      {
        task: "Remplacement des sacs-poubelles remplis par des sacs neufs propres",
      },
      { task: "Balayage du sol pour enlever la poussière et autres débris" },
      { task: "Nettoyage de chevrons et dépoussiérage" },
      { task: "Nettoyage des rayonnages à palettes" },
      {
        task: "Nettoyage des zones élevées et difficile d'accès à l'aide d'un plumeau",
      },
      {
        task: "Enlèvement des graisses sur le sol à l'aide des produits adaptés",
      },
      {
        task: "Rangement et stockage de fournitures pour les rendre accessibles",
      },
      { task: "Passage de l'aspirateur sur les sols et table et chaise" },
      {
        task: "Récurage de sol d'entrepôt avec la machine adéquate pour faire briller le sol",
      },
      {
        task: "Aspiration et nettoyage des tapis et moquettes sur la devanture",
      },
      { task: "Essuyage des portes et fenêtres" },
      { task: "Nettoyage des vitres et miroir" },
      { task: "Désinfection de toutes les poignées de porte" },
      {
        task: "Remplissage des distributeurs de savon et remplacement des rouleaux d'essuie-tout vides",
      },
      { task: "Nettoyage haute pression pour l'extérieur de l'entrepôt." },
    ],
  },
  {
    label: "ÉVÉNEMENTIEL",
    value: "ÉVÉNEMENTIEL",
    tasks: [
      { task: "Vidage régulier des poubelles durant l'évènement" },
      { task: "Assurance de tout type d'urgence de maintenance" },
      {
        task: "Approvisionnement et nettoyage des salles de bain et toilettes à tout moment",
      },
      { task: "Garder le sol propre et exempt de débris" },
      { task: "Planification de toute urgence de nettoyage" },
      { task: "Vidage et nettoyage des poubelles" },
      { task: "Essuyage des comptoirs et des éviers" },
      { task: "Remplacement toutes les doublures" },
      { task: "Nettoyage des taches collantes" },
      {
        task: "Nettoyage des empreintes digitales des invités sur les miroirs et les fenêtres",
      },
      { task: "Ramassage des débris" },
      { task: "Aspiration et nettoyage des sols" },
      { task: "Nettoyage des tables et des chaises" },
      { task: "Pliage et rangement des tables et des chaises" },
      { task: "Nettoyage du barbecue et de la cuisine extérieure" },
      { task: "Enlèvement de toutes les décorations" },
      { task: "Nettoyage de la terrasse" },
      {
        task: "Désinfection des poignées de portes et les surfaces les plus touchées par les mains des invités",
      },
    ],
  },
  {
    label: "CUISINE RESTAURANT",
    value: "CUISINE RESTAURANT",
    tasks: [
      {
        task: "Lavage des murs et le plafond pour éliminer l'accumulation de graisse",
      },
      {
        task: "Nettoyage du gril, plaque chauffante, cuisinière, dessus plat et la friteuse, fours, la porte et les grilles, etc.",
      },
      {
        task: "Essuyage de tous les équipements tels que les cafetières, les micro-ondes, les grille-pain et les trancheuses à viande",
      },
      {
        task: "Désinfection des surfaces de la zone de préparation avec des produits désinfectants de surface",
      },
      {
        task: "Nettoyage des têtes de distributeurs de boissons dans les fontaines à soda et les bars doivent nettoyer les pointes des pistolets à soda",
      },
      {
        task: "Nettoyage et désinfection des chambre-réfrigérateur et chambre-congélateur",
      },
      { task: "Nettoyage et désinfection de toutes machines industrielles." },
      {
        task: "Lavage de tous les ustensiles, les petits articles, les couverts et la verrerie, etc.",
      },
      { task: "Nettoyage et désinfection des éviers." },
      {
        task: "Remplissage des distributeurs de savon et remplacement des rouleaux d'essuie-tout vides",
      },
      {
        task: "Balayage et désinfection des réfrigérateurs, congélateurs et les zones de stockage",
      },
      {
        task: "Désinfection de la zone d'élimination des déchets et nettoyage des poubelles",
      },
      {
        task: "Balayage et nettoyage des sols avec des produits d'entretien de sols",
      },
      { task: "Détartrage des éviers et robinets" },
      { task: "Nettoyage et aspiration des tapis." },
      { task: "Débouchage de toutes les obstructions" },
      { task: "Nettoyage et désinfection de la machine à glace" },
      { task: "Vidage des bacs à graisse" },
      { task: "Lavage des hottes de ventilation" },
      { task: "Remplacement des pièges à nuisibles" },
    ],
  },
];

export {
  workspacesOptions,
  frequencyOptions,
  floorType,
  defaultSoilType,
  toolsOptions,
};
