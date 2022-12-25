import React, { Component }from "react"

import { Conteiner } from "./components/tabela/styles";

import Table from "./components/tabela/tabela";


class App extends Component {

  render() {

    return(
      <Conteiner>
        <h1>Transferencias</h1>
        <Conteiner>
          <Table />        
        </Conteiner>
      </Conteiner>
    );
  }
}

export default App