import ReactDOM from "react-dom/client";
import Root from "./components/Root";

const rooElement = document.getElementById("root");
if (!rooElement) {
  throw new Error("Root element not found");
}
const root = ReactDOM.createRoot(rooElement);
root.render(<Root />);
