import React from "react";
import "./App.css";
import Header from "./page/Header/Header";
import Home from "./page/Home/Home";
import Subreddits from "./page/Subreddits/Subreddits";
import { useMediaQuery } from "react-responsive";

export default function App() {
  const mobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <>
      <Header />
      {
        // Display subreddits at the top of the page on mobile
        !mobile ? (
          <>
            <main>
              <Home />
            </main>
            <aside>
              <Subreddits />
            </aside>
          </>
        ) : (
          <>
            <aside>
              <Subreddits />
            </aside>
            <main>
              <Home />
            </main>
          </>
        )
      }
    </>
  );
}
