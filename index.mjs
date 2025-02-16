import express from 'express'
const app = express()


app.get('/', (req, res)=>{
    res.json({
        success: "This is root directory!"
    })
})


app.listen(3000, () => {
    console.log("Server listening at: http://localhost:3000");
})