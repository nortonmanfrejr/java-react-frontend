import styled from 'styled-components';

export const Conteiner = styled.div`
    widht:500px;
    background: black;
`;


export const PropertiesTable = styled.table`
    widht: 500px;
    border-collapse: collapse;

    th {
        padding:10px;
        background: #bcbcbc;
        border-bottom: 1px solid black;
        text-align:left;
    }

    tbody{
        widht:50%;

        tr{
            text-align:left;
            border-bottom: 1px solid black;
            
        }

        td{
            padding: 10px;
            text-align: left;
            border-left: 1px solid black;
        }
    }
 `;

 export const PropertiesFooter = styled.div`
    display: flex;
    min-widht: 500pix;
    justify-content: space-between;
    margin-top: 10px;
 `;

 export const PropertiesFooterButton = styled.div`
    display: flex;
    
 `;

 export const PropertiesFooterItems = styled.div`
    margin: 0 10px;
    cursor: pointer;

    ${(props) =>
        props.isSelect && {
          background: '#6d6d6d',
          padding: "0 5px",
        }
    }
 `;
