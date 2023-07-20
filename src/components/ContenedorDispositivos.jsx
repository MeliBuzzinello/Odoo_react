import React, { useState, useEffect } from 'react';
import FormDisp from './FormDisp';
import Dispositivo from './Dispositivo';
import "../css/Estilos.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import io from 'socket.io-client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function ContenedorDispositivos() {

  const [datos, setDatos] = useState([]);

  const agregarDispositivo = data => {
    if (data.name.trim() && data.name.trim()) {
      data.name = data.name.trim();
      data.ip = data.ip.trim();

      const dispositivosAll = [data, ...datos];
      setDatos(dispositivosAll);

      //Guardar dispositivo nuevo en db
      console.log("post");
      fetch('http://localhost:24172/loaDevices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data
        })
      })
        .then(response => {
          console.log('Response:', response);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    setShowForm(false);
  };


  const cancelarForm = () => {
    setShowForm(false);
  }

  // funcionamiento del btn  Nuevo dispositivo
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const modificarIp = ip => {
    alert("modificar")
  }

  const eliminarIp = ip => {
    const updatedList = datos.filter((dato) => dato.ip !== ip);
    setDatos(updatedList);

    const datoDelete = datos.find((dato) => dato.ip === ip);
    // Elimina el ip de la db 
    console.log("delete");
    fetch('http://localhost:24172/deleteDevices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...datoDelete
      })
    })
      .then(response => {
        console.log(response);
        // location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  //Conecta a db para traer dispositivos cargados
  useEffect(() => {
    console.log("get");
    fetch('http://localhost:24172/getData')
      .then(response => response.json())
      .then((data) => {
        console.log('Data: ' + JSON.stringify(data));
        setDatos(data);
      })
      .catch(error => console.error(error));
  }, []); // <= Añade el arreglo vacío aquí para ejecutar el efecto solo una vez


  //configuracion de socket
  // const [socketData, setSocketData] = useState({ connected: false, ip: '' });

  // const socket = io.connect("http://localhost:3007", { forceNew: true });
  
  // useEffect(() => {
  //   console.log("socket")
  //   socket.on('isConnected', (message) => {
  //     try {
  //       console.log(`Mensaje del servidor: ${JSON.stringify(message)}`);
  //       setDatos(prevDatos => prevDatos.map(data => {
  //         if (data.ip === message.ip) {
  //           return { ...data, isConnected: message.connected };
  //         }
  //         return data;
  //       }));
  //       // setSocketData(message);
  //     } catch (error) {
  //       console.error('Error al procesar el mensaje del servidor:', error);
  //     }
  //   });

  //   return () => {
  //     socket.off("isConnected");
  //   };
  // }, []);


  // socket.on('isConnectedToOdoo', (message) => {
  //   if (message === 'false') {
  //     alert('Falló el registro!\nIntentelo nuevamente.');
  //     setTimeout(() => {
  //       window.location.replace("http://localhost:3000");
  //     }, 2000);
  //   } else {
  //     console.log('Credenciales Odoo correctas!');
  //   }
  // });



  return (
    <>
      <div className='contenedor-padre-odoo'>
        <div className='contenedor-hijo-odoo'>
          <div className='odoo-title'>Conexión a Odoo</div>
          <div className='odoo-state'>Conectado</div>
          <SettingsIcon className='odoo-icono' />
        </div>
      </div>

      <div className='contenedor-padre'>
        <div className='contenedor-hijo'>
          <div className='contenedor-title'>
            <div className='disp-title'>Dispositivos cargados</div>
            <Button onClick={handleButtonClick} variant="contained" disabled={showForm} style={{ backgroundColor: showForm ? 'gray' : 'rgba(9, 53, 122, 1)' }} startIcon={<AddCircleOutlineIcon />}>Nuevo</Button>
          </div>

          {/*  =====> Contenedor Dispositivos (crea las tablas) <=====  */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              {(datos.length !== 0 || showForm) &&
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="left">IP</TableCell>
                    <TableCell align="left">Estado</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>}

              {/*  =====> muestra el Form al precionar btn nuevo dispositivo <=====  */}
              {showForm && <FormDisp onSubmit={agregarDispositivo} onCancel={cancelarForm} />}

              <TableBody>
                {datos.map((data) => {
                  // if (data.ip === socketData.ip) {
                  //   data.isConnected = socketData.connected;
                  // }
                  return (
                    <Dispositivo
                      key={data.ip}
                      name={data.name}
                      ip={data.ip}
                      connected={data.isConnected}
                      modificarIp={modificarIp}
                      eliminarIp={eliminarIp}
                    />)
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  )
}
