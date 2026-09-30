import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '2rem',
      right: '3rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      zIndex: 10
    }}>
      <span style={{ 
        fontSize: '0.6rem', 
        fontWeight: 600, 
        letterSpacing: '0.2em', 
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)'
      }}>
        SCROLL
      </span>
      <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(18, 18, 18, 0.2)', overflow: 'hidden' }}>
        <motion.div 
          animate={{ y: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          style={{ width: '100%', height: '100%', backgroundColor: '#121212' }}
        />
      </div>
    </div>
  );
}
