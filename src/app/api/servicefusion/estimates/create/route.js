import connectDB from "@/lib/connectDB";
import Credentials from "@/models/credentials";
import {
    fetchServiceFusionAccessToken,
    fetchServiceFusionCheckIfCustomerExists,
    fetchServiceFusionCreateNewCustomer, fetchServiceFusionCreateNewEstimate
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
        const { frequency, services, serviceDetails, serviceContact, serviceNotes, serviceSource } = await req.json();
        const { firstName, lastName, email, phone, cleaningAddress } = serviceContact;
        const { rooms, size, extras } = serviceDetails;
        let estimateCustomerName;

        const checkResponse = await fetchServiceFusionCheckIfCustomerExists(email, access_token);
        if (!checkResponse.success) {
            return new Response(checkResponse.message, {status: 500});
        }
        if (checkResponse.message === "Customer found") {
            estimateCustomerName = checkResponse.data;
        }
        if (checkResponse.message === "Customer not found") {
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
                delete newCustomerPayload.locations;
            }
            const createCustomerResponse = await fetchServiceFusionCreateNewCustomer(newCustomerPayload, access_token);
            if (!createCustomerResponse.success) {
                return new Response(createCustomerResponse.message, {status: 500});
            }
            estimateCustomerName = createCustomerResponse.data;
        }
        const estimateTimestamp = getFormattedCurrentDateTime();
        const estimateServices = getServices(rooms.bedroom, rooms.bathroom, frequency, serviceDetails.frequency, services, extras);
        const estimateNotes = getNotes(frequency, serviceDetails.frequency, services[0], rooms.bedroom, rooms.bathroom, size, extras, serviceSource, phone, serviceNotes);
        const estimateDescription = getDescription(frequency, services[0]);
        const estimateCustomFields = [{ name: "Bedrooms", value: parseInt(rooms.bedroom) }, { name: "Bathrooms", value: parseInt(rooms.bathroom) }];
        const newEstimatePayload = {
            created_at: estimateTimestamp,
            customer_name: estimateCustomerName,
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
        const createEstimateResponse = await fetchServiceFusionCreateNewEstimate(newEstimatePayload, access_token);
        if (!createEstimateResponse.success) {
            return new Response(createEstimateResponse.message, {status: 500});
        }
        return new Response(createEstimateResponse.message);

    } catch (error) {
        console.error("API Error:", error.message);
        return new Response(`Error: ${error.message}`, {status: 500});
    }
}

// Helper functions

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