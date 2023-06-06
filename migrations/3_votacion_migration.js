const Votacion = artifacts.require("VotacionContrato.sol");

module.exports = function (deployer) {
  deployer.deploy(Votacion);
};
