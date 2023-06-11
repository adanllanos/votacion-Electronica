
App = {
    contracts:{},
    init: async () => {
      console.log("loaded");
      await App.loadWeb3();
      await App.loadAccount();
      await App.loadContract();
      await App.render();
    },

    loadWeb3: async () => {
        if (window.ethereum) {
          App.web3Provider = window.ethereum; 
          await window.ethereum.request({ method: "eth_requestAccounts" });
        } else if (web3) {
          web3 = new Web3(window.web3.currentProvider);
        } else {
          console.log(
            "No ethereum browser is installed. Try it installing MetaMask "
          );
        }
      },
      loadContract: async () => {
        try {
          const res = await fetch("VotacionContrato.json");
          const votacionContratoJSON = await res.json();
           
          App.contracts.VotacionContrato = TruffleContract(votacionContratoJSON);
          App.contracts.VotacionContrato.setProvider(App.web3Provider);
    
          App.votacionContrato = await App.contracts.VotacionContrato.deployed();
        } catch (error) {
          console.error(error);
        }
      },
      RealizarVoto: async (candicato) =>{
        const res = await App.votacionContrato.realizarVoto(candicato, {
            from: App.account
        });
        console.log(res.logs[0].args)
      },
      loadAccount: async () => {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        App.account = accounts[0];
      },
      render: async () => {
        document.getElementById("account").innerText = App.account;
      },
      renderResultados: async () => {
        const resultadosDiv = document.getElementById("resultados");
        const tabla = document.createElement("table");
        const thead = document.createElement("thead");
        const encabezadoFila = document.createElement("tr");
      
        const encabezadoCandidato = document.createElement("th");
        encabezadoCandidato.textContent = "Candidato";
        encabezadoCandidato.classList.add("bg-dark");
        encabezadoFila.appendChild(encabezadoCandidato);
      
        const encabezadoVotos = document.createElement("th");
        encabezadoVotos.textContent = "Votos";
        encabezadoVotos.classList.add("bg-dark");
        encabezadoFila.appendChild(encabezadoVotos);
      
        thead.appendChild(encabezadoFila);
        tabla.appendChild(thead);
      
        let contenidoTabla = "";
      
        for (let i = 0; i <= 5; i++) {
          const resultado = await App.votacionContrato.obtenerResultado(i);
          const votos = resultado.toNumber();
          const candidatoNombre = await App.votacionContrato.candidatos(i);
      
          contenidoTabla += `<tr><td>${candidatoNombre.nombre}</td><td>${votos}</td></tr>`;
        }
      
        tabla.innerHTML += contenidoTabla;
      
        resultadosDiv.innerHTML = "";
        resultadosDiv.appendChild(tabla);
      },
      
      
      
      

  }