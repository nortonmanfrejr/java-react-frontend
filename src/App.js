import React, { Component }from "react"

import Table from "./components/tabela/tabela"


class App extends Component {

  render() {

    return(
      <div>
        <h1>Listar Transferencias com Paginação</h1>
        <Table />
      </div>
    );
  }
}

export default App