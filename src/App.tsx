import React from "react";
import { Global, css } from "@emotion/react";
import { Helmet } from "react-helmet-async";
import { Route, Switch } from "react-router";

import PickPage from "./pages/PickPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { AppLayout } from "./components/AppLayout";
import { Sidebar } from "./components/Sidebar";
import { PickMenu } from "./components/PickMenu";

import palette from "./libs/style/palette";

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
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
      <Global styles={globalStyle} />
    </>
  );
}

export default App;

const globalStyle = css`
  html,
  body,
  #root {
    height: 100%;
  }
  html {
    box-sizing: border-box;
    * {
      box-sizing: inherit;
    }
  }

  .button-transparent:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(238, 238, 238, var(--tw-bg-opacity));
  }

  .button-transparent {
    border-color: transparent;
    border-radius: 0.5rem;
    border-width: 1px;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.5rem;
    line-height: 1.625;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    --tw-text-opacity: 1;
    color: rgba(55, 65, 81, var(--tw-text-opacity));
  }

  .input-text {
    background-color: transparent;
    border-radius: 0.5rem;
    border-width: 1px;
    outline: 2px solid transparent;
    outline-offset: 2px;
    padding: 1rem;
    width: 100%;
    &:focus {
      border: 2px solid ${palette.amber400};
    }
  }

  .input-text.small {
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @keyframes popIn {
    0% {
      opacity: 0.7;
      transform: scale3d(0.8, 0.8, 1);
    }
    100% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes popInFromBottom {
    0% {
      opacity: 0;
      transform: translateY(400px) scale(0.75);
    }

    75% {
      opacity: 1;
      transform: translateY(-16px) scale(1);
    }

    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes popOutToBottom {
    0% {
      opacity: 1;
      transform: translateY(0px) scale(1);
    }

    100% {
      opacity: 0;
      transform: translateY(400px) scale(0.75);
    }
  }

  @keyframes shining {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
`;
