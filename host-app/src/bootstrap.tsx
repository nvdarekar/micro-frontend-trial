import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import App from "./components/App";

const rooElement: HTMLElement | null = document.getElementById("root");
if (!rooElement) {
  throw new Error("Root element not found");
}
const root = ReactDOM.createRoot(rooElement);

root.render(
  <ReduxProvider store={store}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </ReduxProvider>,
);
