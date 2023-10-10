module.exports = {
  convert: hospitalFromDB => {
    const { hospital_id, ...rest } = hospitalFromDB;
    const hospital = {
      hospitalId: hospital_id,
      ...rest,
    };

    return hospital;
  },
  convertAppointments: appointmentsFromDB => {
    const appointments = appointmentsFromDB.map(appointment => ({
      id: appointment.id,
      uid: appointment.user_id,
      patientName: appointment.user_name,
      doctorId: appointment.doctor_id,
      doctorName: appointment.doctor_name,
      stateId: appointment.state_id,
      NFTFId: appointment.NFTF_id,
      date: appointment.date,
      time: appointment.time,
      message: appointment.message,
      isNFTF: appointment.is_NFTF,
      updatedAt: appointment.updated_at,
      rejectionReason: appointment.rejection_reason,
    }));

    return appointments;
  },
};
