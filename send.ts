import { memphis, Memphis } from 'memphis-dev';

(async function () {
    let memphisConnection: Memphis;

    try {
        memphisConnection = await memphis.connect({
            host: 'localhost',
            username: 'sender',
            connectionToken: 'memphis'
        });

        const producer = await memphisConnection.producer({
            stationName: 'hello',
            producerName: 'producer1'
        });

        const headers = memphis.headers()
        headers.add('header1', 'header1value');

        const send = async () => {
          const message = "Message: Hello world"
          console.log(`Producer sending message in station hello - ${message}`);
          await producer.produce({
            message: Buffer.from(message), // you can also send JS object - {}
            headers: headers
        });
        }

        setInterval(() => {
          send();
        }, 1000)
    } catch (ex) {
        console.log(ex);
    }
})();
