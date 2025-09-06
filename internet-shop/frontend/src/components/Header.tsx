import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="glass-effect sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="gradient-bg text-white p-2 rounded-xl shadow-lg">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43A2 2 0 008.07 11h4.86a2 2 0 001.985-1.782l1.358-5.43a.995.995 0 00.01-.042L17.78 3H19a1 1 0 000-2H3z" />
                <path d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">EliteStore</h1>
              <p className="text-gray-600 text-xs">Премиум качество</p>
            </div>
          </div>

          <button
            onClick={onCartClick}
            className="relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-2 font-semibold text-gray-800 hover:bg-white hover:shadow-md transition-all duration-300 flex items-center space-x-2 group"
          >
            <div className="relative">
              <svg
                className="w-4 h-4 text-gray-700 group-hover:text-blue-600 transition-colors"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold pulse-animation">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-sm hidden sm:block">Корзина</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
