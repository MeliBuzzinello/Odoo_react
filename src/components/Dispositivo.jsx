import React from 'react';
import "../css/Dispositivos.css";
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


export default function Dispositivo({ name, ip, connected, eliminarIp, modificarIp }) {

    return (
        <>
            <TableRow key={ip}>
                <TableCell component="th" scope="row">{name}</TableCell>
                <TableCell align="left">{ip}</TableCell>
                <TableCell align="left">{connected ? <div className='disp-texto ok'>Activo</div> : <div className='disp-texto noOk'>Inactivo</div>}</TableCell>
                <TableCell align="left"> <div onClick={() => modificarIp(ip)}>
                    <SettingsIcon className='disp-icono' />
                </div></TableCell>
                <TableCell align="left"><div onClick={() => eliminarIp(ip)}>
                    <DeleteIcon className='disp-icono' />
                </div></TableCell>
            </TableRow>

            {/* <div className='contenedor'>
    <div className='disp-contenedor'>
        <div className='disp-texto'>
            {name}
        </div>
        <div className='disp-texto'>
            {ip}
        </div>
        { connected ?  <div className='disp-texto ok'>Activo</div> : <div className='disp-texto noOk'>Inactivo</div> }
        <div className='disp-contenedor-icono' onClick={()=>eliminarIp(ip)}> 
            <SettingsIcon className='disp-icono'/>
        </div>
        <div className='disp-contenedor-icono' onClick={()=>eliminarIp(ip)}> 
            <DeleteIcon className='disp-icono'/>
        </div>
    </div>
    </div> */}
        </>
    )
}
