import React from 'react';
import './Spinner.css';

const Spinner = ({
  size = 'md',
  className = '',
  ...props
}) => {
  return (
    <div className={`spinner spinner-${size} ${className}`} {...props} />
  );
};

export default Spinner;
