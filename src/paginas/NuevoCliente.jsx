import React from 'react'
import { Formulario } from '../components/Formulario'

export const NuevoCliente = () => {
  return (
    <>
      <h1 className="font-blacl text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">Llena los siguientes campos para registrar un nuevo usuario</p>
      <Formulario />
    </>
  )
}
