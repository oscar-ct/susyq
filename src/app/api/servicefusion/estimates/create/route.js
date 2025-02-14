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
    if (!res.ok && res.status === 500) {
        return 500;
    }
    if (!res.ok) {
        // const msg = await res.text();
        // console.log(msg)
        return null;
    }
    return await res.json()
};

const fetchServiceFusionCreateNewEstimate = async (estimate, token) => {
    const res = await fetch('https://api.servicefusion.com/v1/estimates', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        },
        body: JSON.stringify(estimate),
    });
    if (!res.ok && res.status === 500) {
        return 500;
    }
    if (!res.ok) {
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
        const { services, serviceDetails, serviceContact, serviceNotes, serviceSource } = await req.json();
        const { firstName, lastName, email, phone, cleaningAddress } = serviceContact;
        const { rooms, size, extras } = serviceDetails;
        const existingCustomer = await fetchServiceFusionCheckIfCustomerExists(email, access_token);
        if (!existingCustomer) {
            return new Response("Something went wrong (/customer/get)", {status: 404});
        } else {
            if (existingCustomer.items.length !== 0) {
                const newEstimateBody = {
                    customer_name: existingCustomer.items[0].customer_name,
                    description: `Services Requested: ${services.toString()} - Bedrooms: ${rooms.bedroom} - Bathrooms: ${rooms.bathroom} - Size: ${size ? size : "not provided"} - Extras: ${extras.length !== 0 ? extras.toString() : "not provided"} - Source: ${serviceSource ? serviceSource : "not provided"} - Phone: ${phone ? phone : "n/a"}`,
                    notes: [
                        {
                            notes: serviceNotes
                        }
                    ],
                    contact_first_name: firstName,
                    contact_last_name: lastName,
                    status: "Estimate Requested",
                    street_1: cleaningAddress.address1 ? cleaningAddress.address1 : "",
                    street_2: cleaningAddress.address2 ? cleaningAddress.address2 : "",
                    city: cleaningAddress.city ? cleaningAddress.city : "",
                    state_prov: cleaningAddress.city ? "Texas" : "",
                    postal_code: cleaningAddress.zipCode ? cleaningAddress.zipCode : "",
                    source: "susyqonline",
                    opportunity_owner: "Dalia Ballard",
                    services: [
                        {
                            service: "Deep Clean -  2/2.5"
                        }
                    ],
                };
                if (serviceNotes.length === 0) {
                    delete newEstimateBody.notes;
                }
                const newEstimate = await fetchServiceFusionCreateNewEstimate(newEstimateBody, access_token);
                if (!newEstimate) {
                    return new Response("Something went wrong (/estimates)", {status: 404});
                } else {
                    if (newEstimate === 500) {
                        return new Response("500");
                    }
                    return new Response("Estimated created!");
                }
            } else {
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
                    locations: [{
                        street_1: cleaningAddress.address1,
                        street_2: cleaningAddress.address2,
                        city: cleaningAddress.city,
                        state_prov: "Texas",
                        postal_code: cleaningAddress.zipCode,
                    }],
                    referral_source: "susyqonline",
                    is_taxable: true,
                };
                if (cleaningAddress.address1.length === 0) {
                    delete newCustomerBody.locations;
                }
                const newCustomer = await fetchServiceFusionCreateNewCustomer(newCustomerBody, access_token);
                if (!newCustomer) {
                    return new Response("Something went wrong (/customer/post)", {status: 404});
                } else {
                    const newEstimateBody = {
                        customer_name: newCustomer === 500 ? `${firstName} ${lastName}` : newCustomer.customer_name,
                        description: `Services Requested: ${services.toString()} - Bedrooms: ${rooms.bedroom} - Bathrooms: ${rooms.bathroom} - Size: ${size ? size : "not provided"} - Extras: ${extras.length !== 0 ? extras.toString() : "not provided"} - Source: ${serviceSource ? serviceSource : "not provided"} - Phone: ${phone ? phone : "n/a"}`,
                        notes: [
                            {
                                notes: serviceNotes
                            }
                        ],
                        contact_first_name: firstName,
                        contact_last_name: lastName,
                        status: "Estimate Requested",
                        street_1: cleaningAddress.address1 ? cleaningAddress.address1 : "",
                        street_2: cleaningAddress.address2 ? cleaningAddress.address2 : "",
                        city: cleaningAddress.city ? cleaningAddress.city : "",
                        state_prov: cleaningAddress.city ? "Texas" : "",
                        postal_code: cleaningAddress.zipCode ? cleaningAddress.zipCode : "",
                        source: "susyqonline",
                        opportunity_owner: "Dalia Ballard",
                    };
                    if (!serviceNotes) {
                        delete newEstimateBody.notes
                    }
                    const newEstimate = await fetchServiceFusionCreateNewEstimate(newEstimateBody, access_token);
                    if (!newEstimate) {
                        return new Response("Something went wrong (/estimates/services!!!!!went wrong)", {status: 404});
                    } else {
                        if (newEstimate === 500) {
                            return new Response("500");
                        }
                        return new Response("Estimated created!");
                    }
                }
            }
        }
    }
}


// todo: check the following
// alternate contact, phone number not displayed!! why