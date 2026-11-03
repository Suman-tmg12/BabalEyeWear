import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { isLoggedIn } from '../utils/auth';

// Same as useCart(), but addToCart sends guests to the login page.
// Returns true if the item was added, false if the user was redirected.
export default function useGuardedCart() {
  const cart = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const addToCart = (product, options) => {
    if (!isLoggedIn()) {
      navigate('/Auth/Login', {
        state: { from: location.pathname + location.search },
      });
      return false;
    }
    cart.addToCart(product, options);
    return true;
  };

  return { ...cart, addToCart };
}