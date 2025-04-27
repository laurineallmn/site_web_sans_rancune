const scenes = [{
        id: 'intro',
        description: "Introduction",
        timecode: '0:0:0:0', // 0 seconde
        //les choix que peut faire l'utilisateur
        choices: [
            { label: "Aller à la chambre", nextSceneId: "chambre" }, //ce choix redirigera vers la scene d'id "chambre"
            { label: "Aller à la cuisine", nextSceneId: "cuisine" }
        ]
    },
    {
        id: 'chambre',
        description: "Scène de la chambre",
        timecode: '0:1:0:0', // 1 min
        //les choix que peut faire l'utilisateur
        choices: [
            { label: "Regarder sous le lit", nextSceneId: "sous_lit" },
            { label: "Ouvrir l'armoire", nextSceneId: "armoire" }
        ]
    },
    {
        id: 'cuisine',
        description: "Scène de la cuisine",
        timecode: '0:2:0:0', // 2 minutes
        //les choix que peut faire l'utilisateur
        choices: [
            { label: "Prendre un couteau", nextSceneId: "couteau" },
            { label: "Manger une pomme", nextSceneId: "pomme" }
        ]
    },
    // etc...
];