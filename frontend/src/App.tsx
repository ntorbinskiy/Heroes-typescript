import HeroesList from "./components/heroesList/HeroesList";

import HeroesAddForm from "./components/heroesAddForm/HeroesAddForm";
import HeroesFilters from "./components/heroesFilters/HeroesFilters";
import "./app.scss";
import { FC } from "react";

const App: FC = () => {
  return (
    <main className="app">
      <div className="content">
        <HeroesList />
        <div className="content__interactive">
          <HeroesAddForm />
          <HeroesFilters />
        </div>
      </div>
    </main>
  );
};

export default App;
