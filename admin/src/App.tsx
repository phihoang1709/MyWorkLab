import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './pages/NotFound';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import { QueryClientProvider , QueryClient } from '@tanstack/react-query';
import EditCategoryPage from './pages/Categories/EditCategoryPage';
import ProductsPage from './pages/Products/ProductsPage';
import EditProductsPage from './pages/Products/EditProductsPage';
import CategoriesPage from './pages/Categories/CategoriesPage';
import UsersPage from './pages/Users/UsersPage';
import EditUsersPage from './pages/Users/EditCategoryPage';
import OrdersPage from './pages/Orders/OrdersPage';

const queryClient = new QueryClient();
function App() {
  const isLoggedIn = !!localStorage.getItem('token'); 

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />} />
          <Route path='/login' element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />} />
          <Route path='/register' element={!isLoggedIn ? <Register /> : <Navigate to="/" />} />

        {isLoggedIn && (
            <>
              <Route path='/products' element={<ProductsPage/>} />
              <Route path='/categories' element={<CategoriesPage />} />
              <Route path='/categories/edit/:id' element={<EditCategoryPage />} />
              <Route path='/products/edit/:id' element={<EditProductsPage/>} />
              <Route path='/users' element={<UsersPage/>} />
              <Route path='/users/edit/:id' element={<EditUsersPage />} />
              <Route path='/orders' element={<OrdersPage/>} />
            </>
          )}


          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
