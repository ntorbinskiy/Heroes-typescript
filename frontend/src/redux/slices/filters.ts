import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Loading } from "./heroes";

type FilterName = "all" | "fire" | "water" | "wind" | "earth";

export interface Filter {
  name: FilterName;
  label: string;
  className: string;
}

export interface FiltersState {
  filters: Filter[];
  filtersLoadingStatus: Loading;
  activeFilter: FilterName;
}

const initialState: FiltersState = {
  filters: [
    {
      name: "all",
      label: "All",
      className: "btn-outline-dark",
    },
    {
      name: "fire",
      label: " Fire",
      className: " btn-danger ",
    },
    {
      name: "water",
      label: " Water",
      className: "btn-primary",
    },
    {
      name: "wind",
      label: " Wind",
      className: "btn-success",
    },
    {
      name: "earth",
      label: "Earth",
      className: "btn-secondary",
    },
  ],
  filtersLoadingStatus: "idle",
  activeFilter: "all",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    activeFilterChanged: (state, action: PayloadAction<FilterName>) => ({
      ...state,
      activeFilter: action.payload,
    }),
  },
});

export const { activeFilterChanged } = filtersSlice.actions;

export default filtersSlice.reducer;
