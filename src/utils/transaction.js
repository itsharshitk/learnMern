const mongoose = require("mongoose");

async function transaction(callback) {
    
    const session = await mongoose.startSession();

    try{
        session.startTransaction();
        
        const result = await callback(session);

        await session.commitTransaction();

        return result;
    } catch (err) {
        await session.abortTransaction();
        
        throw err;
    } finally{
        session.endSession();
    }

}

module.exports = transaction;

// CREATED TRANSACTION BUT NOT USED YET