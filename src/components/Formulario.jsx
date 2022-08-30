import React from 'react'
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Alerta } from './Alerta';
import { Spinner } from '../Spinner';


export const Formulario = ({cliente, cargando}) => {
    const navigate = useNavigate()
    let nuevoSchema = yup.object().shape({

        nombre: yup.string()
                   .min(3, 'El Nombre es muy corto')
                   .max(10, 'El nombre es muy largo')
                   .required('El nombre del Cliente es Obligatorio'), 
        empresa: yup.string()
                    .required('El nombre de la empresa es obligatorio'),
        email: yup.string()
                    .email('Correo no valido')
                    .required('El correo es requerido'),
        telefono: yup.number()
                    .positive('Numero no valido')
                    .integer('Numero no valido')
                    .typeError('Numero no valido'),
        notas: yup.string()
                   

      });


    const handleSubmit = async (values) =>{
        let respuesta 
        if (cliente?.id) {
            try {   
                const url = `http://localhost:4500/clientes/${cliente.id}`
                    respuesta = await fetch(url, {
                    method : 'PUT', 
                    body : JSON.stringify(values),
                    headers : {
                        'content-Type': 'application/json'
                    }   
                }
                )
         
               } catch (error) {
                console.log(error)
               }
        }else{
            try {   
                const url = 'http://localhost:4500/clientes'
                    respuesta = await fetch(url, {
                    method : 'POST', 
                    body : JSON.stringify(values),
                    headers : {
                        'content-Type': 'application/json'
                    }   
                }
                )
            } catch (error) {
                console.log(error)
            }
        }
        
        const data = await respuesta.json()
        navigate('/clientes')
    }
    
  return (
    cargando ? <Spinner />: (
        
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        {cliente?.nombre ? 
            <h1 className="text-gray-600 font-bold text-xl uppercase text-center">Editar Cliente</h1>
        :
            <h1 className="text-gray-600 font-bold text-xl uppercase text-center">Agregar Cliente</h1>
        }
        <Formik
            initialValues={{
                nombre: cliente?.nombre ?? "",
                empresa: cliente?.empresa ?? "",
                email: cliente?.email ?? "",
                telefono: cliente?.telefono ?? "",
                notas: cliente?.notas ?? "",
            }}
            enableReinitialize={true}
            onSubmit = { async (values, {resetForm})=> {
                await handleSubmit(values)
                resetForm()
                }
            }
            validationSchema={nuevoSchema}
            >
            {({errors, touched})=>{
                return (
            
            <Form className="mt-10">
                <div className="flex flex-col mb-4">
                    <label className="text-gray-800" htmlFor="nombre">Nombre:</label>
                    <Field 
                        type="text" 
                        id='nombre' 
                        name="nombre" 
                        placeholder='Nombre'
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    />
                    {errors.nombre && touched.nombre ? (
                        <Alerta> {errors.nombre}</Alerta>
                    ): null}
                    
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-gray-800" htmlFor="empresa">Empresa:</label>
                    <Field 
                        type="text" 
                        id='empresa' 
                        name="empresa" 
                        placeholder='Empresa del cliente'
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    />
                    {errors.empresa && touched.empresa ? (
                        <Alerta> {errors.empresa}</Alerta>
                    ): null}

                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-gray-800" htmlFor="email">E-mail:</label>
                    <Field 
                        type="email" 
                        id='email' 
                        name="email" 
                        placeholder='Email del cliente'
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    />
                    {errors.email && touched.email ? (
                        <Alerta> {errors.email}</Alerta>
                    ): null}
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-gray-800" htmlFor="tel">Telefono:</label>
                    <Field 
                        type="tel" 
                        id='tel' 
                        name="telefono" 
                        placeholder='Telefono del cliente'
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    />
                    {errors.telefono && touched.telefono ? (
                        <Alerta> {errors.telefono}</Alerta>
                    ): null}
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-gray-800" htmlFor="notas">Nota:</label>
                    <Field 
                        as= 'textarea'
                        type="text" 
                        id='notas' 
                        name="notas" 
                        placeholder='Notas'
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                { cliente?.nombre ?
                <input type="submit" value='Editar Cliente' className='mt-5 w-full bg-blue-800 p-3 text-white font-bold text-lg cursor-pointer' />
                :
                <input type="submit" value='Agregar Cliente' className='mt-5 w-full bg-blue-800 p-3 text-white font-bold text-lg cursor-pointer' />
                }
            </Form>

            
        )}}
        </Formik>
    </div>
 
  ))
}

Formulario.defaultProps = {
    cliente : {},
    cargando : false
}
