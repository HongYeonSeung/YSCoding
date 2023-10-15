import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';


function App() {

  const [hello, setHello] = useState('연동 X')

  useEffect(() => {
      console.log("화살표함수 테스트")
    axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
  }, []);

  return (
      <div>
        백엔드 연동 테스트 : {hello}
      </div>
  );
}

export default App;
