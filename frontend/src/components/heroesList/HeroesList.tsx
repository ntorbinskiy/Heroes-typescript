import { FC, useCallback, useEffect } from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import HeroesListItem from "../heroesListItem/HeroesListItem";

import Spinner from "../spinner/Spinner.tsx";

import "./HeroesList.scss";
import { Hero } from "../heroesAddForm/HeroesAddForm";
import { useAppDispatch, useAppSelector } from "../../redux/types";
import { addHeroes, heroDeleted } from "../../redux/slices/heroes";
import axios from "axios";
import { FilterName } from "../../redux/slices/filters";

const HeroesList: FC = () => {
  //   const filteredHeroesSelector = createSelector(
  //     (state) => state.filters.activeFilter,
  //     (state) => state.heroes.heroes,
  //     (filter, heroes) => {
  //       if (filter === "all") {
  //         return heroes;
  //       } else {
  //         return heroes.filter((item) => item.element === filter);
  //       }
  //     }
  //   );
  //   const filteredHeroes = useAppDispatch(filteredHeroesSelector);
  const activeFilter = useAppSelector((state) => state.filters.activeFilter);

  useEffect(() => {
    const getAndFilterHeroes = async (filter: FilterName): Promise<void> => {
      const { data } = await axios.get<Hero[]>("http://localhost:5050/heroes");

      const heroesAxios = data.filter((hero) => {
        if (filter === "all") {
          return true;
        }

        if (hero.element === filter) {
          return true;
        }

        return false;
      });

      dispatch(addHeroes(heroesAxios));
    };

    getAndFilterHeroes(activeFilter);
  }, []);

  const { heroes, heroesLoadingStatus } = useAppSelector(
    (state) => state.heroes
  );

  const dispatch = useAppDispatch();

  const onDelete = useCallback(
    (id: number) => {
      axios.delete(`http://localhost:5050/heroes/delete/${id}`);
      console.log(`http://localhost:5050/heroes/delete/${id}`);
      dispatch(heroDeleted(id));
    },
    [dispatch]
  );

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Loading error!</h5>;
  }

  const renderHeroesList = (arr: Hero[]): JSX.Element | JSX.Element[] => {
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
          <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)} />
        </CSSTransition>
      );
    });
  };

  console.log({ heroes });
  const elements = renderHeroesList(heroes);
  return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;
