import { Kafka } from "kafkajs"

const kafka = new Kafka({
    brokers: ["10.0.4.100:9092"],
    clientId: "my-app"
})
export default kafka