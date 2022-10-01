import { BrowserRouter } from 'react-router-dom';
import Main from '../Main/Main';

function App() {
  return (
    <BrowserRouter>
      <div className='page'>
        <Main/>
      </div>
    </BrowserRouter>
  );
}

export default App;
