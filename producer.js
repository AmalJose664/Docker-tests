
import kafka from "./client.js";
import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
async function init() {
    const producer = kafka.producer()
    console.log("Connecting producer...")
    await producer.connect()
    console.log("Producer connected ..")
    rl.setPrompt("> ")
    rl.prompt()
    rl.on("line", async (line) => {
        const [riderName, location] = line.split(" ")
        producer.send({
            topic: "Rider-updates",
            messages: [
                {
                    partition: location === "NORTH" ? 0 : 1,
                    key: "location-update",
                    value: JSON.stringify({ name: riderName, location })
                },
            ]
        })
    }).on("close", async()=>{
        await producer.disconnect()
        process.exit(0)
    })

    
}
init()