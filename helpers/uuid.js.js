module.exports = () =>
    Math.floor((1 + Math.random()) * 10000)
        .toString(16)
        .substring(1);