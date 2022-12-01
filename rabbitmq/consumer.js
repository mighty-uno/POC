const amqp = require("amqplib");

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");

    channel.consume("jobs", (message) => {
      const input = JSON.parse(message.content);
      console.log("Message", input);

      if (input.number % 2 == 0) {
        channel.ack(message);

        console.log("testing");
      }
    });

    console.log("");
  } catch (error) {
    console.log(error);
  }
}

connect();
