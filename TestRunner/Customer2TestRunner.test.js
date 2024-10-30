import { expect } from 'chai';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import jsonData from '../Utils/userData.json' assert { type: 'json' };


const length = jsonData.length;
const c2Number = jsonData[length-2].phone_number ;

describe("Customer 2 transaction activities", async () => {
    it("Customer2 make successful Payment to merchant", async ()=> {
        const { data } = await axios.post(`${process.env.base_url}/transaction/payment`, {
    
            "from_account": c2Number ,  // Customer 2 Phone Number
            "to_account":"01506639468",  // Merchant Phone number
            "amount": 100 
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.token}`,
                    "X-AUTH-SECRET-KEY":`${process.env.secretKey}`
                }
            });
        console.log(data);
        expect(data.message).to.contains("Payment successful");

        
         
    });

    it("Customer2 can successfully check balance", async ()=> {
        const { data } = await axios.get(`${process.env.base_url}/transaction/balance/${c2Number}`, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.token}`,
                    "X-AUTH-SECRET-KEY":`${process.env.secretKey}`
                }
            });
        console.log(data);
        expect(data.message).to.contains("User balance");
        
         
    });

     //delay 1000 ms
     afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

});