import {Kafka} from "kafkajs"
import kafka from "./client.js"

const group = process.argv[2]

async function init(){
    const consumer = kafka.consumer({
        groupId: group
    })
    await consumer.connect()

    await consumer.subscribe({
        topics: ["Rider-updates"]
    })

    await consumer.run({
        eachMessage: async({topic, partition, message, heartbeat, pause})=>{
            console.log(`--${group}----start-----[${topic}]---------PART = ${partition}, ============== ${message.value.toString()}----end------\n`)
        },
        fromBeginning: true
    })
    
} 
init()