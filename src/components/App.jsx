import { useState, useEffect} from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

const API_KEY = '35199241-1ce149cef2c4e9fde3ee4bd95';
const URL = 'https://pixabay.com/api/';
const bodyEl = document.querySelector('body');

export default function App() { 
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const selectedPicture = response.find(picture => picture.id === currentId);

  useEffect(() => {
    if (!query) {
      return
    }
    setLoading(true);
    fetch(`${URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(new Error('Сталась помилка'))
        })
          .then(pictures => {
              if (pictures.hits.length === 0) {
                alert('Нічого не знайдено, спробуйте інший запит');
              } else {
                if (page === 1) {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                  return (
                    setResponse(pictures.hits),
                    setTotalHits(pictures.totalHits)
                  )
                } else {
                  setTimeout(() => {
                        window.scrollBy({
                          top: 2000,
                          behavior: "smooth",
                        });
                      },200)
                  return setResponse(prevResponse => [...prevResponse, ...pictures.hits])
                }
              }
        })
        .catch(error => setError(error))
      .finally(setLoading(false))
  },[query, page])
  
  const toggleModal = id => {
    setCurrentId(id);
    setShowModal(!showModal);
    bodyEl.classList.toggle('modal-open');
  }

  const handleMore = () => {
    setPage(page + 1);
  }
  
  const handleSearchbarSubmit = data => {
    if (query !== data) {
      setQuery(data);
      setPage(1);
      return
    } 
      return alert ('Це вже знайли, введіть інший запит')
  } 
    
  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={selectedPicture.largeImageURL} alt={selectedPicture.tags} />
        </Modal> )} 
      <Searchbar onSubmit={handleSearchbarSubmit} isSubmitting={loading}/>
      {error && <h1>{error.message}</h1>}
      {response && <ImageGallery pictures={response} onClick={toggleModal}/>}
      {loading && <Loader/>}
      {response.length !== 0 && !loading && Math.ceil(totalHits / 12) !== page && <Button onClick={handleMore} />}
    </>
)
}
