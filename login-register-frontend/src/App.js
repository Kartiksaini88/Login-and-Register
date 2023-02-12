
import { Route, Routes } from 'react-router';
import './App.css';
import LoginForm from './components/form/Login/LoginForm';
import RegisterForm from './components/form/Register/RegisterForm';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<LoginForm></LoginForm>}></Route>
        <Route path='' element={<RegisterForm></RegisterForm>}></Route>
      </Routes> 
    </div>
  );
}

export default App;
