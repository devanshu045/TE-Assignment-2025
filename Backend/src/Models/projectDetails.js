import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
    },
    projectDescription: {
        type: String,
        required: true,
    },
    skillSet: {
        type: [String], 
        required: true,
    },
    membersNumber: {
        type: Number, 
        required: true,
    },
    isActive:{
        type: Boolean,
        required: true,
    }
},{timestamps:true});

const projectDetails = mongoose.model("ProjectDetails", projectSchema);

export default projectDetails;
