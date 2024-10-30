import { expect } from 'chai';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import { faker } from '@faker-js/faker';
import generateRandomId from '../Utils/utils.js'
import jsonData from '../Utils/userData.json' assert { type: 'json' };
import fs from 'fs'

describe("New User Creation", async () => {
    it("Admin can create first customer successfully", async ()=> {
        const { data } = await axios.post(`${process.env.base_url}/user/create`, {
            "name": `Axios user ${faker.person.firstName()}`,
            "email": `${faker.internet.email()}`,
            "password": "1234",
            "phone_number": `01502${generateRandomId(100000, 999999)}`,
            "nid": "123456789",
            "role": "Customer"
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.token}`,
                    "X-AUTH-SECRET-KEY":`${process.env.secretKey}`
                }
            });
        console.log(data);
        expect(data.message).to.contains("User created");
        jsonData.push(data.user);
        fs.writeFileSync('./Utils/userData.json', JSON.stringify(jsonData, null, 2)); 
    });

    it("Admin can create second customer successfully", async ()=> {
        const { data } = await axios.post(`${process.env.base_url}/user/create`, {
            "name": `Axios user ${faker.person.firstName()}`,
            "email": `${faker.internet.email()}`,
            "password": "1234",
            "phone_number": `01602${generateRandomId(100000, 999999)}`,
            "nid": "123456789",
            "role": "Customer"
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.token}`,
                    "X-AUTH-SECRET-KEY":`${process.env.secretKey}`
                }
            });
        console.log(data);
        expect(data.message).to.contains("User created");
        jsonData.push(data.user);
        fs.writeFileSync('./Utils/userData.json', JSON.stringify(jsonData, null, 2)); 
    });

    it("Admin can create agent successfully", async ()=> {
        const { data } = await axios.post(`${process.env.base_url}/user/create`, {
            "name": `Axios user ${faker.person.firstName()}`,
            "email": `${faker.internet.email()}`,
            "password": "1234",
            "phone_number": `01702${generateRandomId(100000, 999999)}`,
            "nid": "123456789",
            "role": "Agent"
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.token}`,
                    "X-AUTH-SECRET-KEY":`${process.env.secretKey}`
                }
            });
        console.log(data);
        expect(data.message).to.contains("User created");
        jsonData.push(data.user);
        fs.writeFileSync('./Utils/userData.json', JSON.stringify(jsonData, null, 2)); 
    });

     //delay 1000 ms
     afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });
})