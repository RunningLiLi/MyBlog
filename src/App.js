
import './App.css';
import Welcome from './components/welcome'
import Index from './components/index/index'
import Editor from './components/editor/editor'
import {Routes,Route,useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import Notes from './components/index/notes/notes';
import Login from './components/index/login/login';
import Register from './components/index/register/register'
import Article from './components/article/article';
import Cards from './components/index/cards/cards';
export default function App() {
  function Redirect({to}){
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    },[to]);
    return null;
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/index' element={<Index/>}>
            <Route path='notes' element={<Notes/>}></Route>
            <Route path='cards' element={<Cards></Cards>}></Route>
            <Route path='login' element={<Login/>}></Route>
            <Route path='register' element={<Register/>}></Route>
        </Route>
        <Route path='/editor' element={< Editor/>}/>
        <Route path='/article' element={< Article />}/>
        <Route path='*' element={< Redirect to='/'/>}/>
      </Routes>
    </div>
  );
}