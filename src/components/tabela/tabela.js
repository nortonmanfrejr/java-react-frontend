import React, { useState, useEffect, useCallback } from "react";

import { 
    Conteiner, 
    PropertiesTable, 
    PropertiesFooter, 
    PropertiesFooterButton, 
    PropertiesFooterItems
} from "./styles";

import api from "../../services/api"

function Table() {

    const [transferencia, setTransferencia] = useState([]);
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(5);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

        async function loadTransferencia() {
            const response = await api.get(
                `/transferencia/search==ocBeltrano?page=${currentPage}&limit=${limit}`
            );  

            console.log(transferencia.slice(currentPage - 1 * limit, limit));
        
            setTotal(response.data.length);

            const totalPages = Math.ceil(total / limit);

            const arrayPages = [];
            for (let i = 1; i < totalPages; i++){
                arrayPages.push(i);
            }
        
            setPages(arrayPages);

            setTransferencia(response.data);
    
        }

        loadTransferencia();
    }, [currentPage, limit, total]);

    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    return (
        <Conteiner>
            <h4>Qntd {total}</h4>
            <PropertiesTable>
             <thead>
                 <tr>
                    <th>#</th>
                    <th>Data de transferencia</th>
                    <th>Valentia</th>
                    <th>Tipo</th>
                    <th>Nome de Operador Responsavel</th>
                    <th>
                        <select onChange={limits}>
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                            <option value='15'>15</option>
                            <option value='20'>20</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                       </select>
                        </th>
                    </tr>
                </thead>
             <tbody>
                   { transferencia.slice(((currentPage - 1) * limit), limit).map((t) => (  
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
                    <Conteiner>
                        <PropertiesFooter>
                            <PropertiesFooterButton>
                                {currentPage > 1 && (
                                    <div>
                                        <PropertiesFooterItems onClick={() => setCurrentPage(currentPage - 1)}>Previous</PropertiesFooterItems>
                                            <PropertiesFooterItems onClick={() => setCurrentPage(1)}>First</PropertiesFooterItems>  
                                    </div>
                                )}
                                    
                                    {pages.map((page) => (
                                        <PropertiesFooterItems
                                            isSelect={page === currentPage}
                                            key={page} 
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </PropertiesFooterItems>
                                    ))}
                                {currentPage < pages.length && (
                                    <div>
                                            <PropertiesFooterItems onClick={() => setCurrentPage(currentPage + 1)}>Next</PropertiesFooterItems>
                                        <PropertiesFooterItems onClick={() => setCurrentPage(pages.length)}>Last</PropertiesFooterItems>
                                    </div>
                                )}
                            </PropertiesFooterButton>
                        </PropertiesFooter>
                    </Conteiner>

                
            </PropertiesFooter>
            
        </Conteiner>
    )
}

export default Table;