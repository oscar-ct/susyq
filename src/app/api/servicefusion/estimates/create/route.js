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
    // const msg = await res.text();
    // console.log(msg)
    if (!res.ok && res.status === 500) {
        return 500;
    }
    if (!res.ok) {
        return null;
    }
    return await res.json()
};

const getFormattedCurrentDateTime = () => {
    const now = new Date();
    // Extract local time components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    // Format with +00:00 offset required by API
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+00:00`;
};

const getServices = (bedrooms, bathrooms, frequency, frequencyRate, servicesArray, extras) => {
    let services = [];
    const serviceName = servicesArray[0];

    // Regardless of combination return commercial service
    if (serviceName === "Commercial Cleaning") {
        const service = {
            service: "Office Cleaning",
            tax: "Travis Co"
        }
        services.push(service);
        return services;
    }

    const standardCombinations = [
        "1 bd, 1 ba",
        "1 bd, 1.5 ba",
        "2 bds, 1 ba",
        "2 bds, 1.5 ba",
        "2 bds, 2 ba",
        "2 bds, 2.5 ba",
        "3 bds, 1 ba",
        "3 bds, 1.5 ba",
        "3 bds, 2 ba",
        "3 bds, 2.5 ba",
        "3 bds, 3 ba",
        "4 bds, 2 ba",
        "4 bds, 2.5 ba",
        "4 bds, 3 ba",
    ];
    const xlCombinations = [
        "4 bds, 3.5 ba",
        "4 bds, 4 ba",
        "5 bds, 3 ba",
        "5 bds, 3.5 ba",
        "5 bds, 4 ba",
        "5 bds, 4.5 ba",
        "5 bds, 5 ba",
    ];
    const unusualCombinations = [
        "1 bd, 2 ba",
        "1 bd, 2.5 ba",
        "1 bd, 3 ba",
        "1 bd, 3.5 ba",
        "1 bd, 4 ba",
        "1 bd, 4.5 ba",
        "1 bd, 5 ba",
        "2 bds, 3 ba",
        "2 bds, 3.5 ba",
        "2 bds, 4.0 ba",
        "2 bds, 4.5 ba",
        "3 bds, 4 ba",
        "3 bds, 4.5 ba",
        "3 bds, 5 ba",
        "4 bds, 1 ba",
        "4 bds, 1.5 ba",
        "5 bds, 1 ba",
        "5 bds, 1.5 ba",
        "5 bds, 2 ba",
        "5 bds, 2.5 ba",
    ];

    const bedStr = bedrooms + (parseInt(bedrooms) === 1 ? " bd" : " bds");
    const bathStr = bathrooms + " ba";

    const standardMatchStr = standardCombinations.find(combo => {
        return combo.startsWith(bedStr) && combo.endsWith(bathStr);
    });
    const xlMatchStr = xlCombinations.find(combo => {
        return combo.startsWith(bedStr) && combo.endsWith(bathStr);
    });
    const unusualMatchStr = unusualCombinations.find(combo => {
        return combo.startsWith(bedStr) && combo.endsWith(bathStr);
    });

    if (standardMatchStr) {
        let serviceStr1 = standardMatchStr;
        let serviceStr2 = "Deep Clean";
        if (serviceName === "Move In Cleaning" || serviceName === "Move Out Cleaning") {
            serviceStr2 = "Move In/Out"
        }
        const service = {
            service: `${serviceStr1} - ${serviceStr2}`,
            tax: "Travis Co",
        }
        services.push(service);
    } else if (xlMatchStr) {
        const service = {
            service: "Hourly",
            tax: "Travis Co",
        }
        services.push(service);
    } else if (unusualMatchStr) {
        const service = {
            service: "Unusual Room Count – Confirm Details",
        }
        services.push(service);
    } else {
        const service = {
            service: "Other",
            tax: "Travis Co"
        }
        services.push(service);
    }

    if (extras.length > 0 && !xlMatchStr && !unusualMatchStr) {
        const extraServices = extras.map((serviceName) => {
            return {
                service: serviceName,
                tax: "Travis Co"
            }
        })
        services = [
            ...services,
            ...extraServices,
        ];
    }
    return services;
};

const getNotes = (frequency, frequencyRate, services, bedrooms, bathrooms, size, extrasArray, source, phone, serviceNotes) => {
    const frequencyStr = `Frequency: ${frequency.charAt(0).toUpperCase()}${frequency.slice(1)} ${frequencyRate ? "(" + frequencyRate + ")" : ""}`;
    const serviceStr = `Service: ${services}`;
    const bedroomsStr = `Bedrooms: ${bedrooms}`;
    const bathroomsStr = `Bathrooms: ${bathrooms}`;
    const sqftStr = `Sqft: ${size ? size : "not provided"}`;
    const extrasStr = `Extras: ${extrasArray.length !== 0 ? extrasArray.toString() : "not provided"}`;
    const sourceStr = `Source: ${source ? source : "not provided"}`;
    const phoneStr = `Phone: ${phone ? phone : "not provided"}`;
    const customerNotesStr = `Customer Note: ${serviceNotes}`;
    let notes = [];
    const note1 = {
        notes: `${frequencyStr} --- ${serviceStr} --- ${bedroomsStr} --- ${bathroomsStr} --- ${sqftStr} --- ${extrasStr} --- ${sourceStr} --- ${phoneStr}`,
    };
    const note2 = {
        notes: customerNotesStr
    }
    notes.push(note1);
    if (serviceNotes) notes.push(note2);
    return notes;
};

const getDescription = (frequency, serviceName) => {
    if (serviceName !== "Commercial Cleaning") {
        if (frequency === "recurring") {
            return "For first-time clients, an initial Deep Cleaning Service is required before Recurring Service pricing can begin.";
        }
        if (serviceName === "Move In Cleaning" || serviceName === "Move Out Cleaning") {
            return "For Move In/Out Services, a deposit of 50% of the estimated cost is required upfront. The remaining balance will be charged upon completion. We appreciate your understanding.";
        }
    }
    return "Thank you for reaching out to Susy Q Cleaning! We're excited to assist you with your cleaning needs.";
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
        const { frequency, services, serviceDetails, serviceContact, serviceNotes, serviceSource } = await req.json();
        const { firstName, lastName, email, phone, cleaningAddress } = serviceContact;
        const { rooms, size, extras } = serviceDetails;
        const existingCustomer = await fetchServiceFusionCheckIfCustomerExists(email, access_token);
        if (!existingCustomer) {
            return new Response("Something went wrong (/customer/get)", {status: 404});
        } else {
           const estimateTimestamp = getFormattedCurrentDateTime();
           const estimateServices = getServices(rooms.bedroom, rooms.bathroom, frequency, serviceDetails.frequency, services, extras);
           const estimateNotes = getNotes(frequency, serviceDetails.frequency, services[0], rooms.bedroom, rooms.bathroom, size, extras, serviceSource, phone, serviceNotes);
           const estimateDescription = getDescription(frequency, services[0]);
           const estimateCustomFields = [{ name: "Bedrooms", value: parseInt(rooms.bedroom) }, { name: "Bathrooms", value: parseInt(rooms.bathroom) }];
            if (existingCustomer.items.length !== 0) {
                const newEstimateBody = {
                    // created_at: "2014-09-08T20:42:04+00:00",
                    created_at: estimateTimestamp,
                    customer_name: existingCustomer.items[0].customer_name,
                    description: estimateDescription,
                    notes: estimateNotes,
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
                    services: estimateServices,
                    custom_fields: estimateCustomFields,
                };
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
                        created_at: estimateTimestamp,
                        customer_name: newCustomer === 500 ? `${firstName} ${lastName}` : newCustomer.customer_name,
                        description: estimateDescription,
                        notes: estimateNotes,
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
                        services: estimateServices,
                        custom_fields: estimateCustomFields,
                    };
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