// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract VotacionContrato {
    address public owner; // Variable para almacenar la dirección del propietario del contrato

    struct Candidato {
        string nombre;
        uint256 votos;
    }

    mapping(uint256 => Candidato) public candidatos;
    mapping(address => bool) public votantes;

    event VotoRealizado(address votante, uint256 candidato);

    constructor() {
        owner = msg.sender; // Asignar el propietario del contrato como la dirección del creador del contrato

        candidatos[0] = Candidato("Candidato 1", 0);
        candidatos[1] = Candidato("Candidato 2", 0);
        candidatos[2] = Candidato("Candidato 3", 0);
        candidatos[3] = Candidato("Candidato 4", 0);
        candidatos[4] = Candidato("Candidato 5", 0);
        candidatos[5] = Candidato("Candidato 6", 0);
    }

    function realizarVoto(uint256 candidato) public {
        require(candidato < 6, "El candidato no existe.");

        candidatos[candidato].votos++;
        votantes[msg.sender] = true;

        emit VotoRealizado(msg.sender, candidato);
    }

    function obtenerResultado(uint256 candidato) public view returns (uint256) {
        require(candidato < 6, "El candidato no existe.");
        return candidatos[candidato].votos;
    }

    function puedeVotar() public view returns (bool) {
        return !votantes[msg.sender];
    }

    function reiniciarVotacion() public {
        require(msg.sender == owner, "Solo el propietario puede reiniciar la votacion");
        for (uint256 i = 0; i < 6; i++) {
            candidatos[i].votos = 0;
        }
        votantes[msg.sender] = false;
    }
}