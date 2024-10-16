import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true,
    },  
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const TodoModel = mongoose.model("todos", todoSchema);

export default TodoModel;