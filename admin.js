import kafka from "./client.js"
async function init() {
    const admin = kafka.admin()
    await admin.connect()
    console.log("Kafka Admin connected")
    await admin.createTopics({
        topics:[
            {
                topic: "Rider-updates",
                numPartitions: 2,

            }
        ]
    })
    console.log("Topic created")

    console.log("Disconnecting admin...")
    await admin.disconnect()
}

init()