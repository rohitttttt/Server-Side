
const sendErrorResponse = async (error, res) => {
    console.error(error);
    await res.send({ status: "1", message: "Please try again later!", data: null });
}

module.exports = {
    sendErrorResponse : sendErrorResponse
}