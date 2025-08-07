import { Provider } from "react-redux";
import { store } from "./store/store";
import MobileCompany from "./components/MobileCompany/MobileCompany";

const App = () => {
  return (
    <Provider store={store}>
      <MobileCompany />
    </Provider>
  );
};

export default App;
