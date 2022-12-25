import React, { useState, useEffect, useCallback } from "react";

import { 
    Conteiner, 
    PropertiesTable, 
    PropertiesFooter, 
    PropertiesFooterButton, 
    PropertiesFooterItems,
    PropertiesInput
} from "./styles";

import api from "../../services/api"

function Table() {

    const [transferencia, setTransferencia] = useState([]); // Salva o request
    const [total, setTotal] = useState(); // Total de itens no request
    const [limit, setLimit] = useState(5); // Limite de dados que irão aparecer na tabela
    const [pages, setPages] = useState([]); // Total de paginas
    const [currentPage, setCurrentPage] = useState(1); // Pagina atual

    const [init, setInitDate] = useState(); // data inicial
    const [end, setFinDate] = useState(); // data final
    const [nomeOperador, setNomeOperador] = useState(); // nome de operador

    const transferenciaTotal = transferencia.map(t => t.valor).reduce((prev, curr) => prev + curr, 0); // valentia total

    useEffect(() => {

        async function loadTransferencia() {
            const response = await api.get(`/transferencia`); 
            
            setTotal(() => {
                return transferencia.length;
            });

            const totalPages = Math.ceil((total / limit) + 1);

            const arrayPages = [];
            for (let i = 1; i < totalPages; i++){
                arrayPages.push(i);
            }
            
            setPages(arrayPages);
            setTransferencia(response.data);
        }
        loadTransferencia();
      }, [currentPage,limit,total]);

      
    const handleSubmitted = useCallback(() => {
        api.get(`/transferencia/`, {
            params: { // passando parametros de busca
                'init': init || null,
                'end': end || null,
                'nomeOperador': nomeOperador || ''
            }

    }).then((response) => { 
            
        setTransferencia(response.data);
    
        setTotal(() => {
            return transferencia.length;
         });

        const totalPages = Math.ceil((total / limit) + 1);

        const arrayPages = [];
        for (let i = 1; i < totalPages; i++){
            arrayPages.push(i);
        }
            
        setPages(arrayPages);

        Array.from(document.querySelectorAll('input')).forEach(
            input => (input.value = '')
        );
        
        setInitDate(null);
        setFinDate(null);
        setNomeOperador('');
        }).catch(err => {console.log(err)});

    }, [init, end, nomeOperador, transferencia]);  

    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    const handleInitDate = (e) => {
        setInitDate(e.target.value.toLocaleString('pt-BR'));
    };

    const handleFinDate = (e) => {
        setFinDate(e.target.value.toLocaleString('pt-BR'));
    };

    const handleNomeOperador = (e) => {
        setNomeOperador(e.target.value);
    };

    return (
        <Conteiner>
            <PropertiesFooter>
               <Conteiner>
                <h4>Data de Inicio</h4>
                <PropertiesInput 
                type={'datetime-local'}
                onChange={handleInitDate}
                >
                </PropertiesInput>
            </Conteiner> 
            <Conteiner>
                <h4>Data de Final</h4>
                <PropertiesInput 
                type={'datetime-local'}
                onChange={handleFinDate}
                >
                </PropertiesInput>
            </Conteiner> 
            <Conteiner>
                <h4>Operador responsavel</h4>
                <PropertiesInput
                 type={'text'}
                 onChange={handleNomeOperador}
                >
                </PropertiesInput>
            </Conteiner>
            </PropertiesFooter>
            <Conteiner>
                <PropertiesFooter>
                    <Conteiner>
                        <PropertiesFooterItems
                        onClick={handleSubmitted}
                        >   
                        <h4>Buscar</h4>
                        </PropertiesFooterItems>
                   </Conteiner>
                </PropertiesFooter>
            </Conteiner>
            <PropertiesFooter>
                <PropertiesFooterItems>
                    <h4>Saldo total: R${
                        transferenciaTotal.toFixed(2)
                }</h4>
                </PropertiesFooterItems>
                <PropertiesFooterItems>
                    <h4>Saldo no período: R${
                        transferenciaTotal.toFixed(2)
                }</h4>
                </PropertiesFooterItems>
            </PropertiesFooter>
            <PropertiesTable>
             <thead>
                 <tr>
                    <th>Nº</th>
                    <th>Data de transferencia</th>
                    <th>Valentia</th>
                    <th>Tipo</th>
                    <th>Operador Responsavel</th>
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
                   { 
                   transferencia.slice((currentPage - 1) * limit, currentPage * limit).map((t) => (  
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
                    </Conteiner>
            </PropertiesFooter>
            
        </Conteiner>
    )
}

export default Table;