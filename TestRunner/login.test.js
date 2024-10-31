import { expect } from 'chai';
import axios from 'axios';
import dotenv from 'dotenv';
import storeToken from '../Config/setEnvVar.js';
dotenv.config();

//let token ="";
describe("User can do login", async () => {
    it("User login with valid creds", async () => {
        const {data} = await axios.post(`${process.env.base_url}/user/login`, {
            "email": "admin@roadtocareer.net",
            "password": "1234",
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        // Log the response data to verify the output
        console.log(data);

        expect(data.message).to.contains("Login successful");
        storeToken('token', data.token);
        //token = data.token

    });
});
