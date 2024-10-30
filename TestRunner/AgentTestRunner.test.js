import { expect } from 'chai';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import jsonData from '../Utils/userData.json' assert { type: 'json' };


const length = jsonData.length;

describe("Deposit From Agent", async () => {
    it("Agent can deposit money successfully to customer1", async ()=> {
        const { data } = await axios.post(`${process.env.base_url}/transaction/deposit`, {
            "from_account":jsonData[length-1].phone_number,  // Agent Phone number
            "to_account": jsonData[length-3].phone_number ,  // Customer 1 Phone Number
            "amount": 1500 
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
