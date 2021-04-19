const mongoose = require('mongoose')

module.exports = {
    cleanText: text => text.trim(),
    capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    isValidIdFormat: id => mongoose.Types.ObjectId.isValid(id),
    formatDate: date => {
        let month = '' + (date.getMonth() + 1)
        let day = '' + date.getDate()
        let year = date.getFullYear()

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-')
    },
    isEditor: user => user && user.role === 'EDITOR',
    isAdmin: user => user && user.role === 'ADMIN',
    formatValidationError: err => Object.values(err.errors).map(elm => elm.message).join('<br>')
}