const response = (res, result, message, status) =>{
    const resultRespon = {}
    resultRespon.status = 'success'
    resultRespon.statusCode = status || 200
    resultRespon.message = message || null
    resultRespon.data = result
    res.status(status).json(resultRespon)
}

module.exports = {response}