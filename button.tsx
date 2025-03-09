import React from 'react';
import styles from './Button.module.css'; // Import the CSS Module

interface ButtonProps {
  image: string; // URL or path to the image
  text: string; // Button text
  onClick?: () => void; // Optional click handler
}

const Button: React.FC<ButtonProps> = ({ image, text, onClick }) => {
  return (
    <button className= {styles.button} onClick={onClick}>
      {/* <img src={image} alt={text} /> Display the image */}
      <span>{text}</span> {/* Display the text */}
    </button>
  );
};

export default Button;