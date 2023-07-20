import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "../css/Estilos.css";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import ContenedorDispositivos from "./ContenedorDispositivos";
import { useNavigate } from 'react-router-dom';



export default function Registro() {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data, e) => {
    console.log(data);

    fetch('http://localhost:24172/loader', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data
      })
    })
    .then(response => {
      if (response.ok) {
        navigate('/loader');
       <Link path="/loader" element={<ContenedorDispositivos /> } ></Link>
      } else {
        console.error('Error en la respuesta del servidor');
      }
      })
      .catch(error => {
        console.error('Error fetch a /loader (POST):', error);
      });

    e.target.reset();
  }

 

  return (
    <>
      <div className="signupForm">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>

          <h1 className="title">REGISTRO</h1>
          <Box
            sx={{
              '& > :not(style)': { width: '270px', margin: "3px" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField label="Host:" variant="standard" {...register("host", { required: true })} />
            {errors.host?.type === "required" && <Stack sx={{ width: '100%' }} spacing={2}><Alert severity="error">El campo no debe estar vacío</Alert></Stack>}
            <TextField label="Puerto:" variant="standard" {...register("puerto", { required: true })} />
            {errors.puerto?.type === "required" && <Stack sx={{ width: '100%' }} spacing={2}><Alert severity="error">El campo no debe estar vacío</Alert></Stack>}
            <TextField label="Base de datos:" variant="standard" {...register("baseDatos", { required: true })} />
            {errors.baseDatos?.type === "required" && <Stack sx={{ width: '100%' }} spacing={2}><Alert severity="error">El campo no debe estar vacío</Alert></Stack>}
            <TextField label="Usuario:" variant="standard" {...register("usuario", { required: true })} />
            {errors.usuario?.type === "required" && <Stack sx={{ width: '100%' }} spacing={2}><Alert severity="error">El campo no debe estar vacío</Alert></Stack>}
            <TextField label="Contraseña:" variant="standard" type='password' {...register("contrasena", { required: true })} />
            {errors.contrasena?.type === "required" && <Stack sx={{ width: '100%' }} spacing={2}><Alert severity="error">El campo no debe estar vacío</Alert></Stack>}

            <input type="submit" className="submitBtn" value="Enviar"></input>

          </Box>
        </form>
      </div>
    </>
  )
}
