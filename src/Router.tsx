import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {
  toggleDark: () => void;
  isDark: boolean;
}

const Router = ({ toggleDark, isDark }: IRouterProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins toggleDark={toggleDark} />} />
        <Route
          path="/:coinId/*"
          element={<Coin isDark={isDark} toggleDark={toggleDark} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
