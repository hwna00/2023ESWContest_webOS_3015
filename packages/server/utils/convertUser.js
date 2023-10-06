module.exports = {
  convertFromDB: userFromDB => {
    const user = {
      uid: userFromDB.user_id,
      email: userFromDB.email,
      username: userFromDB.name,
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
  },
  convertFromNaver: userFromNaver => {
    const user = {
      uid: userFromNaver.id,
      email: userFromNaver.email,
      username: userFromNaver.name,
      address: '',
      addressDetail: '',
      phoneNumber: userFromNaver.mobile.replace(/-/g, ''),
      secondPhoneNumber: '',
      birthDate: `${userFromNaver.birthyear}-${userFromNaver.birthday}`,
      bloodType: '',
      height: '',
      weight: '',
      gender: userFromNaver.gender, // 여자일 경우 F인지 확인 필요
      regularMedicines: '',
      chronicDisease: '',
      // TODO 프로필이미지 링크는 별도로
    };

    return user;
  },
  convertFromKakao: userFromKakao => {
    const user = {
      uid: userFromKakao.id,
      email: userFromKakao.kakao_account.email,
      username: userFromKakao.kakao_account.name,
      address: '',
      addressDetail: '',
      phoneNumber: `0${userFromKakao.kakao_account.phone_number
        .slice(4)
        .replace(/-/g, '')}`, // "+82 10-9338-2022"
      secondPhoneNumber: '',
      birthDate: `${
        userFromKakao.kakao_account.birthyear
      }-${userFromKakao.kakao_account.birthday.slice(
        0,
        2,
      )}-${userFromKakao.kakao_account.birthday.slice(2)}`,
      bloodType: '',
      height: '',
      weight: '',
      gender: userFromKakao.kakao_account.gender === 'male' ? 'M' : 'F',
      regularMedicines: '',
      chronicDisease: '',
      // TODO 프로필이미지 링크는 별도로
    };

    return user;
  },
};
