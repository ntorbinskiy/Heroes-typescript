import classNames from "classnames";
import "./HeroesFilter.css";

import Spinner from "../spinner/Spinner.tsx";
import { Filter, activeFilterChanged } from "../../redux/slices/filters";
import { useAppDispatch, useAppSelector } from "../../redux/types";
import { FC } from "react";

const HeroesFilters: FC = () => {
  const { filters, filtersLoadingStatus, activeFilter } = useAppSelector(
    (state) => state.filters
  );
  const dispatch = useAppDispatch();

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Loading error</h5>;
  }

  const renderFilters = (
    filtersArray: Filter[]
  ): JSX.Element | JSX.Element[] => {
    // TODO : think about improvements of this code
    if (filtersArray.length === 0) {
      return <h5 className="text-center mt-5">Filters weren't found</h5>;
    }

    return filtersArray.map(({ name, className, label }) => {
      const btnClass = classNames("btn", className, {
        active: name === activeFilter,
      });

      return (
        <button
          key={name}
          id={name}
          className={btnClass}
          onClick={() => dispatch(activeFilterChanged(name))}
        >
          {label}
        </button>
      );
    });
  };

  const elements = renderFilters(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Filter heroes by their names</p>
        <div className="btn-group">{elements}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
