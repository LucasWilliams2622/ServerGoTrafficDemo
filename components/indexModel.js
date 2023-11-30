const { Sequelize, DataTypes } = require("sequelize");

// connect to db
const sequelize = new Sequelize("gotrafficdb", "root", "Password123@@", {
  host: "103.57.220.131",
  port:'3000',
  dialect: "mysql",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//===================| Models/tables |================
db.users = require("./User/UserModel")(sequelize, DataTypes);
db.carbrands = require("./CarBrand/CarBrandModel")(sequelize, DataTypes);
db.cars = require("./Car/CarModel")(sequelize, DataTypes);
db.bookings = require("./Booking/BookingModel")(sequelize, DataTypes);
db.favoritecars = require("./FavoriteCar/FavoriteCarModel")(
  sequelize,
  DataTypes
);
db.reviews = require("./Review/ReviewModel")(sequelize, DataTypes);
db.notifications = require("./Notification/NotificationModel")(
  sequelize,
  DataTypes
);
db.notificationbookings =
  require("./NotificationBooking/NotificationBookingModel")(
    sequelize,
    DataTypes
  );

db.addresses = require("./Address/AddressModel")(sequelize, DataTypes);
db.revenues = require("./Revenue/RevenueModel")(sequelize, DataTypes);
db.times = require("./Time/TimeModel")(sequelize, DataTypes);



//====================| Associations |=================
db.users.hasMany(db.cars, { foreignKey: "idUser", as: "Car" });
db.cars.belongsTo(db.users, { foreignKey: "idUser", as: "User" });

db.reviews.belongsTo(db.bookings, { foreignKey: "idBooking", as: "Booking" });
db.bookings.hasOne(db.reviews, { foreignKey: "idBooking", as: "Review" });

db.reviews.belongsTo(db.users, { foreignKey: "idUser", as: "User" });
db.users.hasMany(db.reviews, { foreignKey: "idUser", as: "Review" });

db.cars.hasMany(db.favoritecars, { foreignKey: "idCar", as: "FavoriteCar" });
db.favoritecars.belongsTo(db.cars, { foreignKey: "idCar", as: "Car" });

db.bookings.belongsTo(db.cars, { foreignKey: "idCar", as: "Car" });
db.users.hasMany(db.bookings, { foreignKey: "idUser", as: "Booking" });

db.cars.hasMany(db.bookings, { foreignKey: "idCar", as: "Booking" });
db.bookings.belongsTo(db.users, { foreignKey: "idUser", as: "User" });

db.addresses.belongsTo(db.users, { foreignKey: "idUser", as: "User" });
db.users.hasMany(db.addresses, { foreignKey: "idUser", as: "Address" });

db.revenues.belongsTo(db.times, { foreignKey: "idTime", as: "Time" });
db.revenues.hasMany(db.bookings, { foreignKey: "idBooking", as: "Booking" });

db.sequelize.sync({ force: false,alter: true })
.then(() => {
    console.log('yes re-sync done!')
})
module.exports = db;
