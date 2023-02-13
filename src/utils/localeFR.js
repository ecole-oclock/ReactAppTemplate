import { locale } from '@o-clock-dev/mooncake';

export default {
  ...locale.fr_FR,
  Pagination: {
    ...locale.fr_FR.Pagination,
    jump_to: 'Aller à la page',
    page: '',
  },
  Table: {
    ...locale.fr_FR.Table,
    filterTitle: 'Filtrer',
    filterConfirm: 'Valider',
    filterReset: 'Réinitialiser',
    filterEmptyText: 'Aucun filtre',
    filterCheckall: 'Tout sélectionner',
    emptyText: 'Aucune donnée',
    selectAll: 'Sélectionner la page actuelle',
    selectNone: 'Réinitialiser',
    selectionAll: 'Tout sélectionner',
    sortTitle: 'Trier',
    expand: 'Développer',
    collapse: 'Réduire',
    triggerDesc: "Trier dans l'ordre descendant",
    triggerAsc: "Trier dans l'ordre ascendant",
    cancelSort: 'Annuler le tri',
    filterSearchPlaceholder: 'Rechercher',
  },
};
