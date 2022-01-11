import "./App.css";
import "./core/assets/styles/custom.scss";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
      <ToastContainer />
    </Provider>
  );
};

export default App;
