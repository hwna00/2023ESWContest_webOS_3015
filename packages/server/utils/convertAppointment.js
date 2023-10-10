module.exports = {
  convert: appointmentFromDB => {
    const appointment = {
      uid: appointmentFromDB.user_id,
      name: appointmentFromDB.name,
      email: appointmentFromDB.email,
      phoneNumber: appointmentFromDB.phone_number,
      address: appointmentFromDB.address,
      addressDetail: appointmentFromDB.address_detail,
      secondPhoneNumber: appointmentFromDB.second_phone_number,
      birthDate: appointmentFromDB.birthdate,
      bloodType: appointmentFromDB.bloodtype,
      height: appointmentFromDB.height,
      weight: appointmentFromDB.weight,
      gender: appointmentFromDB.gender,
      regularMedicines: appointmentFromDB.regular_medicines,
      chronicDisease: appointmentFromDB.chronic_disease,
      createdAt: appointmentFromDB.created_at,
      id: appointmentFromDB.id,
      doctorId: appointmentFromDB.doctor_id,
      stateId: appointmentFromDB.state_id,
      NFTFId: appointmentFromDB.NFTF_id,
      date: appointmentFromDB.date,
      time: appointmentFromDB.time,
      message: appointmentFromDB.message,
      isNFTF: appointmentFromDB.is_NFTF,
      updatedAt: appointmentFromDB.updated_at,
      rejectionReason: appointmentFromDB.rejection_reason,
    };

    return appointment;
  },
};
