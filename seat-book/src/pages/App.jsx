import '../styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Seat from './Seat.jsx'
import Cart from './Cart.jsx' 
import PaymentSuccess from './PaymentSuccess.jsx';
import Home from './Home.jsx';
import Login from '../components/LoginUser.jsx';
import MoviesInfo from './MoviesInfo.jsx';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/seat" element={<Seat />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/movie' element={<MoviesInfo />} />
        <Route path='/movie/:movieId' element={<MoviesInfo />} />
        <Route path='/movie/:movieId/seat' element={<Seat />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  )
}
export default App