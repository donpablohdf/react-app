import React, { useContext, useState, useEffect } from "react";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { Context } from "../../store/appContext";
import '../../css/App.css'
function App() {
  const clientId = '947353548654-r37sov1ij6j67tlucjat853tclofhgig.apps.googleusercontent.com';


  const onSuccess = (res) => {
    console.log('success:', res);
  };
  const onFailure = (err) => {
    console.log('failed:', err);
  };
  //console.clear()
  const { actions, store } = useContext(Context);

  const [usuario, setUsuario] = useState(store.data);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id:'947353548654-r37sov1ij6j67tlucjat853tclofhgig.apps.googleusercontent.com',
        callback: onSuccess,
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "signin_with",
        shape: "pill",
      });

      // google.accounts.id.prompt()
    }
  }, [onSuccess]);
  useEffect(() => {

    actions.dataFromAPI("/api/usuario/1").then((datos) => {
      setUsuario(store.data);
      store.data = null
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
      <div id="loginDiv"></div>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <div id="g_id_onload"
        data-client_id={clientId}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="onSuccess"
        data-auto_prompt="false">
      </div>
      <button>
      <div className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="filled_blue"
        data-text="continue_with"
        data-size="large"
        data-locale="es"
        data-logo_alignment="left"> 
      </div>
      </button>

      <h1>
        {usuario.nombre}
      </h1>


    </div>
  );
}

export default App;
