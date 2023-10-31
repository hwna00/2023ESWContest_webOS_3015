module.exports = vitalSignsFromDB => {
  const vitalSigns = {
    heartRate: [],
    temperature: [],
  };

  for (let i = 0; i < vitalSignsFromDB.length; i += 1) {
    switch (vitalSignsFromDB[i].type) {
      case 'heartRate':
        vitalSigns.heartRate.push(vitalSignsFromDB[i]);
        break;
      case 'temperature':
        vitalSigns.temperature.push(vitalSignsFromDB[i]);
        break;
      default:
        break;
    }
  }

  return vitalSigns;
};
