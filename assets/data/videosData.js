/// EXEMPLE DU TABLEAU QU'IL FAUT FAIRE POUR ALLER FACILEMENT 
// VERS LE TIMECODE QUI NOUS INTERESSE
// ET AFFICHER LES QUESITON OU QTE AU BON MOMENT


// export default videosData = [
const videosData = [
    //////////: BUREAU ////////////
    {
        id: 'chambre',
        description: "Scène de la chambre",
        timecode: '0:0:0:0', // 0 min
        timecode_fin_scene: "",
        timecode_jump_next_scene: "", //les questions me feront directement aller sur la nextscene
        timecode_display_question: '0:02:13:00', //display suelement si QTE reussi
        timecode_remove_question: '0:02:19:00',
        timecode_display_qte: '0:1:17:0',
        timecode_remove_qte: '0:1:18:0',
        // uniquement si QTE reussi
        question: 'Que souhaitez-vous visionner ?',
        choices: [
            //uniquement si QTE reussi
            { label: "L'historique des recherches", timecode_jump: "0:02:23:30" },
            { label: "Les caméra de surveillance", timecode_jump: "0:02:47:40" },
        ],
        default_answer: "Les caméras de surveillance", //pas utilie au final je pense
        default_timecode_jump: "0:02:47:40",
        keyboard: [
            //si QTE reussi
            { label: "P", timecode_jump: "" } // pas besoin de next scene comme c'est deja a la suite
        ],
        //si QTE pas reussi :
        fail_next_scene_timecode: "0:1:37:00" //chambre-apres-QTE-fenetre
    },
    {
        id: 'chambre-apres-QTE-fenetre',
        description: "si QTE fenetre de la chambre pas reussi",
        timecode: '0:1:36:30',
        timecode_fin_scene: "",
        timecode_jump_next_scene: "",
        timecode_display_question: '0:02:13:00',
        timecode_remove_question: '0:02:19:00',
        timecode_display_qte: '',
        timecode_remove_qte: '',
        //les choix que peut faire l'utilisateur
        //peut etre rajouter localisation des quesitons sur la page 
        question: 'Que souhaitez-vous visionner ?',
        choices: [
            { label: "L'historique des recherches", timecode_jump: "0:02:23:30" },
            { label: "Les caméras de surveillance", timecode_jump: "0:02:47:40" },
        ],
        //si aucun clique sur la question : 
        default_answer: "Les caméras de surveillance", //pas utilie au final je pense
        default_timecode_jump: "0:02:47:40",
        //peut etre rajouter localisation du QTE 
        keyboard: [],
        fail_next_scene_timecode: ""
    },

    {
        id: 'chambre-historique-recherche',
        description: "choix regarder historique des recherches",
        timecode: '0:02:23:30',
        timecode_fin_scene: "0:02:41:00", //quand on arrive a la fin de la scene on va au timecode_jump
        timecode_jump_next_scene: "0:4:43:30", //une fois scene fini aller a une scene plus loin (ici la fin de la chambre)
        timecode_display_question: '',
        timecode_remove_question: '',
        timecode_display_qte: '',
        timecode_remove_qte: '',
        question: '',
        //peut etre rajouter localisation des quesitons sur la page 
        choices: [],
        default_answer: "",
        default_timecode_jump: "",
        //peut etre rajouter localisation du QTE 
        keyboard: [],
        fail_next_scene_timecode: ""
    },

    {
        id: 'chambre-camera-surveillance',
        description: "choix regarder camera de surveillance",
        timecode: '0:02:47:40',
        timecode_fin_scene: "0:04:43:00",
        timecode_jump_next_scene: "0:04:43:30", //une fois scene fini aller a une scene plus loin (ici la fin de la chambre)
        timecode_display_question: '',
        timecode_remove_question: '',
        timecode_display_qte: '',
        timecode_remove_qte: '',
        question: '',
        //peut etre rajouter localisation des quesitons sur la page 
        choices: [],
        default_answer: "",
        default_timecode_jump: "",
        //peut etre rajouter localisation du QTE 
        keyboard: [],
        fail_next_scene_timecode: ""
    },
    {
        id: 'chambre-fin',
        description: "fin scene de la chambre",
        timecode: '0:4:43:30', // pas besoin du time code c'est a la suite
        timecode_fin_scene: "0:04:52:00",
        timecode_jump_next_scene: "",
        timecode_display_question: '0:04:45:00',
        timecode_remove_question: '0:04:52:00',
        timecode_display_qte: '',
        timecode_remove_qte: '',
        question: 'Vous avez fini d investiguer cette pièce où voulez-vous aller ?',
        //les choix que peut faire l'utilisateur
        choices: [
            { label: "Bureau", timecode_jump: "?" },
            { label: "Sous-sol", timecode_jump: "?" },
            { label: "Salle-de-bain", timecode_jump: "?" },
            { label: "Commissariat", timecode_jump: "?" }
        ],
        default_answer: "Commissariat",
        default_timecode_jump: "?",
        keyboard: [],
        fail_next_scene_timecode: ""
    },

    ////////////////////////////:
    ///////////////////////////
    ///////////TEMPLATES ////////:

    //////////: SALLE DE BAIN ////////////
    {
        id: 'salle-de-bain', //tout le temps remplir
        description: "debut scene salle de bain", //tout le temps remplir
        timecode: '0:00:00:00', //tout le temps remplir
        timecode_fin_scene: "0:00:00:00", //remplir suelement si aucun QTE ou choix 
        timecode_jump_next_scene: "", //remplir suelement si aucun QTE ou choix 
        timecode_display_question: '', //remplir si question et choix et default_answer et default_timecode_jump
        timecode_remove_question: '', //remplir si question et choix default_answer et default_timecode_jump
        timecode_display_qte: '', //remplir si qte (keyboard) et fail_next_scene_timecode
        timecode_remove_qte: '', //remplir si qte (keyboard) et fail_next_scene_timecode
        question: '',
        //peut etre rajouter localisation des quesitons sur la page 
        choices: [
            { label: "", timecode_jump: "" },
            { label: "", timecode_jump: "" },
            { label: "", timecode_jump: "" },
            { label: "", timecode_jump: "" }
        ],
        default_answer: "",
        default_timecode_jump: "",
        //peut etre rajouter localisation du QTE 
        keyboard: [
            { label: "", timecode_jump: "" }

        ],
        fail_next_scene_timecode: ""
    },

    //////////: BUREAU ////////////

    {
        id: 'bureau',
        description: "debut scene bureau",
        timecode: '0:00:00:00',
        timecode_fin_scene: "0:00:00:00",
        timecode_jump_next_scene: "0:00:00:00", //une fois scene fini aller a une scene plus loin
        timecode_display_question: '',
        timecode_remove_question: '',
        timecode_display_qte: '',
        timecode_remove_qte: '',
        question: '',
        //peut etre rajouter localisation des quesitons sur la page 
        choices: [
            { label: "", timecode_jump: "" },
            { label: "", timecode_jump: "" },
            { label: "", timecode_jump: "" },
            { label: "", timecode_jump: "" }
        ],
        default_answer: "",
        default_timecode_jump: "",
        //peut etre rajouter localisation du QTE 
        keyboard: [
            { label: "", timecode_jump: "" }

        ],
        fail_next_scene_timecode: ""
    },

    //////////: SOUS SOL ////////////
    {
        id: 'sous-sol',
        description: "debut scene sous sol",
        timecode: '0:00:00:00',
        timecode_fin_scene: "0:00:00:00",
        timecode_jump_next_scene: "sous-sol-fin", //une fois scene fini aller a une scene plus loin
        timecode_display_question: '',
        timecode_remove_question: '',
        timecode_display_qte: '',
        timecode_remove_qte: '',
        question: '',
        //peut etre rajouter localisation des quesitons sur la page 
        choices: [
            { label: "", timecode_jump: "" },
            { label: "", timecode_jump: "" },
            { label: "", timecode_jump: "" },
            { label: "", timecode_jump: "" }
        ],
        default_answer: "",
        default_timecode_jump: "",
        //peut etre rajouter localisation du QTE 
        keyboard: [
            { label: "", timecode_jump: "" }

        ],
        fail_next_scene_timecode: ""
    },



    //////////: LOUIS ////////////
    //////////: ARTHUR ////////////
    //////////: SARAH ////////////
    //////////: MATHIEU ////////////

    //ajouter les autres
];


export default videosData;