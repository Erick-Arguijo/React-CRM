import React from 'react'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from '../layout/Layout'
import { NuevoCliente } from '../paginas/NuevoCliente';
import { EditarCliente } from '../paginas/EditarCliente';
import { Inicio } from '../paginas/Inicio'
import { VerCliente } from '../paginas/VerCliente';
 
export const Router = () => {
    return (
    <BrowserRouter>
    <Routes>

      <Route path="/clientes" element={<Layout />}>
        <Route index element={<Inicio/>}/>
        <Route path="nuevo" element={<NuevoCliente />} />
        <Route path="editar/:id" element={<EditarCliente />} />
        <Route path=":id" element={<VerCliente />} />
      </Route>
    
    </Routes>
  </BrowserRouter>
    )
}
