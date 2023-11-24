const { Sequelize } = require("sequelize");
const moment = require("moment");

const sequelize = new Sequelize("gotrafficdb", "root", "gotraffic&9299", {
  host: "103.57.129.166:3000",
  dialect: "mysql",
});
const db = require("../../components/indexModel");
const CarModel = db.cars;
const UserModel = db.users;
const CarBrandModel = db.carbrands;
const ReviewModel = db.reviews;
const BookingModel = db.bookings;
const NotificationModel = db.notifications;
const AddressModel = db.addresses;
const RevenueModel = db.revenues;
const current = moment().format("YYYY-MM-DD");
const { Op } = Sequelize;

const addRevenue = async (idBooking) => {
  const booking = await BookingModel.findOne({
    where: {
      id: idBooking,
    },
  });
  if (!booking) {
    return false;
  }

  const revenueAmount = (booking.totalMoney * 0.3) / 2;
  console.log(revenueAmount);
  const revenue = await RevenueModel.create({
    idBooking: idBooking,
    revenueAmount: revenueAmount,
    revenueDate: current,
  });
  if (revenue) {
    return true;
  } else {
    return false;
  }
};

const getAllRevenue = async () => {
  const revenueData = await RevenueModel.findAll({
    include: [
      {
        model: BookingModel,
        as: "Booking",
        attributes: ["totalMoney"],
      },
    ],
  });
  if (!revenueData) {
    return false;
  }

  // Tính tổng của trường totalMoney
  const totalMoneySum = revenueData.reduce(
    (accumulator, currentRevenue) =>
      accumulator + currentRevenue.Booking.totalMoney,
    0
  );
  return totalMoneySum;
};

const getRevenueById = async (id) => {
  const revenue = await RevenueModel.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: BookingModel,
        as: "Booking",
        include: [
          {
            model: CarModel,
            as: "Car",
          },
          {
            model: UserModel,
            as: "User",
          },
        ],
      },
    ],
  });
  const booking = await BookingModel.findOne({
    where: {
      id: id,
    },
  });

  if (!revenue) {
    return false;
  }
  const revenueAmount = (booking.totalMoney * 0.3) / 2;
  console.log(revenueAmount);

  return { revenueAmount, revenue };
};

const getRevenueByIdBooking = async (idBooking) => {
  const bookings = await BookingModel.findOne({
    where: {
      id: idBooking,
    },
  });

  console.log(bookings);
  const revenue = await RevenueModel.findOne({
    where: {
      idBooking: idBooking,
    },
    include: [
      {
        model: BookingModel,
        as: "Booking",
      },
    ],
  });
  if (!revenue) {
    return false;
  }
  const revenueAmount = (bookings.totalMoney * 0.3) / 2;
  console.log(revenueAmount);

  return { revenueAmount, revenue };
};

const getRevenueByDateRange = async (date1, date2) => {
  const revenueData = await RevenueModel.findAll({
    where: {
      revenueDate: {
        [Op.between]: [date1, date2],
      },
    },
    include: [
      {
        model: BookingModel,
        as: "Booking",
        attributes: ["totalMoney"],
      },
    ],
  });
  if (!revenueData) {
    return false;
  }
  // Tính tổng của trường totalMoney
  const revenueAmount = revenueData.reduce(
    (accumulator, currentRevenue) =>
      accumulator + (currentRevenue.Booking.totalMoney * 0.3) / 2,
    0
  );
  return { revenueAmount, revenueData };
};

const getHighestRevenue = async () => {
  try {
    const highestRevenue = await RevenueModel.findOne({
      include: [
        {
          model: BookingModel,
          as: "Booking",
          attributes: ["totalMoney"],
          include: [
            {
              model: CarModel,
              as: "Car",
            },
            {
              model: UserModel,
              as: "User",
            },
          ],
        },
      ],
      order: [[Sequelize.literal("Booking.totalMoney"), "DESC"]],
    });
    const revenueAmount = (highestRevenue.Booking.totalMoney * 0.3) / 2;
    console.log(revenueAmount);

    return { revenueAmount, highestRevenue };
  } catch (error) {
    console.error("Error getting highest revenue:", error);
    return null;
  }
};

const getLowestRevenue = async () => {
  try {
    const lowestRevenue = await RevenueModel.findOne({
      include: [
        {
          model: BookingModel,
          as: "Booking",
          attributes: ["totalMoney"],
          include: [
            {
              model: CarModel,
              as: "Car",
            },
            {
              model: UserModel,
              as: "User",
            },
          ],
        },
      ],
      order: [[Sequelize.literal("Booking.totalMoney"), "ASC"]],
    });
    const revenueAmount = (lowestRevenue.Booking.totalMoney * 0.3) / 2;
    console.log(revenueAmount);

    return { revenueAmount, lowestRevenue };
  } catch (error) {
    console.error("Error getting lowest revenue:", error);
    return null;
  }
};
const getAverageRevenue = async () => {
  try {
    const averageRevenue = await RevenueModel.findOne({
      attributes: [
        [
          Sequelize.literal("AVG(Booking.totalMoney * 0.3 / 2)"),
          "averageRevenue",
        ],
      ],
      include: [
        {
          model: BookingModel,
          as: "Booking",
          attributes: [],
        },
      ],
    });

    return averageRevenue.get("averageRevenue") || 0;
  } catch (error) {
    console.error("Error getting average revenue:", error);
    return 0;
  }
};

const getAverageRevenueArangeDate = async (startDate, endDate) => {
  try {
      const averageRevenue = await RevenueModel.findOne({
        attributes: [
          [
            Sequelize.literal("AVG(Booking.totalMoney * 0.3 / 2)"),
            "averageRevenue",
          ],
        ],
        include: [
          {
            model: BookingModel,
            as: "Booking",
            attributes: ["totalMoney"],
          },
        ],
        where: {
          revenueDate: {
            [Sequelize.Op.between]: [startDate, endDate],
          },
        },
      });
  console.log(averageRevenue);
    return averageRevenue.get("averageRevenue") || 0;
  } catch (error) {
    console.error("Error getting average revenue:", error);
    return 0;
  }
};
module.exports = {
  addRevenue,
  getAllRevenue,
  getRevenueById,
  getRevenueByIdBooking,
  getRevenueByDateRange,
  getHighestRevenue,
  getLowestRevenue,
  getAverageRevenue,
  getAverageRevenueArangeDate,
};
