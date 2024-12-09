const Task = require("../models/task.model");

const paginationHelper = require("../../../helper/pagination");
const searchHelper = require("../../../helper/search");

// [GET]/api/v1/tasks
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };

    if (req.query.status) {
        find.status = req.query.status;
    };

    const sort = {};

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    }

    const objSearch = searchHelper(req.query);
    if (objSearch.regex) {
        find.title = objSearch.regex;
    }

    // pagination
    const countRecords = await Task.countDocuments(find);
    let objPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 2
        },
        req.query,
        countRecords
    );
    // end pagination

    const tasks = await Task.find(find).sort(sort)
        .limit(objPagination.limitItems)
        .skip(objPagination.skip);

    res.json(tasks)
};

// [GET]/api/v1/tasks/detail/:id
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

// [PATCH]/api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;

        await Task.updateOne({
            _id: id
        }, {
            status: status
        });

        res.json({
            code: 200,
            message: "Update status thành công"
        });
    } catch (error) {
        res.json({
            code: 404,
            message: "Không tồn tại!"
        });
    }


};