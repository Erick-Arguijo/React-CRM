import React, { useState, useEffect } from 'react'
import { Cliente } from '../components/Cliente'

export const Inicio = () => {
  const [clientes, setclientes] = useState([])
    useEffect(() => {
      const url = 'http://localhost:4500/clientes'
      try {
        const peticion = async () =>{
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setclientes(resultado)
      }
      peticion()
        
      } catch (error) {
        console.log(error)
      }

      


  }, [])
  
  const handleDelete = async (ClienteID) =>{
    try {
        const url = `http://localhost:4500/clientes/${ClienteID}`
        const respuesta = await fetch(url, {
            method: 'DELETE', // or 'PUT'
            })
        await respuesta.json()
        setclientes(clientes.filter(cliente => cliente.id !== ClienteID))
    } catch (error) {
        console.log(error)
    }
}

  return (
    <>
    <h1 className="font-blacl text-4xl text-blue-900">Clientes</h1>
    <p className="mt-3">Administra tus clientes</p>
    <table className="w-full mt-5 table-auto shadow bg-white">
      <thead className="bg-blue-800 text-white">
        <tr>
          <th className="p-2">Nombre</th>
          <th className="p-2">Contacto</th>
          <th className="p-2">Empresa</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        { clientes.map(cliente => (
          <Cliente 
            key={cliente.id} 
            cliente={cliente}
            handleDelete = { handleDelete }
          />
        ))

        }
      </tbody>

    </table>

  </>
  )
}
