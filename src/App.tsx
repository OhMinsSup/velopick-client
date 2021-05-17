import React from "react";
import { Helmet } from "react-helmet-async";
import { Route, Switch } from "react-router";

import PickPage from "./pages/PickPage";

import { AppLayout } from "./components/AppLayout";
import { Sidebar } from "./components/Sidebar";
import { PickMenu } from "./components/PickMenu";

function App() {
  console.log(process.env);
  return (
    <>
      <Helmet>
        <title>velopick</title>
        <meta
          name="description"
          content="나의 기억을 Pick! 너의 기억을 Pick!"
        />
      </Helmet>
      <Switch>
        <Route path={["/", "/explore", "/member", "/search"]} exact>
          <AppLayout>
            <AppLayout.Side>
              <Sidebar />
            </AppLayout.Side>
            <AppLayout.Main>
              <Switch>
                <Route path="/" exact>
                  <PickPage />
                </Route>
                <Route path="/member">
                  <div>member</div>
                </Route>
                <Route path="/explore">
                  <div>explore</div>
                </Route>
                <Route path="/search">
                  <div>search</div>
                </Route>
              </Switch>
            </AppLayout.Main>
            <AppLayout.RightSide>
              <PickMenu />
            </AppLayout.RightSide>
          </AppLayout>
        </Route>
      </Switch>
    </>
  );
}

export default App;
