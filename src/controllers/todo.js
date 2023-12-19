const AppError = require('../utils/appError')
const conn = require('../services/db')

const { randomUUID } = require('crypto')

exports.getAllTodos = ( request, response, callback )=>{
    conn.query("SELECT * FROM todoList", (err, data, fields) =>{

        if(err) return callback(new AppError(err))

        response.status(200).json({
            status: 'success',
            length: data?.length,
            data: data
        })

    })
}

exports.createTodo = (request, response, callback) =>{
    if(!request.body) return callback(new AppError('No form data found', 404))

    const uuid = randomUUID()

    const values = [ uuid, request.body.name, 'pending' ]
    conn.query(
        "INSERT INTO todoList (id, name, status) VALUES (?)",
        [ values ],
        function(err, data, fields){
            if(err) return callback(new AppError(err, 500))

            response.status(201).json({

                id: uuid,
                status: 'success',
                message: 'todo created!'
            })
        }
    )
}

exports.getTodo = (request, response, callback) => {
    if(!request.params.id)
        return callback(new AppError('No todo id found', 404))

    conn.query(
        "SELECT * FROM todoList WHERE id = ?",
        [ req.params.id ],
        function(err, data, fields){
            if(err) return callback(new AppError(err, 500))

            response.status(200).json({
                status: 'success',
                length: data?.length,
                data: data
            })
        }
    )
}

exports.updateTodo = (request, response, callback) =>{
    if(!req.params.id)
        return callback(new AppError('No todo id found', 404))

    conn.query(
        "UPDATE todoList SET status = 'completed' WHERE id = ?",
        [ request.params.id ],
        function(err, data, fields){
            if(err) return callback(new AppError(err, 500))

            response.status(201).json({
                status: 'success',
                message: 'todo updated!!'
            })
        }
    )
}

exports.deleteTodo = (request, response, callback) =>{
    if(!req.params.id)
        return callback(new AppError('No todo id found', 404))

    conn.query(
        "DELETE FROM todoList WHERE id = ?",
        [ request.params.id ],
        function(err, fields){
            if(err) return callback(new AppError(err, 500))

            response.status(201).json({
                status: 'message',
                message: 'todo deleted!!'
            })
        }
    )
}