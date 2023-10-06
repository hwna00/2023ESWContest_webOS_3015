module.exports = hospitalFromDB => {
  const { hospital_id, ...rest } = hospitalFromDB;
  const hospital = {
    hospitalId: hospital_id,
    ...rest,
  };

  return hospital;
};
