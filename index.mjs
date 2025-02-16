import express from 'express'
const app = express()


app.get('/', (req, res)=>{
    res.json({
        success: "This is root directory for KOMA!"
    })
})

app.post('/demo', (req, res) => {
    const data = req.boby.data;
    
    
    res.json({
        success: "This is the "+ data + "!"
    })

})



app.listen(3000, () => {
    console.log("Server listening at: http://localhost:3000");
})