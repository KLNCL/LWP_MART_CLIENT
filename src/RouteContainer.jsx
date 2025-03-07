// import React from 'react'
// import Login from './Component/Auth/Login/Login'
// import Registration from './Component/Auth/Registration/Registration'
// import Home from './Component/Home/Home'
// import Selling from './Component/Selling/Selling'
// import OtherLayout from './layout/OtherLayout'
// import AuthLayout from './layout/AuthLayout'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'


// export default function RoutContainer() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/login' element={<AuthLayout />}>
//           <Route path='/login' element={<Login />} />
//           <Route path='/registration' element={<Registration />} />
//         </Route>
//         <Route path='/' element={<OtherLayout />}>
//           <Route path='/' element={<Home />} />
//           <Route path='/' element={<Selling />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }


import React from 'react';
import Login from './Component/Auth/Login/Login';
import Registration from './Component/Auth/Registration/Registration';
import Home from './pages/Home/Home';
import OtherLayout from './layout/OtherLayout';
import AuthLayout from './layout/AuthLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemAdd from './Component/ItemAdd/ItemAdd';
import ItemEdit from './Component/ItemEdit/ItemEdit';
import BecomeSeller from './Component/BecomeSeller/BecomeSeller';
import Profile from './pages/Profile/Profile';
import ProductView from './Component/ProductView/ProductView';
import Purchase from './pages/Purchase/Purchase';
import Order from './pages/Order/Order';
import AboutUs from './pages/AboutUs/AboutUs';
import Cart from './pages/Cart/Cart';
import QuntityPurches from './pages/QuantityPurches/QuantityPurches';

export default function RoutContainer() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Layout */}
        <Route path='/login' element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path='/registration' element={<AuthLayout />}>
          <Route index element={<Registration />} />
        </Route>

        {/* Other Layout */}
        <Route path='/' element={<OtherLayout />}>
          <Route path='/' index element={<Home />} />
          <Route path='profile' element={<Profile />} />
          <Route path='item-add' element={<ItemAdd />} />
          <Route path='item-edit' element={<ItemEdit />} />
          <Route path='become-seller' element={<BecomeSeller />} />
          <Route path='product-view' element={<ProductView />} />
          <Route path='purchase' element={<Purchase/>} />
          <Route path='order' element={<Order/>} />
          <Route path='aboutUs' element={<AboutUs/>} />
          <Route path='cart' element={<Cart/>} />
          <Route path='cart/purchase' element={<QuntityPurches/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
