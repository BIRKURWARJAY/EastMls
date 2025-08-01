import mongoose from "mongoose"

const connect = async () => {
    try {
        const connectDB = await mongoose.connect('mongodb+srv://birkurwarjay01:BIRK@ziance.e9rsmxw.mongodb.net/eastmls?retryWrites=true&w=majority')
        console.log('db connect sucessfully');
        
    } catch (error) {
        console.log('error in db connection', error);

    }

}

export default connect