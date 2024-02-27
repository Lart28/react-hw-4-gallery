import ImageGalleryItem from "./ImageGalleryItem";
import { nanoid } from 'nanoid';
import './ImageGallery.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ pictures, onClick }) => {
    return (
        <ul className="ImageGallery">
        {pictures.map(picture => <ImageGalleryItem key={nanoid()} picture={picture} onClick={onClick} />)}
        </ul>
  )
}

export default ImageGallery;

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}