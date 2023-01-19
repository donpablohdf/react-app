

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      userid: false,
      message: null,
      verifica: null,
      data:null,
    },
    actions: {
      dataFromAPI: async (url) => {
        const store = getStore();
        if (url === "/logout") {
          localStorage.removeItem("jwt-token");
          localStorage.removeItem("userid");
          setStore({ userid: false });
          return true;
        }
        try {
          const token = localStorage.getItem("jwt-token");
          let head = ''
          if (token) {
            head = { Authorization: "Bearer " + token };
          }
          var requestOptions = {
            headers: head,
            redirect: "follow",
          }
          
          await fetch('http://24.199.98.33:3001' + url)
            .then((response) => response.text())
            .then((result) => {
              setStore({ data: JSON.parse(result) });
              
            })
            .catch((error) => console.log("error fetch", error));
        } catch (error) {
          console.log(error)
          return false;
        }
      },

      verifyEmail: async (email) => {
        const store = getStore();
        try {
          var requestOptions = {
            method: "GET",
            redirect: "follow",
          };

          await fetch(
            "https://api.hunter.io/v2/email-verifier?email=" +
            email +
            "&api_key=" +
            process.env.HUNTER_KEY,
            requestOptions
          )
            .then((response) => response.text())
            .then((result) => {
              setStore({ verifica: JSON.parse(result) });
            })
            .catch((error) => console.log("error", error));
        } catch (error) {
          console.log(error);
        }
      },

      solicitudesAPI: async (url, meth, head, bod) => {
        const body = JSON.stringify(bod);
        //console.log(body)
        //console.log(url, meth, head, body);
        const store = getStore();

        await fetch(process.env.BACKEND_URL + url, {
          method: meth,
          headers: head,
          body: body,
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.token && url === "/api/login") {
              localStorage.setItem("jwt-token", data.token);
              localStorage.setItem("userid", data.userid);
              setStore({ userid: true });
              if (store.userid) {
                setStore({ message: null });
                window.location.href = "/userhome";
              }
            } else if (data.error) {
              setStore({ message: "Error en el login" });
            }
            if (data.error) {
              setStore({ message: data.error });
            }
            return data;
          })
          .catch((error) => {
            return "Hubo un problema con la petición Fetch:" + error.message;
          });
      },
      logIn: () => {
        setStore({ userid: true });
        return true;
      },
    },
  };
};

export default getState;
