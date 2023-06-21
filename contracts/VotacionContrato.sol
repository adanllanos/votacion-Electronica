// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract VotacionContrato {
    address public owner; 

    struct Candidato {
        string nombre;
        uint256 votos;
    }

    mapping(uint256 => Candidato) public candidatos;
    mapping(address => bool) public votantes;

    Candidato public primerCandidatoSegundaVuelta;
    Candidato public segundoCandidatoSegundaVuelta;

    event VotoRealizado(address votante, uint256 candidato, bool segundaVuelta);

    constructor() {
        owner = msg.sender;

        candidatos[0] = Candidato("Candidato 1", 0);
        candidatos[1] = Candidato("Candidato 2", 0);
        candidatos[2] = Candidato("Candidato 3", 0);
        candidatos[3] = Candidato("Candidato 4", 0);
        candidatos[4] = Candidato("Candidato 5", 0);
        candidatos[5] = Candidato("Candidato 6", 0);
    }

    function realizarVoto(uint256 candidato, bool segundaVuelta) public {
        require(candidato < 6, "El candidato no existe.");

        if (segundaVuelta) {
            require(candidato == 0 || candidato == 1, "Solo se permite votar por los candidatos de la segunda vuelta.");
            if (candidato == 0) {
                primerCandidatoSegundaVuelta.votos++;
            } else if (candidato == 1) {
                segundoCandidatoSegundaVuelta.votos++;
            }
        } else {
            candidatos[candidato].votos++;
        }

        votantes[msg.sender] = true;

        emit VotoRealizado(msg.sender, candidato, segundaVuelta);
    }

    function obtenerResultado(uint256 candidato, bool segundaVuelta) public view returns (uint256) {
        require(candidato < 6, "El candidato no existe.");

        if (segundaVuelta) {
            require(candidato == 0 || candidato == 1, "Solo se permite obtener el resultado de los candidatos de la segunda vuelta.");
            if (candidato == 0) {
                return primerCandidatoSegundaVuelta.votos;
            } else if (candidato == 1) {
                return segundoCandidatoSegundaVuelta.votos;
            }
        } else {
            return candidatos[candidato].votos;
        }
        return 0;
    }

    function puedeVotar() public view returns (bool) {
        return !votantes[msg.sender];
    }

    function reiniciarVotacion() public {
        require(msg.sender == owner, "Solo el propietario puede reiniciar la votacion");

        for (uint256 i = 0; i < 6; i++) {
            candidatos[i].votos = 0;
        }
        primerCandidatoSegundaVuelta = Candidato("", 0);
        segundoCandidatoSegundaVuelta = Candidato("", 0);
    }

    function iniciarSegundaVuelta(string memory nombrePrimerCandidato, string memory nombreSegundoCandidato) public {
        require(msg.sender == owner, "Solo el propietario puede iniciar la segunda vuelta");
        primerCandidatoSegundaVuelta = Candidato(nombrePrimerCandidato, 0);
        segundoCandidatoSegundaVuelta = Candidato(nombreSegundoCandidato, 0);
    }
}
