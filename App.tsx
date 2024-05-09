import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import './styles/reset.scss';

export function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App;
