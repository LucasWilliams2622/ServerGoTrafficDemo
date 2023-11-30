const BookingService = require("./BookingService");

const add = async ({
  idUser,
  idCar,
  timeFrom,
  timeTo,
  totalMoney,
  location,
}) => {
  try {
    const booking = await BookingService.add({
      idUser,
      idCar,
      timeFrom,
      timeTo,
      totalMoney,
      location,
    });
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const accept = async (id) => {
  try {
    const booking = await BookingService.accept(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const process = async (id) => {
  try {
    const booking = await BookingService.process(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const receive = async (id) => {
  try {
    const booking = await BookingService.receive(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const complete = async (id) => {
  try {
    const booking = await BookingService.complete(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const reject = async (id) => {
  try {
    const booking = await BookingService.reject(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getById = async (id) => {
  try {
    const booking = await BookingService.getById(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getAll = async () => {
  try {
    const booking = await BookingService.getAll();
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getByOwnerId = async (id) => {
  try {
    const booking = await BookingService.getByOwnerId(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getByRenterId = async (id) => {
  try {
    const booking = await BookingService.getByRenterId(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const cancel = async (id) => {
  try {
    const booking = await BookingService.cancel(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const cancelByOwner = async (id) => {
  try {
    const booking = await BookingService.cancelByOwner(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getListPending = async (idOwner) => {
  try {
    const booking = await BookingService.getListPending(idOwner);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getListProcessing = async (idOwner) => {
  try {
    const booking = await BookingService.getListProcessing(idOwner);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getListComplete = async (idOwner) => {
  try {
    const booking = await BookingService.getListComplete(idOwner);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getListCancel = async (idOwner) => {
  try {
    const booking = await BookingService.getListCancel(idOwner);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getListCurrentOfUser = async (idUser) => {
  try {
    const booking = await BookingService.getListCurrentOfUser(idUser);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

module.exports = {
  add,
  accept,
  process,
  receive,
  reject,
  complete,
  getById,
  getAll,
  getByOwnerId,
  getByRenterId,
  cancel,
  cancelByOwner,
  getListPending,
  getListProcessing,
  getListComplete,
  getListCancel,
  getListCurrentOfUser
};

const BookingService = require("./BookingService");

const add = async ({
  idUser,
  idCar,
  timeFrom,
  timeTo,
  totalMoney,
  location,
}) => {
  try {
    const booking = await BookingService.add({
      idUser,
      idCar,
      timeFrom,
      timeTo,
      totalMoney,
      location,
    });
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const accept = async (id) => {
  try {
    const booking = await BookingService.accept(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const process = async (id) => {
  try {
    const booking = await BookingService.process(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const receive = async (id) => {
  try {
    const booking = await BookingService.receive(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const complete = async (id) => {
  try {
    const booking = await BookingService.complete(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const reject = async (id) => {
  try {
    const booking = await BookingService.reject(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getById = async (id) => {
  try {
    const booking = await BookingService.getById(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getAll = async () => {
  try {
    const booking = await BookingService.getAll();
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getByOwnerId = async (id) => {
  try {
    const booking = await BookingService.getByOwnerId(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getByRenterId = async (id) => {
  try {
    const booking = await BookingService.getByRenterId(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const cancel = async (id) => {
  try {
    const booking = await BookingService.cancel(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const cancelByOwner = async (id) => {
  try {
    const booking = await BookingService.cancelByOwner(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getListPending = async (idOwner) => {
  try {
    const booking = await BookingService.getListPending(idOwner);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getListProcessing = async (idOwner) => {
  try {
    const booking = await BookingService.getListProcessing(idOwner);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getListComplete = async (idOwner) => {
  try {
    const booking = await BookingService.getListComplete(idOwner);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getListCancel = async (idOwner) => {
  try {
    const booking = await BookingService.getListCancel(idOwner);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getListCurrentOfUser = async (idUser) => {
  try {
    const booking = await BookingService.getListCurrentOfUser(idUser);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

module.exports = {
  add,
  accept,
  process,
  receive,
  reject,
  complete,
  getById,
  getAll,
  getByOwnerId,
  getByRenterId,
  cancel,
  cancelByOwner,
  getListPending,
  getListProcessing,
  getListComplete,
  getListCancel,
  getListCurrentOfUser
};
