import { MagnifyingGlass } from 'react-loader-spinner';
import './Loader.css';

const Loader = () => (
  <div className='Loader'>
    <MagnifyingGlass
      visible={true}
      height="50"
      width="50"
      ariaLabel="magnifying-glass-loading"
      wrapperStyle={{}}
      wrapperClass="magnifying-glass-wrapper"
      glassColor="#c0efff"
      color="#3f51b5"
    />
  </div>
)

export default Loader;