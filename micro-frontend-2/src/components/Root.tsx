import { BrowserRouter } from "react-router";
import App from "./App";

const Root = () => {
  return (
    <BrowserRouter basename="/micro-frontend-2">
      <App />
    </BrowserRouter>
  );
};

export default Root;
