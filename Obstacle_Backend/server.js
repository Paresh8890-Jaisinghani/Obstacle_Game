const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const Contact = require('./model.js');


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3005;


mongoose.connect('mongodb+srv://Paresh:pareshjaisinghani@cluster0.rxwg4ag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });

app.use(express.json());

app.post('/api/scores', async (req,res)=>{
    const {ObstacleScore1,ObstacleScore2,ObstacleScore3,otpcode} = req.body;

    
    try{
        let contact = await Contact.findOne({code : otpcode});
        if(!contact){
           return res.status(404).json({message : "Wrong code Entered"});
        }
        
        contact.ObstacleScore1 = ObstacleScore1;
        contact.ObstacleScore2 = ObstacleScore2;
        contact.ObstacleScore3 = ObstacleScore3;

        await contact.save();
        res.status(201).json(contact);
    }
    catch(e){
        res.status(500).json({message : e.message});
    }
});


app.get('/api/scores',async(req,res)=>{
    try{
        const contacts = await Contact.find();
        res.json(contacts);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }

});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
