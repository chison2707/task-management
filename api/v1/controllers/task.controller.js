const Task = require("../models/task.model");

module.exports.index = async (req, res) => {
    const tasks = await Task.find({
        deleted: false
    });

    res.json(tasks)
};

module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;
        const tasks = await Task.find({
            _id: id,
            deleted: false
        });

        res.json(tasks);
    } catch (error) {
        res.json("không tìm thấy");
    }

};