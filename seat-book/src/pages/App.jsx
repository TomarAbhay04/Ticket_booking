import '../styles/App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Seat from './Seat.jsx'
import Cart from './Cart.jsx' 
import PaymentSuccess from './PaymentSuccess.jsx';
import Layout from './Layout.jsx'
import Home from './Home.jsx';
import Login from '../components/LoginUser.jsx';
import MoviesInfo from './MoviesInfo.jsx';
import UserBookings from './UserBookings.jsx';
import User from './User.jsx';
import Movie from './Movies.jsx';
import AboutUs from './AboutUs.jsx';
import HelpAndSupport from './HelpAndSupport.jsx';
import ApplyForFranchise from './ApplyForFranchise.jsx';
import MovieSlider from '../components/MovieSlider.jsx';  



const App = () => {
  return (
    <Router>
      <Layout >
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess/>} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/movie' element={<MoviesInfo />} /> */}
        <Route path='/movie/:movieId' element={<MoviesInfo />} />
        <Route path='/movie/:movieId/seat' element={<Seat />} />
        <Route path='/orders' element={<UserBookings />} />
        <Route path ='/movies' element={<Movie />} />
        <Route path ='/aboutus' element={<AboutUs />} />
        <Route path ='/support' element={<HelpAndSupport />} />
        <Route path ='/applyforfranchise' element={<ApplyForFranchise />} />
        <Route path="*" element={<h1>Not Found</h1>} />

      </Routes>
      </Layout> 
    </Router>
  )
}
export default App