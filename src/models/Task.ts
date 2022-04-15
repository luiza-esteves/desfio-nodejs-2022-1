import * as mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    isComplete:{
        type: Boolean,
        required: false,
        default:false
    }

}
)


const Task = mongoose.model("Task", taskSchema);
export default Task;