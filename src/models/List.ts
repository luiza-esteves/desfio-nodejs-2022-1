import * as mongoose from "mongoose";


const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },

    tasks:[{

    }]
})


const List = mongoose.model("List", listSchema);
export default List;