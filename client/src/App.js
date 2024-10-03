import { Routes, Route } from "react-router-dom";
import { Home, Public, Login, FAQS, DetailProduct, Blogs, Services } from "./pages/public";
import path from "./utils/path";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.FAQS} element={<FAQS />} />
          <Route path={path.OUT_SERVICES} element={<Services/>} />
          <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<DetailProduct/>} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
