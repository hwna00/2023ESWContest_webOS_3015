module.exports = appointmentsFromDB => {
  const appointments = {
    aw: [],
    ac: [],
    dc: [],
    pc: [],
    ar: [],
  };

  for (let i = 0; i < appointmentsFromDB.length; i += 1) {
    switch (appointmentsFromDB[i].stateId) {
      case 'aw':
        appointments.aw.push(appointmentsFromDB[i]);
        break;
      case 'ac':
        appointments.ac.push(appointmentsFromDB[i]);
        break;
      case 'dc':
        appointments.dc.push(appointmentsFromDB[i]);
        break;
      case 'pc':
        appointments.pc.push(appointmentsFromDB[i]);
        break;
      case 'ar':
        appointments.ar.push(appointmentsFromDB[i]);
        break;
      default:
        break;
    }
  }

  return appointments;
};
