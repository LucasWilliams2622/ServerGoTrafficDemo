var express = require("express");
var router = express.Router();
const notificationController = require("../../components/Notification/NotificationController");

//http://localhost:3000/api/notification
router.post("/", async (req, res) => {
  try {
    const { title, content, image } = req.body;
    console.log("title", title);
    const notification = await notificationController.pushNotification(
      title,
      content,
      image
    );
    if (notification) {
      return res
        .status(200)
        .json({ result: true, notification: notification, message: "Success" });
    } else {
      res.status(400).send("Get notification failed");
    }
  } catch (error) {
    console.log(error);
  }
});

//http://localhost:3000/api/notification
router.get("/", async (req, res) => {
  try {
    const notification = await notificationController.getNotification();
    if (notification) {
      return res
        .status(200)
        .json({ result: true, notification: notification, message: "Success" });
    } else {
      res.status(400).send("Get notification failed");
    }
  } catch (error) {
    console.log(error);
  }
});

//http://localhost:3000/api/notification
router.delete("/", async (req, res) => {
  try {
    const { id } = req.query;
    const notification = await notificationController.deleteNotification(id);
    if (notification) {
      return res
        .status(200)
        .json({ result: true, notification: notification, message: "Success" });
    } else {
      res.status(400).send("Delete notification failed");
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: API for Review operations
 */
/**
 * @swagger
 * /api/notification:
 *   post:
 *     summary: Gửi thông báo mới
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 notification:
 *                   type: object
 *                 message:
 *                   type: string
 *       400:
 *         description: Gửi thông báo thất bại
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
/**
 * @swagger
 * /api/notification:
 *   get:
 *     summary: Lấy danh sách thông báo
 *     tags: [Notification]
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 notification:
 *                   type: object
 *                 message:
 *                   type: string
 *       400:
 *         description: Lấy thông báo thất bại
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
/**
 * @swagger
 * /api/notification:
 *   delete:
 *     summary: Xóa thông báo
 *     tags: [Notification]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của thông báo cần xóa
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 notification:
 *                   type: object
 *                 message:
 *                   type: string
 *       400:
 *         description: Xóa thông báo thất bại
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
