module.exports = {
  convert: emergencyFromDB => {
    const emergency = {
      id: emergencyFromDB.id,
      uid: emergencyFromDB.user_id,
      username: emergencyFromDB.name,
      email: emergencyFromDB.email,
      phoneNumber: emergencyFromDB.phone_number,
      address: emergencyFromDB.address,
      addressDetail: emergencyFromDB.address_detail,
      secondPhoneNumber: emergencyFromDB.second_phone_number,
      birthDate: emergencyFromDB.birthdate,
      bloodType: emergencyFromDB.bloodtype,
      height: emergencyFromDB.height,
      weight: emergencyFromDB.weight,
      gender: emergencyFromDB.gender,
      regularMedicines: emergencyFromDB.regular_medicines,
      chronicDisease: emergencyFromDB.chronic_disease,
      isCompleted: emergencyFromDB.is_completed,
    };

    return emergency;
  },
};
