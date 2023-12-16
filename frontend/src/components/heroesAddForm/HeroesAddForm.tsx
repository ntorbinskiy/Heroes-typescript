import { FC, FormEventHandler, Fragment, useState } from "react";

import axios from "axios";

import { Loading, heroCreated } from "../../redux/slices/heroes";
import { useAppDispatch, useAppSelector } from "../../redux/types";
import { Filter } from "../../redux/slices/filters";

export type Element = "fire" | "water" | "wind" | "earth" | "";
const ELEMENTS = ["fire", "water", "wind", "earth", ""] as const;
type ElementKey = (typeof ELEMENTS)[number];

export interface Hero {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly element: Element;
}
const HeroesAddForm: FC = () => {
  const [heroName, setHeroName] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [heroElement, setHeroElement] = useState<Element>("");

  const { filters, filtersLoadingStatus } = useAppSelector(
    (state) => state.filters
  );

  const dispatch = useAppDispatch();

  const onSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    const newHero: Hero = {
      id: Date.now(),
      name: heroName,
      description: heroDescription,
      element: heroElement,
    };

    dispatch(heroCreated(newHero));
    axios.post(
      `http://localhost:5050/heroes/create?name=${newHero.name}&description=${newHero.description}&element=${newHero.element}&id=${newHero.id}`
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
        if (name === "all") return <Fragment key={name}></Fragment>;

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
          onChange={(e) => {
            const isColorKey = (string: string): string is ElementKey => {
              return ELEMENTS.includes(string as ElementKey);
            };

            if (!isColorKey(e.target.value)) {
              return;
            }

            setHeroElement(e.target.value);
          }}
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
