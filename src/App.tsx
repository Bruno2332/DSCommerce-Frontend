
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Catalog from './routes/ClientHome/Catalog';
import ProductDetails from './routes/ClientHome/ProductDetails';
import ClientHome from './routes/ClientHome';
import Cart from './routes/ClientHome/Cart';
import { useState } from 'react';
import { ContextCartCount } from './utils/context-cart';
import Login from './routes/ClientHome/Login';
import Admin from './routes/Admin';
import HomeAdmin from './routes/Admin/HomeAdmin';


function App() {

  const [contextCartCount, setContextCartCount] = useState<number>(0);

  return (
    <>
      <ContextCartCount.Provider value={{contextCartCount, setContextCartCount}}>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<ClientHome />}>
                <Route index element={<Login />}></Route>
                <Route path='catalog' element={<Catalog />} />
                <Route path='product-details/:productId' element={<ProductDetails />} />
                <Route path='cart' element={<Cart />} />
                <Route path='login' element={<Login />} />
              </Route>
              <Route path='*' element={<Navigate to="/" />} />
              <Route path="/admin" element={<Admin />}>
                <Route index element={<HomeAdmin />}/>
              </Route>
          </Routes>
        </BrowserRouter>
      </ContextCartCount.Provider>
    </>
    
  );
}

export default App
