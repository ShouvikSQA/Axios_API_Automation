import { expect } from 'chai';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import jsonData from '../Utils/userData.json' assert { type: 'json' };


const length = jsonData.length;

describe("Customer 1 transaction activities", async () => {
    it("Customer1 can withdraw successfully from agent", async ()=> {
        const { data } = await axios.post(`${process.env.base_url}/transaction/withdraw`, {
            "from_account": jsonData[length-3].phone_number ,  // Customer 1 Phone Number
            "to_account":jsonData[length-1].phone_number,  // Agent Phone number
            "amount": 500 
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.token}`,
                    "X-AUTH-SECRET-KEY":`${process.env.secretKey}`
                }
            });
        console.log(data);
        expect(data.message).to.contains("Withdraw successful");
        
         
    });

    it("Customer1 can send money successfully to Customer2", async ()=> {
        const { data } = await axios.post(`${process.env.base_url}/transaction/sendMoney`, {
            "from_account": jsonData[length-3].phone_number ,  // Customer 1 Phone Number
            "to_account":jsonData[length-2].phone_number,  // Customer 2 Phone Number
            "amount": 500 
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.token}`,
                    "X-AUTH-SECRET-KEY":`${process.env.secretKey}`
                }
            });
        console.log(data);
        expect(data.message).to.contains("Send money successful");
        
         
    });

     //delay 1000 ms
     afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

});