const hisNapThoi = require('../models/HisnhapThoi')
const hisNapvang = require('../models/Hisnapvang')


function secondSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    return Math.floor(seconds)
}


setInterval(async () => {
    let napthois = await hisNapThoi.find({ status: -1 })
    let napvangs = await hisNapvang.find({ status: -1 })
    for (let thoi of napthois) {
        if (secondSince(thoi.time) > 300) {
            await hisNapThoi.deleteOne({ _id: thoi._id})
            console.log("rm "+thoi._id)

        }
    }
    for (let vang of napvangs) {
        if (secondSince(vang.time) > 300) {
            await hisNapvang.deleteOne({ _id: vang._id})
            console.log("rm "+vang._id)
        }
    }
}, 10000);