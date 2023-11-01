module.exports = favooritesFromDB => {
  const Favorites = {
    doctors: [],
    hospitals: [],
  };

  for (let i = 0; i < favooritesFromDB.length; i += 1) {
    switch (favooritesFromDB[i].type) {
      case 'doctor':
        Favorites.doctors.push(favooritesFromDB[i]);
        break;
      case 'hospital':
        Favorites.hospitals.push(favooritesFromDB[i]);
        break;
      default:
        break;
    }
  }

  return Favorites;
};
