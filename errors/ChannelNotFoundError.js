class ChannelNotFoundError extends Error{
    constructor(message = "Channel is not found. Please use !set-channelcategroy to check the channel index"){
        super(message);
    }
}
module.exports = ChannelNotFoundError;