const mongoose = require("mongoose");

const Genome = mongoose.model(
    "Genome",
    new mongoose.Schema({
        name: String,
        gen_id: String,
        pos: String,
        "Xac suat phan bo": String,
        "Muc do tin cay": String,
        "Kich thuoc": Number,
        "Diem dang dien": Number,
        "Do ua nuoc": Number,
        //ref: CharacterData,
    })
)

module.exports = Genome;