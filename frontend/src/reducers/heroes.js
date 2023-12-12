const initialState = {
  heroes: [
    {
      id: "cafc11d6-9b23-42d2-8478-79a04e196864",
      name: "Nikita Torbinskiy",
      description: "234",
      element: "wind",
    },
    {
      id: "99d8d1be-4bf1-4bdb-b96c-094cddd4d1ac",
      name: "Петя",
      description: "играть",
      element: "wind",
    },
    {
      id: "b4489de8-9c82-49af-ad31-e6f9094f86bf",
      name: "ошибка природы",
      description: "кирилл ",
      element: "water",
    },
    {
      id: "6ad44415-7818-4be1-bc39-1fcead08eedb",
      name: "Nikita Torbinskiy",
      description: "234",
      element: "fire",
    },
  ],
  heroesLoadingStatus: "idle",
};

const heroes = (state = initialState, action) => {
  switch (action.type) {
    // case 'HEROES_FETCHING':
    // 	return {
    // 		...state,
    // 		heroesLoadingStatus: 'loading'
    // 	}
    // case 'HEROES_FETCHED':
    // 	return {
    // 		...state,
    // 		heroes: action.payload,
    // 		heroesLoadingStatus:  idle
    // 	}
    // case 'HEROES_FETCHING_ERROR':
    // 	return {
    // 		...state,
    // 		heroesLoadingStatus: 'error'
    // 	}
    case "HERO_CREATED":
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };
    case "HERO_DELETED":
      return {
        ...state,
        heroes: state.heroes.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default heroes;
