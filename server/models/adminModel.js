import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({   
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    auctions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auction"
    }]
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
