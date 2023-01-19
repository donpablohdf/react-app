import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import '../../css/App.css'
function App() {
  //console.clear()
  const { actions, store } = useContext(Context);

  const [usuario, setUsuario] = useState(store.data);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    /*actions.dataFromAPI("/api/usuario/1").then((datos) => {
      console.log(datos)
      setUsuario(datos);
      setIsLoading(false);
    });*/
    const promesa = () => {
      return new Promise((resolve, reject) => {
        resolve(actions.dataFromAPI("/api/usuario/1"));
      });
    };
    promesa().then((datos) => {
      setUsuario(store.data);
      store.data=null
      setIsLoading(false);
    });

  }, []);

  if (isLoading) {
    return (
      <div>
        <h1>Cargando...</h1>
      </div>
    );
  }
  return (
    <div className="container bg-info">


      <h1>
        {usuario.nombre}
      </h1>


    </div>
  );
}

export default App;
