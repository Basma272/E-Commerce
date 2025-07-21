import mongoose from "mongoose";

const DBconnect = async ()=>{
try {
  await  mongoose.connect(process.env.URLDB)
    console.log(" done Connection DB ✔️ ")
} catch (error) {
    console.error(" Connection DB error ✖️ ", error)
}}

export default DBconnect