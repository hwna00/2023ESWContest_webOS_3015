module.exports = appointmentRows => {
  const result = {
    aw: [],
    ac: [],
    dc: [],
    pc: [],
    ar: [],
  };

  for (let i = 0; i < appointmentRows.length; i += 1) {
    switch (appointmentRows[i].state_id) {
      case 'aw':
        result.aw.push(appointmentRows[i]);
        break;
      case 'ac':
        result.ac.push(appointmentRows[i]);
        break;
      case 'dc':
        result.dc.push(appointmentRows[i]);
        break;
      case 'pc':
        result.pc.push(appointmentRows[i]);
        break;
      case 'ar':
        result.ar.push(appointmentRows[i]);
        break;
      default:
        break;
    }
  }

  return result;
};
