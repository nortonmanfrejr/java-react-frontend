import React, { Component }from "react"
import api from "./api"


class App extends Component {

  states = {
    transferencia: []
  }

  async componentDidMount(){
    const response = await api.get('')
    this.setState({transferencia : response.data})
  }

  render() {

    return(
      <div>
        <h1>Listar Transferencias</h1>
      </div>
    );
  }
}

export default App