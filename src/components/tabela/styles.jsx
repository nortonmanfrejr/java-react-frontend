import styled from 'styled-components';

export const Conteiner = styled.div`
  margin: 0 10px;
`;


export const PropertiesTable = styled.table`
    widht: 500px;
    border: 1px solid black;
    border-collapse: collapse;

    th {
        padding:10px;
        background: #bcbcbc;
        border-bottom: 1px solid black;
        border-left: 1px solid black;
        text-align:left;
    }

    tbody{
        widht:500%;

        tr{
            text-align:left;
            border-bottom: 1px solid black;
            border-right: 1px solid black;
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
    min-widht: 500px;
    margin-top: 10px;
 `;

 export const PropertiesFooterButton = styled.div`
    display: flex;
 `;

 export const PropertiesFooterItems = styled.button`
    margin: 0 2px;
    cursor: pointer;

    widht: 50px;
    height: 50px;
    border-radius: 50px;
    text-align: center;
    border: 0px;
    background: white;

    :hover {
        border: 1px solid black;
    }

    ${(props) =>
        props.isSelect && {
        border: '1px solid black',
        color: 'white',
        background: 'gray',
        padding: "0 5px",
        }
    }
 `;

 export const PropertiesInput = styled.input`
    margin: 0 2px;
    cursor: pointer;
 `;

 export const PropertiesSelect = styled.select`
    
 `;