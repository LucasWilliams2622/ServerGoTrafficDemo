const carService = require("./CarService");

const add = async (
  idUser,
  carBrand,
  numberPlate,
  name,
  yearOfManufacture,
  seats,
  gear,
  fuel,

  locationCar,
  latitude,
  longitude,
  description,
  fuelConsumption,
  isDelivery,
  deliveryWithin,
  deliveryFee,
  freeDeliveryWithin,

  limitKmStatus,
  maxKm,
  exceededFee,

  price,
  utilities,
  image,
  imageThumbnail
) => {
  try {
    return await carService.add(
      idUser,
      carBrand,
      numberPlate,
      name,
      yearOfManufacture,
      seats,
      gear,
      fuel,

      locationCar,
      latitude,
      longitude,
      description,
      fuelConsumption,
      isDelivery,
      deliveryWithin,
      deliveryFee,
      freeDeliveryWithin,

      limitKmStatus,
      maxKm,
      exceededFee,

      price,
      utilities,
      image,
      imageThumbnail
    );
  } catch (error) {
    return false;
  }
};

const listCar = async () => {
  try {
    return await carService.listCar();
  } catch (error) {
    return false;
  }
};
const getListCarByIdUser = async (idUser) => {
  try {
    return await carService.getListCarByIdUser(idUser);
  } catch (error) {
    return false;
  }
};

const getListCarByCarBrand = async (carBrand) => {
  try {
    return await carService.getListCarByCarBrand(carBrand);
  } catch (error) {
    return false;
  }
};

const deleteCar = async (idCar) => {
  try {
    return await carService.deleteCar(idCar);
  } catch (error) {
    return false;
  }
};

const updateCar = async (
  idCar,
  numberPlate,
  locationCar,
  latitude,
  longitude,
  description,
  fuelConsumption,
  utilities
) => {
  try {
    return await carService.updateCar(
      idCar,
      numberPlate,
      locationCar,
      latitude,
      longitude,
      description,
      fuelConsumption,
      utilities
    );
  } catch (error) {
    return false;
  }
};

const getById = async (idCar) => {
  try {
    return await carService.getById(idCar);
  } catch (error) {
    return false;
  }
};

const browse = async (idCar) => {
  try {
    return await carService.browse(idCar);
  } catch (error) {
    return false;
  }
};

const updateImageCar = async (
  idCar,
  image,
  imageThumbnail,
  imageRegister,
  imageRegistry,
  imageInsurance
) => {
  try {
    return await carService.updateImageCar(
      idCar,
      image,
      imageThumbnail,
      imageRegister,
      imageRegistry,
      imageInsurance
    );
  } catch (error) {
    return false;
  }
};

const searchByCity = async (city, district, ward) => {
  try {
    return await carService.searchByCity(city, district, ward);
  } catch (error) {}
};

const getCarByCity = async (city) => {
  try {
    return await carService.getCarByCity(city);
  } catch (error) {}
};

const getSortedCars = async (
  carBrand,
  yearOfManufacture,
  seats,
  gear,
  fuel,

  isDelivery,
  withDriver,

  rating,
  ratingStatus,
  minPrice,
  maxPrice
) => {
  try {
    return await carService.getSortedCars(
      carBrand,
      yearOfManufacture,
      seats,
      gear,
      fuel,

      isDelivery,
      withDriver,

      rating,
      ratingStatus,
      minPrice,
      maxPrice
    );
  } catch (error) {}
};

const getNotBrowseCar = async () => {
  try {
    return await carService.getNotBrowseCar();
  } catch (error) {}
};

const refuseCar = async (idCar) => {
  try {
    return await carService.refuseCar(idCar);
  } catch (error) {}
};

const updateSurchargeCar = async (
  idCar,
  limitKmStatus,
  maxKm,
  exceededFee,

  overtimeStatus,
  overtimeCharge,
  overtimeDay,

  carCleanStatus,
  carCleanFee,

  carDeodorizerStatus,
  carDeodorizerFee
) => {
  try {
    return await carService.updateSurchargeCar(
      idCar,
      limitKmStatus,
      maxKm,
      exceededFee,

      overtimeStatus,
      overtimeCharge,
      overtimeDay,

      carCleanStatus,
      carCleanFee,

      carDeodorizerStatus,
      carDeodorizerFee
    );
  } catch (error) {}
};

const updateDeliveredOnSite = async (
  idCar,
  isDelivery,
  deliveryWithin,
  deliveryFee,
  freeDeliveryWithin
) => {
  try {
    return await carService.updateDeliveredOnSite(
      idCar,
      isDelivery,
      deliveryWithin,
      deliveryFee,
      freeDeliveryWithin
    );
  } catch (error) {}
};

const getCarHasDriver = async () => {
  try {
    return await carService.getCarHasDriver();
  } catch (error) {}
};

const getSortedCarsByLocationAndTime = async (location, timeStart, timeEnd) => {
  try {
    return await carService.getSortedCarsByLocationAndTime(
      location,
      timeStart,
      timeEnd
    );
  } catch (error) {}
};

const getTheMostBookedCar = async (isMostBooked) => {
  try {
    return await carService.getTheMostBookedCar(isMostBooked);
  } catch (error) {}
}
module.exports = {
  add,
  getListCarByIdUser,
  getListCarByCarBrand,
  deleteCar,
  updateCar,
  browse,
  listCar,
  getById,
  updateImageCar,
  searchByCity,
  getCarByCity,
  getSortedCars,
  getNotBrowseCar,
  updateSurchargeCar,
  refuseCar,
  updateDeliveredOnSite,
  getCarHasDriver,
  getSortedCarsByLocationAndTime,
  getTheMostBookedCar
};

