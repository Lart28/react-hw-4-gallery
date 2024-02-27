import './Button.css';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <button className="Button" onClick={onClick}>Load More</button>
  )
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}