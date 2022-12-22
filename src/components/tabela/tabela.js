import React, { useState, useEffect } from "react";

import { Conteiner, PropertiesTable, PropertiesFooter, PropertiesFooterButton, PropertiesFooterItems} from "./styles";
import api from "../../services/api"

function Table() {

    const [transferencia, setTransferencia] = useState([]);
    const [limit, setLimit] = useState(2);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

        async function loadTransferencia() {
            const response = await api.get(
                `transferencia?page=${currentPage}&limit=${limit}`
            );

            setTransferencia(response.data);

            const totalPages = Math.ceil(transferencia.length / limit);
            const arrayPages = [];

            for (let i = 1; i < totalPages; i++){
                arrayPages.push(i);
            }
        
            setPages(arrayPages);
        }

        loadTransferencia();
    }, [])

    return (
        <div>
            <PropertiesTable>
             <thead>
                 <tr>
                     <th>#</th>
                        <th>Data de transferencia</th>
                        <th>Valentia</th>
                        <th>Tipo</th>
                        <th>Nome de Operador Responsavel</th>
                    </tr>
                </thead>
             <tbody>
                   {transferencia.map((t) => (
                       <tr key={t.id}>
                            <td>{t.id}</td>
                            <td>{t.operationDate}</td>
                            <td>R$  {parseFloat(t.valor).toFixed(2)}</td>
                         <td>{t.tipo}</td>
                         <td>{t.operador}</td>
                        </tr>
                 ))}
                </tbody>
             </PropertiesTable>
            <PropertiesFooter>
                    <div><h4>Qntd {transferencia.length}</h4></div>
                <PropertiesFooterButton>
                    <PropertiesFooterItems>Previous</PropertiesFooterItems>

                    {pages.map((page) => (
                        <PropertiesFooterItems 
                        key={page} onClick={()=> setCurrentPage(page)}>
                            {page}</PropertiesFooterItems>
                    ))}

                    <PropertiesFooterItems>Next</PropertiesFooterItems>
                </PropertiesFooterButton>
            </PropertiesFooter>
        </div>
    )
}

export default Table;