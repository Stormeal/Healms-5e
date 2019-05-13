export let settings = {
  columns: {
    init: {
      title: 'Initiate',
      filter: true,
      width: '100px'
    },
    name: {
      title: 'Full Name',
      filter: true
    },
    AC: {
      title: 'AC',
      filter: true,
      width: '100px'

    },
    conditions: {
      title: 'Conditions',
      filter: true,
      editor: {
        type: 'list',
        config: {
          selectText: '-',
          list: [
            { value: '-', title: '-' },
            { value: 'Blinded', title: 'Blinded' },
            { value: 'Charmed', title: 'Charmed' },
            { value: 'Deafened', title: 'Deafened' },
            { value: 'Frightened', title: 'Frightened' },
            { value: 'Grappled', title: 'Grappled' },
            { value: 'Incapacitated', title: 'Incapacitated' },
            { value: 'Invisible', title: 'Invisible' },
            { value: 'Paralyzed', title: 'Paralyzed' },
            { value: 'Poisoned', title: 'Poisoned' },
            { value: 'Prone', title: 'Prone' },
            { value: 'Restrained', title: 'Restrained' },
            { value: 'Stunned', title: 'Stunned' },
            { value: 'Unconscious', title: 'Unconscious' },
          ]
        }
      }
    },
    kills: {
      title: 'Kills',
      filter: true,
      width: '100px'

    }
  },
  edit: {
    editButtonContent: '<i class="fas fa-edit"></i>',
    saveButtonContent: '<i class="fas fa-save"></i>',
    cancelButtonContent: '<i class="fas fa-thumbs-down"></i>'
  },
  delete: {
    deleteButtonContent: '<i class="fas fa-trash-alt ml-auto"></i>',
    saveButtonContent: '<i class="fas fa-save ml-auto"></i>',
    cancelButtonContent: '<i class="fas fa-thumbs-down ml-auto"></i>'
  }
};

export let enemies = [
  {
    id: 9,
    init: 12,
    name: 'Bandit',
    AC: 13,
    conditions: '-',
    kills: '-'
  },
  {
    id: 1,
    init: 21,
    name: 'Idun Nordulf',
    AC: 15,
    conditions: '-',
    kills: 17
  },
  {
    id: 2,
    init: 15,
    name: 'Saga',
    AC: 14,
    conditions: '-',
    kills: 6
  },
  {
    id: 3,
    init: 13,
    name: 'Eldrun',
    AC: 15,
    conditions: '-',
    kills: 9
  },
  {
    id: 4,
    init: 4,
    name: 'Akatosh',
    AC: 20,
    conditions: '-',
    kills: 8
  },
  {
    id: 5,
    init: 10,
    name: 'Knud',
    AC: 16,
    conditions: '-',
    kills: 4
  },
  {
    id: 6,
    init: 11,
    name: 'Tiffany',
    AC: 17,
    conditions: '-',
    kills: 14
  },
  {
    id: 7,
    init: 3,
    name: 'Tyrun',
    AC: 15,
    conditions: '-',
    kills: 3
  },
  {
    id: 8,
    init: 5,
    name: 'Harl Toldasson',
    AC: 17,
    conditions: '-',
    kills: 2
  },
]


export let data = [
  {
    id: 1,
    init: 21,
    name: 'Idun Nordulf',
    AC: 15,
    conditions: '-',
    kills: 17
  },
  {
    id: 2,
    init: 15,
    name: 'Saga',
    AC: 14,
    conditions: '-',
    kills: 6
  },
  {
    id: 3,
    init: 13,
    name: 'Eldrun',
    AC: 15,
    conditions: '-',
    kills: 9
  },
  {
    id: 4,
    init: 4,
    name: 'Akatosh',
    AC: 20,
    conditions: '-',
    kills: 8
  },
  {
    id: 5,
    init: 10,
    name: 'Knud',
    AC: 16,
    conditions: '-',
    kills: 4
  },
  {
    id: 6,
    init: 11,
    name: 'Tiffany',
    AC: 17,
    conditions: '-',
    kills: 14
  },
  {
    id: 7,
    init: 3,
    name: 'Tyrun',
    AC: 15,
    conditions: '-',
    kills: 3
  },
  {
    id: 8,
    init: 5,
    name: 'Harl Toldasson',
    AC: 17,
    conditions: '-',
    kills: 2
  },
];
