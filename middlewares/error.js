module.exports = {
  errorMsgs: {
    notFound: {
      status: 404,
      msg: "Data not found",
    },
  },
  errorHandler: (err, req, res, next) => {
    res.send({
      error: {
        status: err?.status || 500,
        msg: err?.msg || "Internal Server Error",
      },
    });
  },
};
