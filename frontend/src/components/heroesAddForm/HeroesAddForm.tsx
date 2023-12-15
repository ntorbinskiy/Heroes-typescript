import { FormEventHandler, useState } from "react";

import { v4 } from "uuid";

import axios from "axios";

import { Loading, heroCreated } from "../../redux/slices/heroes";
import { useAppDispatch, useAppSelector } from "../../redux/types";
import { Filter } from "../../redux/slices/filters";

export interface Hero {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly element: string;
}
const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [heroElement, setHeroElement] = useState("");

  const { filters, filtersLoadingStatus } = useAppSelector(
    (state) => state.filters
  );

  const dispatch = useAppDispatch();

  const onSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    const newHero: Hero = {
      id: Number(v4()),
      name: heroName,
      description: heroDescription,
      element: heroElement,
    };

    dispatch(heroCreated(newHero));
    axios.post(
      `http://localhost:5050/heroes/create?name=${heroName}&description=${heroDescription}&element=${heroElement}&id=${v4()}`
    );

    setHeroName("");
    setHeroDescription("");
    setHeroElement("");
  };

  const renderFilters = (
    filters: Filter[],
    status: Loading
  ): JSX.Element | JSX.Element[] => {
    if (status === "loading") {
      return <option>Loading elements...</option>;
    } else if (status === "error") {
      return <option>Loading error!</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        if (name === "all") return <></>;

        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }

    return <></>;
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Name of new hero
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="What is my name?"
          value={heroName}
          onChange={(e) => setHeroName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Description
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="What can I do?"
          style={{ height: "130px" }}
          value={heroDescription}
          onChange={(e) => setHeroDescription(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Choose hero's element
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          value={heroElement}
          onChange={(e) => setHeroElement(e.target.value)}
        >
          <option value="">I am...</option>
          {renderFilters(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default HeroesAddForm;
