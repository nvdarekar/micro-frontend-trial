import { NavLink } from "react-router";
import { Routes, Route } from "react-router";
import { Suspense } from "react";
import RemoteMicroApp from "../components/RemoteMicroApp";
import { MICRO_APP_ROUTES } from "../constants/mfRoutes";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      {/* Navigation links common to all apps */}
      <div className={styles.navContainer}>
        <NavLink to="/micro-frontend-1/123" end>
          Micro Frontend App 1
        </NavLink>
        <NavLink to="/micro-frontend-2/123" end>
          Micro Frontend App 2
        </NavLink>
      </div>
      {/* load the micro frontend app based on the route */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {MICRO_APP_ROUTES.map(
            ({ pathPattern, appName, devBaseUrl, remoteEntryPath }) => (
              <Route
                key={appName}
                path={pathPattern}
                element={
                  <RemoteMicroApp
                    appName={appName}
                    devBaseUrl={devBaseUrl}
                    remoteEntryPath={remoteEntryPath}
                  />
                }
              />
            ),
          )}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
