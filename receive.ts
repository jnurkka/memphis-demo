import {memphis, Memphis, Message} from 'memphis-dev';

(async function () {
    let memphisConnection: Memphis;

    try {
        memphisConnection = await memphis.connect({
            host: 'localhost',
            username: 'receiver',
            connectionToken: 'memphis'
        });

        const consumer = await memphisConnection.consumer({
            stationName: 'hello',
            consumerName: 'receiver1',
            consumerGroup: 'receivers'
        });

        consumer.setContext({ key: "value" });
        console.log('Consumer listening to message in station: hello');
        consumer.on('message', (message: Message, context: object) => {
            console.log(message.getData().toString());
            message.ack();
            const headers = message.getHeaders()
        });

        consumer.on('error', (error) => {
            console.log(error);
        });
    } catch (ex) {
        console.log(ex);
    }
})();
