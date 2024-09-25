import connectDB from "@/lib/connectDB";
import Credentials from "@/models/credentials";

const fetchServiceFusionAccessToken = async (refreshToken) => {
    const res = await fetch("https://api.servicefusion.com/oauth/access_token", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "grant_type": "refresh_token",
            "refresh_token": refreshToken
        }),
    });
    if (!res.ok) {
        return null;
    }
    return await res.json()
};

const fetchServiceFusionCheckIfCustomerExists = async (email, token) => {
    const res = await fetch(`https://api.servicefusion.com/v1/customers?per-page=1&access_token=${token}&filters[email]=${email}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json'
        },
    });
    if (!res.ok) {
        return null;
    }
    return await res.json()
};

const fetchServiceFusionCreateNewCustomer = async (customer, token) => {
    const res = await fetch('https://api.servicefusion.com/v1/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        },
        body: JSON.stringify(customer),
    });
    if (!res.ok) {
        // const msg = await res.json()
        // console.log(msg)
        return null;
    }
    return await res.json()
};


export async function POST(req) {
    await connectDB();
    const credentials = await Credentials.findById("66dad17f465d12d0ab01513d");
    const updatedServiceFusionAccessTokens = await fetchServiceFusionAccessToken(credentials.serviceFusionRefreshToken);
    if (!updatedServiceFusionAccessTokens) {
        return new Response("Something went wrong (/access_token)", {status: 404});
    } else {
        const { access_token, refresh_token } = updatedServiceFusionAccessTokens;
        credentials.serviceFusionRefreshToken = refresh_token;
        credentials.serviceFusionAccessToken = access_token;
        await credentials.save();
        const { name, phone, email } = await req.json();
        const existingCustomer = await fetchServiceFusionCheckIfCustomerExists(email, access_token);
        if (!existingCustomer) {
            return new Response("Something went wrong (/customer/get)", {status: 404});
        } else {
            if (existingCustomer.items.length !== 0) {
              return Response.json({
                  contactCreated: false,
                  message: `${email} was found as an existing contact in Service Fusion.`
              });
            } else {
                const firstName = name.split(' ').slice(0, -1).join(' ');
                const lastName = name.split(' ').slice(-1).join(' ');
                let newCustomerBody = {
                    customer_name: `${firstName} ${lastName}`,
                    contacts: [{
                        fname: firstName,
                        lname: lastName,
                        phones: [{
                            phone: phone,
                            type: "Mobile"
                        }],
                        emails: [{
                            email: email,
                            class: "Personal"
                        }],
                        is_primary: "true"
                    }],
                    referral_source: "susyqonline",
                    is_taxable: true,
                };
                const newCustomer = await fetchServiceFusionCreateNewCustomer(newCustomerBody, access_token);
                if (!newCustomer) {
                    return new Response("Something went wrong (/customer/post)", {status: 404});
                } else {
                    return Response.json({
                        contactCreated: true,
                        message: `A new contact for ${email} has been created in Service Fusion.`
                    });
                }
            }
        }
    }
}