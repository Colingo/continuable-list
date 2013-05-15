module.exports = list

//  list := (tasks:Array<Continuable<T>>)
//      => Continuable<Array<T>>
function list(tasks) {
    return function continuable(callback) {
        var result = []
        var ended = false
        var count = 0
        var length = tasks.length

        tasks.forEach(function invokeSource(source, index) {
            source(function continuation(err, value) {
                if (err && !ended) {
                    callback(err)
                } else if (!err) {
                    result[index] = value
                    if (++count === length) {
                        callback(null, result)
                    }
                }
            })
        })
    }
}
