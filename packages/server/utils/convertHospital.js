module.exports = hospitalFromDB => {
  const { hospital_id, ...rest } = hospitalFromDB;
  const hospital = {
    id: hospital_id,
    ...rest,
  };

  return hospital;
};
