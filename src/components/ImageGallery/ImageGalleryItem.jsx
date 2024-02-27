import './ImageGalleryItem.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ picture, onClick }) => {
  return (
    <li className="ImageGalleryItem" onClick={( ) => onClick(picture.id)}>
      <img className="ImageGalleryItem-image" src={picture.webformatURL} alt={picture.tags} />
    </li>
  )
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  picture: PropTypes.object,
  onClick: PropTypes.func.isRequired,
}