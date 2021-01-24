exports.success = (data, message) => {
    return {
        status: 'success',
        data,
        message
    }
}

exports.error = message => {
    return {
        status: 'error',
        message
    }
}
