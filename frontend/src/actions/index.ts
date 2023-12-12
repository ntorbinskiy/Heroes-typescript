import { UnknownAction } from "@reduxjs/toolkit";
import { Hero } from "../components/heroesAddForm/HeroesAddForm";

interface Actions {
  readonly ACTIVE_FILTER_CHANGED: string;
  readonly HERO_CREATED: string;
  readonly HERO_DELETED: string;
}

const actions: Actions = {
  ACTIVE_FILTER_CHANGED: "ACTIVE_FILTER_CHANGED",
  HERO_CREATED: "HERO_CREATED",
  HERO_DELETED: "HERO_DELETED",
};

export const activeFilterChanged = (filter: string): UnknownAction => {
  return {
    type: actions.ACTIVE_FILTER_CHANGED,
    payload: filter,
  };
};

export const heroCreated = (hero: Hero): UnknownAction => {
  return {
    type: actions.HERO_CREATED,
    payload: hero,
  };
};

export const heroDeleted = (id: string): UnknownAction => {
  return {
    type: actions.HERO_DELETED,
    payload: id,
  };
};
