module.exports = {
    success: function (res, data, message) {
      res.status(200).json({
        data,
        status: true,
        message: message ? message : "Success get data",
      });
    },
    dataNotFound: function (res, data) {
      res.status(200).json({
        data,
        status: false,
        message: "Data not found",
      });
    },
};