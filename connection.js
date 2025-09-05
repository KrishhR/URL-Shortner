import { connect } from 'mongoose';

async function connectToMongoDB (url) {
    await connect(url);
}

export default connectToMongoDB;