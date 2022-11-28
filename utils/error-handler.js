module.exports = (err, req, res, next) => {
    if (err.response && err.response.status !== 500) {
        res.status(err.response.status)
        .send(err.resposnse.data);
    } else {
        return res
        .status(500)
        .send(
            "Oops, something went wrong! Our engineers have been alerted and will fix this asap."
        );
    }
};