const carService = require("./CarService");

const add = async (
  idUser,
  carBrand,
  numberPlate,
  name,
  yearOfManufacture,
  seats,
  gear,
  fuel,

  locationCar,
  latitude,
  longitude,
  description,
  fuelConsumption,
  isDelivery,
  deliveryWithin,
  deliveryFee,
  freeDeliveryWithin,

  limitKmStatus,
  maxKm,
  exceededFee,

  price,
  utilities,
  image,
  imageThumbnail
) => {
  try {
    return await carService.add(
      idUser,
      carBrand,
      numberPlate,
      name,
      yearOfManufacture,
      seats,
      gear,
      fuel,

      locationCar,
      latitude,
      longitude,
      description,
      fuelConsumption,
      isDelivery,
      deliveryWithin,
      deliveryFee,
      freeDeliveryWithin,

      limitKmStatus,
      maxKm,
      exceededFee,

      price,
      utilities,
      image,
      imageThumbnail
    );
  } catch (error) {
    return false;
  }
};

const listCar = async () => {
  try {
    return await carService.listCar();
  } catch (error) {
    return false;
  }
};
const getListCarByIdUser = async (idUser) => {
  try {
    return await carService.getListCarByIdUser(idUser);
  } catch (error) {
    return false;
  }
};

const getListCarByCarBrand = async (carBrand) => {
  try {
    return await carService.getListCarByCarBrand(carBrand);
  } catch (error) {
    return false;
  }
};

const deleteCar = async (idCar) => {
  try {
    return await carService.deleteCar(idCar);
  } catch (error) {
    return false;
  }
};

const updateCar = async (
  idCar,
  numberPlate,
  locationCar,
  latitude,
  longitude,
  description,
  fuelConsumption,
  utilities
) => {
  try {
    return await carService.updateCar(
      idCar,
      numberPlate,
      locationCar,
      latitude,
      longitude,
      description,
      fuelConsumption,
      utilities
    );
  } catch (error) {
    return false;
  }
};

const getById = async (idCar) => {
  try {
    return await carService.getById(idCar);
  } catch (error) {
    return false;
  }
};

const browse = async (idCar) => {
  try {
    return await carService.browse(idCar);
  } catch (error) {
    return false;
  }
};

const updateImageCar = async (
  idCar,
  image,
  imageThumbnail,
  imageRegister,
  imageRegistry,
  imageInsurance
) => {
  try {
    return await carService.updateImageCar(
      idCar,
      image,
      imageThumbnail,
      imageRegister,
      imageRegistry,
      imageInsurance
    );
  } catch (error) {
    return false;
  }
};

const searchByCity = async (city, district, ward) => {
  try {
    return await carService.searchByCity(city, district, ward);
  } catch (error) {}
};

const getCarByCity = async (city) => {
  try {
    return await carService.getCarByCity(city);
  } catch (error) {}
};

const getSortedCars = async (
  carBrand,
  yearOfManufacture,
  seats,
  gear,
  fuel,

  isDelivery,
  withDriver,

  rating,
  ratingStatus,
  minPrice,
  maxPrice
) => {
  try {
    return await carService.getSortedCars(
      carBrand,
      yearOfManufacture,
      seats,
      gear,
      fuel,

      isDelivery,
      withDriver,

      rating,
      ratingStatus,
      minPrice,
      maxPrice
    );
  } catch (error) {}
};

const getNotBrowseCar = async () => {
  try {
    return await carService.getNotBrowseCar();
  } catch (error) {}
};

const refuseCar = async (idCar) => {
  try {
    return await carService.refuseCar(idCar);
  } catch (error) {}
};

const updateSurchargeCar = async (
  idCar,
  limitKmStatus,
  maxKm,
  exceededFee,

  overtimeStatus,
  overtimeCharge,
  overtimeDay,

  carCleanStatus,
  carCleanFee,

  carDeodorizerStatus,
  carDeodorizerFee
) => {
  try {
    return await carService.updateSurchargeCar(
      idCar,
      limitKmStatus,
      maxKm,
      exceededFee,

      overtimeStatus,
      overtimeCharge,
      overtimeDay,

      carCleanStatus,
      carCleanFee,

      carDeodorizerStatus,
      carDeodorizerFee
    );
  } catch (error) {}
};

const updateDeliveredOnSite = async (
  idCar,
  isDelivery,
  deliveryWithin,
  deliveryFee,
  freeDeliveryWithin
) => {
  try {
    return await carService.updateDeliveredOnSite(
      idCar,
      isDelivery,
      deliveryWithin,
      deliveryFee,
      freeDeliveryWithin
    );
  } catch (error) {}
};

const getCarHasDriver = async () => {
  try {
    return await carService.getCarHasDriver();
  } catch (error) {}
};

const getSortedCarsByLocationAndTime = async (location, timeStart, timeEnd) => {
  try {
    return await carService.getSortedCarsByLocationAndTime(
      location,
      timeStart,
      timeEnd
    );
  } catch (error) {}
};

const getTheMostBookedCar = async (isMostBooked) => {
  try {
    return await carService.getTheMostBookedCar(isMostBooked);
  } catch (error) {}
}
module.exports = {
  add,
  getListCarByIdUser,
  getListCarByCarBrand,
  deleteCar,
  updateCar,
  browse,
  listCar,
  getById,
  updateImageCar,
  searchByCity,
  getCarByCity,
  getSortedCars,
  getNotBrowseCar,
  updateSurchargeCar,
  refuseCar,
  updateDeliveredOnSite,
  getCarHasDriver,
  getSortedCarsByLocationAndTime,
  getTheMostBookedCar
};
