import logo from '../logo-systel.svg';
import React, { useEffect, useState } from 'react';


export default function NavBar() {
  const [ip, setIP] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:24172/getOdroidIP')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la solicitud');
        }
      })
      .then(data => {
        setIP(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


 
  return (
    <>
    <div className='navbar'>
    <div className='navbar-title'>
      <p>IP: {ip}</p>
    </div>
    <div style={{ width: "10%", height: "auto"}}>
    <img src={logo} alt={logo} />
    </div>
    </div>
    </>
  )
}
