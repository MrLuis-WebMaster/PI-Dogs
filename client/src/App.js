import { Route,Routes } from 'react-router-dom';
import './scss/app.scss';
import Landing from './Components/LandingPage';
import Home from './Components/Home/Home';
import DetailsDogs from './Components/DetailsDogs/DetailsDogs';
import Form from './Components/Form/Form';
function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/home/create" element={<Form/>}/>
            <Route path="/home/:id" element={<DetailsDogs/>}/>
        </Routes>
    </div>
  );
}

export default App;
