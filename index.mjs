import express from 'express'
const app = express()



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res)=>{
    res.json({
        success: "This is root directory for KOMA!"
    })
})

app.post('/demo', (req, res) => {
    
    const data = req.body.bodyData;
    
    
    res.json({
        success: "This is the "+ data + "!"
    })

})



app.listen(3000, () => {
    console.log("Server listening at: http://localhost:3000");
})