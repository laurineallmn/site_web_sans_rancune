/// EXEMPLE DU TABLEAU QU'IL FAUT FAIRE POUR ALLER FACILEMENT 
// VERS LE TIMECODE QUI NOUS INTERESSE
// ET AFFICHER LES QUESITON OU QTE AU BON MOMENT

const scenes = [
    //////////: BUREAU ////////////
    {
        id: 'chambre',
        description: "Scène de la chambre",
        timecode: '0:0:0:0', // 0 min
        timecode_fin_scene: "",
        nextSceneId: "", //les questions me feront directement aller sur la nextscene
        timecode_display_question: '0:02:13:00', //display suelement si QTE reussi
        timecode_remove_question: '0:02:19:00',
        timecode_display_qte: '0:1:17:0',
        timecode_remove_qte: '0:1:19:0',
        // uniquement si QTE reussi
        question: 'Que souhaitez-vous visionner ?',
        choices: [
            //uniquement si QTE reussi
            { label: "L'historique des recherches", nextSceneId: "chambre-historique-recherche" },
            { label: "Les caméra de surveillance", nextSceneId: "chambre-camera-surveillance" },
        ],
        defaultAnswer: "",
        defaultNextSceneId: "",
        keyboard: [
            //si QTE reussi
            { label: "P", nextSceneId: "" } // pas besoin de next scene comme c'est deja a la suite
        ],
        //si QTE pas reussi :
        failNextSceneId: "chambre-apres-QTE-fenetre"
    },
    {
        id: 'chambre-apres-QTE-fenetre',
        description: "si QTE fenetre de la chambre pas reussi",
        timecode: '0:1:36:30',
        timecode_fin_scene: "",
        nextSceneId: "",
        timecode_display_question: '0:02:13:00',
        timecode_remove_question: '0:02:19:00',
        timecode_display_qte: '',
        timecode_remove_qte: '',
        //les choix que peut faire l'utilisateur
        //peut etre rajouter localisation des quesitons sur la page 
        question: 'Que souhaitez-vous visionner ?',
        choices: [
            { label: "L'historique des recherches", nextSceneId: "chambre-historique-recherche" },
            { label: "Les caméra de surveillance", nextSceneId: "chambre-camera-surveillance" },
        ],
        //si aucun clique sur la question : 
        defaultAnswer: "Historique",
        defaultNextSceneId: "chambre-historique-recherche",
        //peut etre rajouter localisation du QTE 
        keyboard: [],
        failNextSceneId: ""
    },

    {
        id: 'chambre-historique-recherche',
        description: "si QTE fenetre de la chambre pas reussi",
        timecode: '0:02:23:30',
        timecode_fin_scene: "0:02:41:00",
        nextSceneId: "chambre-fin", //une fois scene fini aller a une scene plus loin (ici la fin de la chambre)
        timecode_display_question: '',
        timecode_remove_question: '',
        timecode_display_qte: '',
        timecode_remove_qte: '',
        question: '',
        //peut etre rajouter localisation des quesitons sur la page 
        choices: [],
        defaultAnswer: "",
        defaultNextSceneId: "",
        //peut etre rajouter localisation du QTE 
        keyboard: [],
        failNextSceneId: ""
    },

    {
        id: 'chambre-camera-surveillance',
        description: "si QTE fenetre de la chambre pas reussi",
        timecode: '0:02:47:40',
        timecode_fin_scene: "0:04:43:00",
        nextSceneId: "chambre-fin", //une fois scene fini aller a une scene plus loin (ici la fin de la chambre)
        timecode_display_question: '',
        timecode_remove_question: '',
        timecode_display_qte: '',
        timecode_remove_qte: '',
        question: '',
        //peut etre rajouter localisation des quesitons sur la page 
        choices: [],
        defaultAnswer: "",
        defaultNextSceneId: "",
        //peut etre rajouter localisation du QTE 
        keyboard: [],
        failNextSceneId: ""
    },
    {
        id: 'chambre-fin',
        description: "fin scene de la chambre",
        timecode: '0:4:43:30', // pas besoin du time code c'est a la suite
        timecode_fin_scene: "0:04:52:00",
        nextSceneId: "",
        timecode_display_question: '',
        timecode_remove_question: '',
        timecode_display_qte: '',
        timecode_remove_qte: '',
        question: 'Vous avez fini d investiguer cette pièce où voulez-vous aller ?',
        //les choix que peut faire l'utilisateur
        choices: [
            { label: "Bureau", nextSceneId: "bureau" },
            { label: "Sous-sol", nextSceneId: "sous-sol" },
            { label: "Salle-de-bain", nextSceneId: "salle-de-bain" },
            { label: "Commissariat", nextSceneId: "commissariat" }
        ],
        defaultAnswer: "Commissariat",
        defaultNextSceneId: "commissariat",
        keyboard: [],
        failNextSceneId: ""
    },

    ////////////////////////////:
    ///////////////////////////
    ///////////TEMPLATES ////////:
    //////////: BUREAU ////////////

    {
        id: 'bureau',
        description: "debut scene bureau",
        timecode: '0:00:00:00',
        timecode_fin_scene: "0:00:00:00",
        nextSceneId: "bureau-fin", //une fois scene fini aller a une scene plus loin
        timecode_display_question: '',
        timecode_remove_question: '',
        timecode_display_qte: '',
        timecode_remove_qte: '',
        question: '',
        //peut etre rajouter localisation des quesitons sur la page 
        choices: [
            { label: "", nextSceneId: "" },
            { label: "", nextSceneId: "" },
            { label: "", nextSceneId: "" },
            { label: "", nextSceneId: "" }
        ],
        defaultAnswer: "",
        defaultNextSceneId: "",
        //peut etre rajouter localisation du QTE 
        keyboard: [
            { label: "", nextSceneId: "" }

        ],
        failNextSceneId: ""
    },
    //////////: SALLE DE BAIN ////////////
    {
        id: 'salle-de-bain',
        description: "debut scene salle de bain",
        timecode: '0:00:00:00',
        timecode_fin_scene: "0:00:00:00",
        nextSceneId: "salle_de_bain-fin", //une fois scene fini aller a une scene plus loin
        timecode_display_question: '',
        timecode_remove_question: '',
        timecode_display_qte: '',
        timecode_remove_qte: '',
        question: '',
        //peut etre rajouter localisation des quesitons sur la page 
        choices: [
            { label: "", nextSceneId: "" },
            { label: "", nextSceneId: "" },
            { label: "", nextSceneId: "" },
            { label: "", nextSceneId: "" }
        ],
        defaultAnswer: "",
        defaultNextSceneId: "",
        //peut etre rajouter localisation du QTE 
        keyboard: [
            { label: "", nextSceneId: "" }

        ],
        failNextSceneId: ""
    },
    //////////: SOUS SOL ////////////
    {
        id: 'sous-sol',
        description: "debut scene sous sol",
        timecode: '0:00:00:00',
        timecode_fin_scene: "0:00:00:00",
        nextSceneId: "sous-sol-fin", //une fois scene fini aller a une scene plus loin
        timecode_display_question: '',
        timecode_remove_question: '',
        timecode_display_qte: '',
        timecode_remove_qte: '',
        question: '',
        //peut etre rajouter localisation des quesitons sur la page 
        choices: [
            { label: "", nextSceneId: "" },
            { label: "", nextSceneId: "" },
            { label: "", nextSceneId: "" },
            { label: "", nextSceneId: "" }
        ],
        defaultAnswer: "",
        defaultNextSceneId: "",
        //peut etre rajouter localisation du QTE 
        keyboard: [
            { label: "", nextSceneId: "" }

        ],
        failNextSceneId: ""
    },



    //////////: LOUIS ////////////
    //////////: ARTHUR ////////////
    //////////: SARAH ////////////
    //////////: MATHIEU ////////////

    //ajouter les autres
];


// {
//     id: 'cuisine',
//     description: "Scène de la cuisine",
//     timecode: '0:2:0:0', // 2 minutes
//     timecode_display_question: '0:2:30:0',
//     //les choix que peut faire l'utilisateur
//     choices: [
//         { label: "Prendre un couteau", nextSceneId: "couteau" },
//         { label: "Manger une pomme", nextSceneId: "pomme" }
//     ]
// },