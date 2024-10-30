import { expect } from 'chai';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import jsonData from '../Utils/userData.json' assert { type: 'json' };


const length = jsonData.length;

describe("Deposit To agent", async () => {
    it("System can deposit to agent successfully", async ()=> {
        const { data } = await axios.post(`${process.env.base_url}/transaction/deposit`, {
            "from_account":"SYSTEM",
            "to_account": jsonData[length-1].phone_number , // Agent Account
            "amount": 2000 
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.token}`,
                    "X-AUTH-SECRET-KEY":`${process.env.secretKey}`
                }
            });
        console.log(data);
        expect(data.message).to.contains("Deposit successful");
        
         
    });

});
