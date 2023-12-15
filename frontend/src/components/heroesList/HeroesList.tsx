import { useCallback } from "react";
import { useAppDispatch, useAppDispatch } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { heroDeleted } from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import { createSelector } from "reselect";
import Spinner from "../spinner/Spinner";

import "./HeroesList.scss";
import { Hero } from "../heroesAddForm/HeroesAddForm";

const HeroesList = () => {
  const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    (state) => state.heroes.heroes,
    (filter, heroes) => {
      if (filter === "all") {
        return heroes;
      } else {
        return heroes.filter((item) => item.element === filter);
      }
    }
  );
  const filteredHeroes = useAppDispatch(filteredHeroesSelector);
  const heroesLoadingStatus = useAppDispatch(
    (state) => state.heroes.heroesLoadingStatus
  );
  const dispatch = useAppDispatch();

  const onDelete = useCallback(
    (id: number) => {
      dispatch(heroDeleted(id));
    },
    [dispatch]
  );

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Loading error!</h5>;
  }

  const renderHeroesList = (arr: Hero[]) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} classNames="hero">
          <h5 className="text-center mt-5">No heroes yet...</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition key={id} timeout={500} classNames="hero">
          <HeroesListItem {...props} onDelete={() => onDelete(id)} />
        </CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;