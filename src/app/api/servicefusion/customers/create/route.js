import connectDB from "@/lib/connectDB";
import Credentials from "@/models/credentials";
import {
    fetchServiceFusionAccessToken,
    fetchServiceFusionCheckIfCustomerExists,
    fetchServiceFusionCreateNewCustomer
} from "@/utils/serviceFusionApi";

export async function POST(req) {
    try {
        await connectDB();
        const serviceFusionCredentials = await Credentials.findById(process.env.MONGO_CREDENTIALS_ID);
        const tokenResponse = await fetchServiceFusionAccessToken(serviceFusionCredentials.serviceFusionRefreshToken);
        if (!tokenResponse.success) {
            return new Response(tokenResponse.message, {status: 500});
        }
        const { access_token, refresh_token } = tokenResponse.data;
        serviceFusionCredentials.serviceFusionRefreshToken = refresh_token;
        serviceFusionCredentials.serviceFusionAccessToken = access_token;
        await serviceFusionCredentials.save();
        const {firstName, lastName, phone, email} = await req.json();
        const checkResponse = await fetchServiceFusionCheckIfCustomerExists(email, access_token);
        if (!checkResponse.success) {
            return new Response(checkResponse.message, {status: 500});
        }
        if (checkResponse.message === "Customer found") {
            return new Response(`${checkResponse.data} was found as an existing contact in Service Fusion`);
        }
        const newCustomerPayload = {
            customer_name: `${firstName} ${lastName}`,
            contacts: [
                {
                    fname: firstName,
                    lname: lastName,
                    phones: [{phone: phone, type: "Mobile"}],
                    emails: [{email: email, class: "Personal"}],
                    is_primary: "true"
                }
            ],
            referral_source: "susyqonline",
            is_taxable: true,
        };
        const createResponse = await fetchServiceFusionCreateNewCustomer(newCustomerPayload, access_token);
        if (!createResponse.success) {
            return new Response(createResponse.message, {status: 500});
        }
        return new Response(`A new contact for ${createResponse.data} has been created in Service Fusion`);
    } catch (error) {
        console.error("API Error:", error.message);
        return new Response(`Error: ${error.message}`, {status: 500});
    }
}
