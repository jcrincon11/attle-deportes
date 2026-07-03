'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AddToCartButton() {
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = () => {
    setIsAdding(true);
    // Aquí iría tu lógica de carrito (Zustand/Context)
    setTimeout(() => setIsAdding(false), 2000); // Resetea la animación
  };

  return (
    <motion.button
      className="add-to-cart"
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      style={{
        '--background-default': '#FF3D00',
        '--text-color': '#FFFFFF',
        '--text-x': '0px',
        '--text-o': '1',
        '--background-scale': '1'
      } as React.CSSProperties}
    >
      <span className="shirt"></span>
      <span className="cart"></span>
      <span>{isAdding ? 'Añadiendo...' : 'Añadir al Carrito'}</span>
    </motion.button>
  );
}