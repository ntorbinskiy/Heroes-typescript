import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Hero } from "../../components/heroesAddForm/HeroesAddForm";

export type Loading = "idle" | "loading" | "error";

interface Heroes {
  heroes: Hero[];
  heroesLoadingStatus: Loading;
}

const initialState: Heroes = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

// case "HEROES_FETCHING":
//       return {
//         ...state,
//         heroesLoadingStatus: "loading",
//       };
//     case "HEROES_FETCHED":
//       return {
//         ...state,
//         heroes: action.payload,
//         heroesLoadingStatus: "idle",
//       };
//     case "HEROES_FETCHING_ERROR":
//       return {
//         ...state,
//         heroesLoadingStatus: "error",
//       };
//     case "HERO_CREATED":
//       return {
//         ...state,
//         heroes: [...state.heroes, action.payload],
//       };
//     case "HERO_DELETED":
//       return {
//         ...state,
//         heroes: state.heroes.filter((item) => item.id !== action.payload),
//       };

const heroesSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    heroCreated: (state, action: PayloadAction<Hero>) => ({
      ...state,
      heroes: [...state.heroes, action.payload],
    }),
    heroDeleted: (state, action: PayloadAction<number>) => ({
      ...state,
      heroes: state.heroes.filter((item) => item.id !== action.payload),
    }),
    addHeroes: (state, action: PayloadAction<Hero[]>) => ({
      ...state,
      heroes: action.payload,
    }),
  },
});

export const { heroCreated, heroDeleted, addHeroes } = heroesSlice.actions;

export default heroesSlice.reducer;
