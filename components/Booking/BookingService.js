const { Sequelize } = require("sequelize");
const moment = require("moment");
const db = require("../../components/indexModel");
const BookingModel = db.bookings;
const NBModel = db.notificationbookings;

const current = moment().format("YYYY-MM-DD HH:mm:ss");

const add = async ({
  idUser,
  idCar,
  timeFrom,
  timeTo,
  totalMoney,
  location,
}) => {
  try {
    const { Op } = Sequelize;
    const lastBooking = await BookingModel.max("id");

    const check = await BookingModel.findAll({
      where: {
        idCar: idCar,
        timeFrom: { [Sequelize.Op.lte]: timeTo },
        timeTo: { [Sequelize.Op.gte]: timeFrom },
      },
    });
    if (check.length > 0) {
      return false;
    }

    //api tru coc
    const user = await db.users.findOne({
      where: {
        id: idUser,
      },
    });
    const surplus = user.surplus - totalMoney * 0.3;

    await db.users.update(
      {
        surplus: surplus,
      },
      {
        where: {
          id: idUser,
        },
      }
    );
    await NBModel.create({
      idUser: idUser,
      idBooking: lastBooking + 1,
      title: "Thông báo thuê xe",
      content: "Yêu cầu thuê xe đã được gửi đến chủ xe thành công",
      image: "https://i.ytimg.com/vi/qzU_q6qhsaQ/maxresdefault.jpg",
      isRead: false,
    });

    const booking = await BookingModel.create({
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

const getById = async (id) => {
  try {
    const booking = await BookingModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: db.users,
          as: "User",
          attributes: ["id", "name", "phone", "email", "address"],
        },
        {
          model: db.cars,
          as: "Car",
          attributes: ["id", "name", "price", "image", "description", "status"],
        },
      ],
    });
    if (booking === null) {
      return false;
    }

    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const accept = async (id) => {
  try {
    const booking = await BookingModel.findOne({
      where: {
        id: id,
      },
    });
    await booking.update(
      {
        status: 2, //status = success
        updatedAt: current,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (booking === null) {
      return false;
    }

    const car = await db.cars.findOne({
      where: {
        id: booking.idCar,
      },
    });
    await NBModel.create({
      idUser: booking.idUser,
      idBooking: id,
      title: "Thông báo thuê xe",
      content: "Yêu cầu thuê xe đã được xác nhận cho thuê thành công !",
      image: "https://i.ytimg.com/vi/qzU_q6qhsaQ/maxresdefault.jpg",
      isRead: false,
    });
    await car.update(
      {
        status: 2,
      },
      {
        where: {
          id: booking.idCar,
        },
      }
    );
    if (car === null) {
      return false;
    }
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const process = async (id) => {
  try {
    const booking = await BookingModel.update(
      {
        status: 3, //status = process
        updatedAt: current,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (booking === null) {
      return false;
    }
    //gui thong bao cho nguoi thue
    await NBModel.create({
      idUser: booking.idUser,
      idBooking: id,
      title: "Thông báo thuê xe",
      content: "Xe đang được giao tới bạn !",
      image: "https://i.ytimg.com/vi/qzU_q6qhsaQ/maxresdefault.jpg",
      isRead: false,
    });
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const receive = async (id) => {
  try {
    const booking = await BookingModel.findOne({
      where: {
        id: id,
      },
    });
    //cap nhat trang thai booking
    await db.bookings.update(
      {
        status: 4, //status = receive
        updatedAt: current,
      },
      {
        where: {
          id: id,
        },
      }
    );
    const car = await db.cars.findOne({
      where: {
        id: booking.idCar,
      },
    });

    if (booking === null) {
      return false;
    }
    //gui thong bao cho chu xe
    await NBModel.create({
      idUser: car.idUser,
      idBooking: id,
      title: "Thông báo thuê xe",
      content:
        "Xe" + car.name + " đã được giao tới khách hàng vào lúc" + current,
      image: "https://i.ytimg.com/vi/qzU_q6qhsaQ/maxresdefault.jpg",
      isRead: false,
    });
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const reject = async (id) => {
  try {
    const booking = await BookingModel.update(
      {
        status: 6, //status = reject
        updatedAt: current,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (booking === null) {
      return false;
    }

    //gui thong bao cho nguoi thue
    await NBModel.create({
      idUser: booking.idUser,
      idBooking: id,
      title: "Thông báo thuê xe",
      content: "Yêu cầu thuê xe đã bị từ chối !",
      image: "https://i.ytimg.com/vi/qzU_q6qhsaQ/maxresdefault.jpg",
      isRead: false,
    });
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const complete = async (id) => {
  try {
    const booking = await BookingModel.findOne({
      where: {
        id: id,
      },
    });
    //cap nhat trang thai booking
    await BookingModel.update(
      {
        status: 5, //status = complete
        updatedAt: current,
      },
      {
        where: {
          id: booking.id,
        },
      }
    );
    const car = await db.cars.findOne({
      where: {
        id: booking.idCar,
      },
    });
    //cap nhat so booking cua xe
    await db.cars.update(
      {
        status: 1,
        numberOfBooked: car.numberOfBooked + 1,
      },
      {
        where: {
          id: booking.idCar,
        },
      }
    );
    //gui thong bao cho nguoi thue
    await NBModel.create({
      idUser: booking.idUser,
      idBooking: id,
      title: "Thông báo thuê xe",
      content:
        "Chuyến đi của bạn đã kết thúc! Hãy để lại đánh giá cho chủ xe !",
      image: "https://i.ytimg.com/vi/qzU_q6qhsaQ/maxresdefault.jpg",
      isRead: false,
    });

    // //them doanh thu
    // await db.revenues.create({
    //   idBooking: id,
    // });
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getAll = async () => {
  try {
    const booking = await BookingModel.findAll({
      include: [
        {
          model: db.users,
          as: "User",
          attributes: ["id", "name", "phone", "email", "address"],
        },
        {
          model: db.cars,
          as: "Car",
          attributes: ["id", "name", "price", "image", "description", "status"],
        },
      ],
    });

    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getByOwnerId = async (idUser) => {
  try {
    const { Op } = Sequelize;
    const listCar = await db.cars.findAll({
      where: {
        idUser: idUser,
        status: 2,
      },
    });

    if (listCar.length === 0) {
      return false;
    }
    return listCar;

    // const booking = await BookingModel.findOne({
    //   where: {
    //     idCar: idCar, // Điều kiện lấy theo idCar
    //   },
    //   include: [
    //     {
    //       model: db.users,
    //       as: "User",
    //       attributes: ["id", "name", "phone", "email", "address"],
    //     },
    //   ],
    // });

    // if (booking === null) {
    //   return false;
    // }

    // const userId = booking.User.id; // Lấy idUser từ booking
    // console.log("userId", userId);

    // const booking = await BookingModel.findAll({
    //   where: {
    //     idOwner: id,
    //   },
    //   include: [
    //     {
    //       model: db.users,
    //       as: "User",
    //       attributes: ["id", "name", "phone", "email", "address"],
    //     },
    //     {
    //       model: db.cars,
    //       as: "Car",
    //       attributes: [
    //         "id",
    //         "name",
    //         "price",
    //         "image",
    //         "description",
    //         "status",
    //       ],
    //     },
    //   ],
    // });

    // return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getByRenterId = async (idUser) => {
  try {
    const { Op } = Sequelize;
    const listCar = await db.bookings.findAll({
      where: {
        idUser: idUser,
        status: 5,
      },
      include: [
        {
          model: db.cars,
          as: "Car",
          attributes: [
            "id",
            "name",
            "price",
            "image",
            "description",
            "status",
            "isDelivery",
            "numberOfBooked",
            "imageThumbnail"
          ],
        },
      ],
    });
    if (listCar.length === 0) {
      return false;
    }
    return listCar;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const cancel = async (id) => {
  try {
    const booking = await BookingModel.findOne({
      where: {
        id: id, // Điều kiện lấy theo id của booking
      },
    });

    if (!booking) {
      return false; // Booking không tồn tại
    }

    const currentTime = new Date(); // Thời gian hiện tại
    const startTime = new Date(booking.createdAt); // Thời gian bắt đầu gửi yêu cầu thuê xe
    const timeDifference = currentTime - startTime; // Độ chênh lệch thời gian
    // console.log("timeDifference", timeDifference);
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Chênh lệch thời gian tính theo giờ
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Chênh lệch thời gian tính theo ngày

    let refundAmount = 0; // Số tiền hoàn trả
    const deposit = booking.totalMoney * 0.3; // Số tiền cọc

    // ===================| hoan tra tien coc cho chu xe |===================
    if (hoursDifference >= 2) {
      const car = await db.cars.findOne({
        where: {
          id: booking.idCar,
        },
      });

      const compensationPercentage = daysDifference < 7 ? 0.3 : 1; // Tỷ lệ bồi thường (30% hoặc 100%)
      const compensationAmount = deposit * compensationPercentage; // Số tiền bồi thường

      const owner = await db.users.findOne({
        where: {
          id: car.idUser,
        },
      });

      const ownerSurplus = owner.surplus + compensationAmount;

      await db.users.update(
        {
          surplus: ownerSurplus,
        },
        {
          where: {
            id: car.idUser,
          },
        }
      );
    }

    // ===================| hoan tra tien coc cho nguoi thue |===================
    if (hoursDifference < 2) {
      refundAmount = booking.totalMoney * 0.3; // Hoàn trả 30% tiền cọc
    } else if (hoursDifference >= 2 && daysDifference < 7) {
      refundAmount = booking.totalMoney * 0.7; // Hoàn trả 70% tiền cọc
    } else {
      refundAmount = 0; // Không hoàn trả tiền cọc
    }

    const user = await db.users.findOne({
      where: {
        id: booking.idUser,
      },
    });

    const surplus = user.surplus + refundAmount;
    await db.users.update(
      {
        surplus: surplus,
      },
      {
        where: {
          id: booking.idUser,
        },
      }
    );
    // ===========================| cap nhat trang thai xe va booking |===========================
    await db.cars.update(
      {
        status: 1,
      },
      {
        where: {
          id: booking.idCar,
        },
      }
    );

    await BookingModel.update(
      {
        status: 7, //status = cancel
        updatedAt: current,
      },
      {
        where: {
          id: id,
        },
      }
    );

    //gui thong bao cho nguoi thue va chu xe
    const car = await db.cars.findOne({
      where: {
        id: booking.idCar,
      },
    });
    await NBModel.create({
      idUser: booking.idUser,
      idBooking: id,
      title: "Thông báo thuê xe",
      content:
        "Do bạn đã hủy yêu cầu thuê xe, nên chúng tôi đã hoàn lại tiền cọc cho bạn !",
      image: "https://i.ytimg.com/vi/qzU_q6qhsaQ/maxresdefault.jpg",
      isRead: false,
    });

    await NBModel.create({
      idUser: car.idUser,
      idBooking: id,
      title: "Thông báo thuê xe",
      content:
        "Người thuê đã hủy yêu cầu thuê xe, nên chúng tôi đã hoàn lại tiền cọc cho bạn !",
      image: "https://i.ytimg.com/vi/qzU_q6qhsaQ/maxresdefault.jpg",
      isRead: false,
    });

    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const cancelByOwner = async (id) => {
  try {
    const booking = await BookingModel.findOne({
      where: {
        id: id, // Điều kiện lấy theo id của booking
      },
    });

    if (!booking) {
      return false; // Booking không tồn tại
    }

    const currentTime = new Date(); // Thời gian hiện tại
    const startTime = new Date(booking.startTime); // Thời gian bắt đầu gửi yêu cầu thuê xe
    const timeDifference = currentTime - startTime; // Độ chênh lệch thời gian

    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Chênh lệch thời gian tính theo giờ
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Chênh lệch thời gian tính theo ngày

    let refundAmount = 0; // Số tiền hoàn trả
    const deposit = booking.totalMoney * 0.3; // Số tiền cọc
    if (hoursDifference < 2) {
      refundAmount = 0; // Không đền tiền cọc
    } else if (hoursDifference >= 2 && daysDifference < 7) {
      refundAmount = deposit * 0.3; // Đền 30% tiền cọc
    } else {
      refundAmount = deposit; // Đền 100% tiền cọc
    }

    // Thực hiện các thao tác đền tiền cọc, ví dụ: cập nhật trạng thái, gửi thông báo, v.v.
    console.log("refundAmount", refundAmount);
    const user = await db.users.findOne({
      where: {
        id: booking.idUser,
      },
    });
    const surplus = user.surplus + refundAmount;
    await db.users.update(
      {
        surplus: surplus,
      },
      {
        where: {
          id: booking.idUser,
        },
      }
    );
    await db.cars.update(
      {
        status: 1,
      },
      {
        where: {
          id: booking.idCar,
        },
      }
    );
    await BookingModel.update(
      {
        status: 7, //status = cancel
        updatedAt: current,
      },
      {
        where: {
          id: id,
        },
      }
    );

    //gui thong bao cho nguoi thue va chu xe
    await NBModel.create({
      idUser: booking.idUser,
      idBooking: id,
      title: "Thông báo thuê xe",
      content:
        "Chủ xe đã hủy yêu cầu thuê xe, nên chúng tôi đã hoàn lại tiền cọc cho bạn !",
      image: "https://i.ytimg.com/vi/qzU_q6qhsaQ/maxresdefault.jpg",
      isRead: false,
    });

    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getListPending = async (idOwner) => {
  try {
    const bookings = await db.bookings.findAll({
      where: {
        status: 1,
      },
      include: [
        {
          model: db.cars,
          as: "Car",
          where: {
            idUser: idOwner,
          },
        },
        {
          model: db.users,
          as: "User",
        },
      ],
    });
    console.log("bookings", bookings);
    return bookings;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getListProcessing = async (idOwner) => {
  try {
    const { Op } = Sequelize;
    const bookings = await db.bookings.findAll({
      where: {
        [Op.or]: [{ status: 2 }, { status: 3 }, { status: 4 }],
      },
      include: [
        {
          model: db.cars,
          as: "Car",
          where: {
            idUser: idOwner,
          },
        },
        {
          model: db.users,
          as: "User",
        },
      ],
    });
    console.log("bookings", bookings);
    return bookings;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getListComplete = async (idOwner) => {
  try {
    const { Op } = Sequelize;
    const bookings = await db.bookings.findAll({
      where: {
        status: 5,
      },
      include: [
        {
          model: db.cars,
          as: "Car",
          where: {
            idUser: idOwner,
          },
        },
        {
          model: db.users,
          as: "User",
        },
      ],
    });
    console.log("bookings", bookings);
    return bookings;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getListCancel = async (idOwner) => {
  try {
    const { Op } = Sequelize;

    const bookings = await db.bookings.findAll({
      where: {
        [Op.or]: [{ status: 7 }, { status: 8 }],
      },
      include: [
        {
          model: db.cars,
          as: "Car",
          where: {
            idUser: idOwner,
          },
        },
        {
          model: db.users,
          as: "User",
        },
      ],
    });
    console.log("bookings", bookings);
    return bookings;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getListCurrentOfUser = async (idUser) => {
  try {
    const { Op } = Sequelize;
    const bookings = await db.bookings.findAll({
      where: {
        idUser: idUser,
        status: [1, 2, 3, 4],
      },
      include: [
        {
          model: db.cars,
          as: "Car",
        },
      ],
    });
    console.log("bookings", bookings);
    if (bookings) {
      return bookings;
    }
    return false;
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
  getListCurrentOfUser,
};
