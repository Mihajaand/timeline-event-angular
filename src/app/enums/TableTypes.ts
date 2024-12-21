export const AllTableTypes = [
  {name: "B1", file: 'B1.png', nbPlaces: 4, type: 'B', typeText: 'bar', variante: 0},
  {name: "C21", file: 'C21.png', nbPlaces: 2, type: 'C', typeText: 'carre', variante: 0},
  {name: "C41", file: 'C41.png', nbPlaces: 4, type: 'C', typeText: 'carre', variante: 0},
  {name: "C61", file: 'C61.png', nbPlaces: 6, type: 'C', typeText: 'carre', variante: 0},
  {name: "C81", file: 'C81.png', nbPlaces: 8, type: 'C', typeText: 'carre', variante: 0},
  {name: "R21", file: 'R21.png', nbPlaces: 2, type: 'R', typeText: 'rond', variante: 0},
  {name: "R3", file: 'R3.png', nbPlaces: 3, type: 'R', typeText: 'rond', variante: 0},
  {name: "R4", file: 'R4.png', nbPlaces: 4, type: 'R', typeText: 'rond', variante: 0},
  {name: "R6", file: 'R6.png', nbPlaces: 6, type: 'R', typeText: 'rond', variante: 0},
  {name: "R8", file: 'R8.png', nbPlaces: 8, type: 'R', typeText: 'rond', variante: 0},
  {name: "MUR", file: 'M1.png', nbPlaces: 1, type: 'M', typeText: 'mur', variante: 0, textColor: 'white'},
  {name: "P1", file: 'P1.png', nbPlaces: 1, type: 'P', typeText: 'plante', variante: 0},
  {name: "P2", file: 'P2.png', nbPlaces: 2, type: 'P', typeText: 'plante', variante: 0},
  {name: "S2", file: 'S2.png', nbPlaces: 2, type: 'S', typeText: 'salon', variante: 0},
  {name: "S1", file: 'S1.png', nbPlaces: 1, type: 'S', typeText: 'salon', variante: 0},
  {name: "N1", file: 'N1.png', nbPlaces: 2, type: 'N', typeText: 'piscine', variante: 0},
  {name: "E1", file: 'E1.png', nbPlaces: 1, type: 'E', typeText: 'Escalier', variante: 0},
  {name: "O1", file: 'O1.png', nbPlaces: 1, type: 'O', typeText: 'Piano', variante: 0},
  {name: "T1", file: 'T1.png', nbPlaces: 1, type: 'T', typeText: 'Toilettes', variante: 0},
  {name: "F1", file: 'F1.png', nbPlaces: 1, type: 'F', typeText: 'Flèche', variante: 0},
  {name: "F2", file: 'F2.png', nbPlaces: 2, type: 'F', typeText: 'Flèche', variante: 0},
  {name: "F3", file: 'F3.png', nbPlaces: 3, type: 'F', typeText: 'Flèche', variante: 0},
  {name: "F4", file: 'F4.png', nbPlaces: 4, type: 'F', typeText: 'Flèche', variante: 0},
  {name: "X1", file: 'X1.png', nbPlaces: 4, type: 'X', typeText: 'Texte', variante: 0},
];

export const GridLeftMenu = [
  {
    name: "Tables carrées",
    buttons: [
      {name: "C21", file: 'C21.png', nbPlaces: 2, type: 'C', typeText: 'carre', variante: 0},
      {name: "C41", file: 'C41.png', nbPlaces: 4, type: 'C', typeText: 'carre', variante: 0},
      {name: "C61", file: 'C61.png', nbPlaces: 6, type: 'C', typeText: 'carre', variante: 0},
      {name: "C81", file: 'C81.png', nbPlaces: 8, type: 'C', typeText: 'carre', variante: 0},
    ]
  },
  {
    name: "Tables rondes",
    buttons: [
      {name: "R21", file: 'R21.png', nbPlaces: 2, type: 'R', typeText: 'rond', variante: 0},
      {name: "R3", file: 'R3.png', nbPlaces: 3, type: 'R', typeText: 'rond', variante: 0},
      {name: "R4", file: 'R4.png', nbPlaces: 4, type: 'R', typeText: 'rond', variante: 0},
      {name: "R6", file: 'R6.png', nbPlaces: 6, type: 'R', typeText: 'rond', variante: 0},
      {name: "R8", file: 'R8.png', nbPlaces: 8, type: 'R', typeText: 'rond', variante: 0},
    ]
  },
  {
    name: "Bar",
    buttons: [
      /*{name: "B1", file: 'B1.png', nbPlaces: 4, type: 'B', typeText: 'bar', variante: 0},
      {name: "B2", file: 'B2.png', nbPlaces: 12, type: 'BT', typeText: 'bar T', variante: 0},
      {name: "B3", file: 'B3.png', nbPlaces: 4, type: 'BU', typeText: 'bar U', variante: 0},
      {name: "B4", file: 'B4.png', nbPlaces: 4, type: 'BO', typeText: 'bar O', variante: 0},
      {name: "B4", file: 'B4.png', nbPlaces: 4, type: 'BO', typeText: 'bar O', variante: 0},*/
      {name: "B1", file: 'B1.png', nbPlaces: 1, type: 'BG', typeText: 'Ligne de bar', variante: 0},
      {name: "B2", file: 'B1.png', nbPlaces: 1, type: 'BC', typeText: 'Chaise de bar', variante: 0},
    ]
  },
  {
    name: "Decorations",
    buttons: [
      {name: "MUR", file: 'M1.png', nbPlaces: 1, type: 'M', typeText: 'mur', variante: 0, textColor: 'white'},
      {name: "P1", file: 'P1.png', nbPlaces: 1, type: 'P', typeText: 'plante', variante: 0},
      {name: "P2", file: 'P2.png', nbPlaces: 1, type: 'P', typeText: 'plante', variante: 0},
      {name: "F1", file: 'F1.png', nbPlaces: 1, type: 'F', typeText: 'Flèche', variante: 0},
      {name: "F2", file: 'F2.png', nbPlaces: 2, type: 'F', typeText: 'Flèche', variante: 0},
      {name: "F3", file: 'F3.png', nbPlaces: 3, type: 'F', typeText: 'Flèche', variante: 0},
      {name: "F4", file: 'F4.png', nbPlaces: 4, type: 'F', typeText: 'Flèche', variante: 0},
      {name: "N1", file: 'N1.png', nbPlaces: 2, type: 'N', typeText: 'piscine', variante: 0},
      {name: "E1", file: 'E1.png', nbPlaces: 1, type: 'E', typeText: 'Escalier', variante: 0},
      {name: "T1", file: 'T1.png', nbPlaces: 1, type: 'T', typeText: 'Toilettes', variante: 0},
      {name: "X1", file: 'X1.png', nbPlaces: 4, type: 'X', typeText: 'Texte', variante: 0},
    ]
  },
  {
    name: "Salon",
    buttons: [

      {name: "S2", file: 'S2.png', nbPlaces: 2, type: 'S', typeText: 'salon', variante: 0},
      {name: "S1", file: 'S1.png', nbPlaces: 1, type: 'S', typeText: 'salon', variante: 0},
      {name: "O1", file: 'O1.png', nbPlaces: 1, type: 'O', typeText: 'Piano', variante: 0},
    ]
  }
];
