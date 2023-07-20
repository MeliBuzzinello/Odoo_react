import React from 'react';
import TextField from '@mui/material/TextField';
import "../css/Estilos.css";
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


export default function FormDisp(promps) {

  const { register, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);

    promps.onSubmit({ ...data })

    e.target.reset();
  }

  const handleCancel = () => {
    promps.onCancel();
  };


  return (
    <>
      {/* <div className='contenedor'>
        <div className='disp-contenedor'>
          <div className='disp-texto'>
            {name}
          </div>
          <div className='disp-texto'>
            {ip}
          </div>
          {connected ? <div className='disp-texto ok'>Activo</div> : <div className='disp-texto noOk'>Inactivo</div>}
          <div className='disp-contenedor-icono' onClick={() => eliminarIp(ip)}>
            <SettingsIcon className='disp-icono' />
          </div>
          <div className='disp-contenedor-icono' onClick={() => eliminarIp(ip)}>
            <DeleteIcon className='disp-icono' />
          </div>
        </div>
      </div> */}

   
      <div className="signupForm contenedor">
        <form className="form disp-contenedor" onSubmit={handleSubmit(onSubmit)}>
        <TableRow>
        <TableCell  scope="row">
          <TextField variant="standard" {...register("name")} />
        </TableCell>
        <TableCell align="left">
          <TextField variant="standard" {...register("ip")} />
        </TableCell>
           <TableCell align="left">
           <Button type="submit" variant="contained" style={{ backgroundColor: 'rgba(9, 53, 122, 1)' }}>Guardar</Button>
          </TableCell>
          <TableCell align="left">
          <Button variant="contained" onClick={handleCancel} style={{ backgroundColor: 'rgba(9, 53, 122, 1)' }}>Cancelar</Button>
          </TableCell>
          </TableRow>
        </form>
      </div> 
    
    </>
  )
}
