const StreamChat = require('stream-chat');

export const createChat = async() => {
    const options = {};
    const serverClient = new StreamChat('STREAM_KEY', 'STREAM_API_SECRET', options);
    const spacexChannel = serverClient.channel('team', 'spacex', {
        image: image,
        created_by: elon,
    });
    const createResponse = await spacexChannel.create();
    const text = 'I was gonna get to mars but then I got high';
    const message = {
        text,
        user: elon,
    }
    const response = await spacexChannel.sendMessage(message);
}