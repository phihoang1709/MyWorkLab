import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Shop from './pages/Shop';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import DetailProduct from './pages/DetailProduct';
import NotFound from './pages/NotFound';
import '../public/styles/index.css';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/detail/:id' element={<DetailProduct/>}/>

        {isLoggedIn && <>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
        </>}

        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
