const productionURL = 'https://app.gromit.io'

module.exports = () => localStorage['gromit.serverUrl'] || productionURL