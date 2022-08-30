import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formulario } from '../components/Formulario'

export const EditarCliente = () => {
  const params = useParams()
  const [cliente, setcliente] = useState({})
  const [cargando, setcargando] = useState(true)

  useEffect(() => {
    const url = `http://localhost:4500/clientes/${params.id}`
    try {
      
      const funcion = async () =>{
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setcliente(resultado)
      } 
      funcion()     
    } catch (error) {
      console.log(error)
    }
    setcargando(!cargando)

  }, [])


  return (
    <div>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente: {cliente.nombre}</h1>
        <p className="mt-3">Utiliza este formulario para editar la informacion del cliente</p>
       { Object.keys(cliente).length>0 ? 
        <Formulario
          cliente = { cliente }
          cargando = {cargando}
        />
       : 
        <p>ID de usuario no existe</p>
       } 
    </div>
  )
}
