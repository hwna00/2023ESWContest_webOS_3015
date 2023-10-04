module.exports = userFromDB => {
  const user = {
    uid: userFromDB.user_id,
    email: userFromDB.email,
    name: userFromDB.name,
    address: userFromDB.address,
    addressDetail: userFromDB.address_detail,
    phoneNumber: userFromDB.phone_number,
    secondPhoneNumber: userFromDB.second_phone_number,
    birthDate: userFromDB.birthdate,
    bloodType: userFromDB.bloodtype,
    height: userFromDB.height,
    weight: userFromDB.weight,
    gender: userFromDB.gender,
    regularMedicines: userFromDB.regular_medicines,
    chronicDisease: userFromDB.chronic_disease,
  };

  return user;
};
