import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Home,
  Products,
  Cart,
  PaymentSuccess,
  ProductDescription,
  Login,
  Signup,
} from "./pages/index";
import { LoggedInProtected } from "./ProtectedRoutes";
import Layout from "./layout/Layout";
import { useSelector } from "react-redux";
function App() {
  const isLoggedIn = useSelector((state) => state.userSlice.isLoggedIn);
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:id" element={<ProductDescription />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route element={<LoggedInProtected isLoggedIn={isLoggedIn} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route exact path="/order-placed" element={<PaymentSuccess />} />
        <Route
          exact
          path="*"
          element={<p className="text-center">Page does not exist.</p>}
        />
      </Routes>
    </Layout>
  );
}

export default App;
