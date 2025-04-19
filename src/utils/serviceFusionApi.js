const handleApiResponse = async (res) => {
    if (!res.ok) {
        const errorText = await res.text().catch(() => "Unknown error");
        throw new Error(`${res.status} - ${errorText}`);
    }
    return await res.json();
};

export const fetchServiceFusionAccessToken = async (refreshToken) => {
    try {
        const res = await fetch("https://api.servicefusion.com/oauth/access_token", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }),
        });
        const resData = await handleApiResponse(res);
        return {
            success: true,
            message: "Access tokens renewed",
            data: resData,
        };
    } catch (error) {
        // console.log(error.message);
        return {
            success: false,
            message: `Error: Failed to fetch access token - ${error.message}`,
        };
    }
};

export const fetchServiceFusionCheckIfCustomerExists = async (email, token) => {
    try {
        const res = await fetch(`https://api.servicefusion.com/v1/customers?per-page=1&access_token=${token}&filters[email]=${email}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
        });
        const resData = await handleApiResponse(res);
        if (resData.items.length > 0) {
            return {
                success: true,
                message: "Customer found",
                data: resData.items[0].customer_name
            };
        } else {
            return {
                success: true,
                message: "Customer not found",
            };
        }
    } catch (error) {
        // console.log(error.message);
        return {
            success: false,
            message: `Error: Failed to check customer existence - ${error.message}`,
        };
    }
};

export const fetchServiceFusionCreateNewCustomer = async (customer, token) => {
    try {
        const res = await fetch('https://api.servicefusion.com/v1/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify(customer),
        });
        const resData = await handleApiResponse(res);
        if (resData) {
            return {
                success: true,
                message: "A new customer has been created.",
                data: resData.customer_name
            };
        }
    } catch (error) {
        // console.log(error.message);
        return {
            success: false,
            message: `Error: Failed to create customer - ${error.message}`,
        };
    }
};

export const fetchServiceFusionCreateNewEstimate = async (estimate, token) => {
    try {
        const res = await fetch('https://api.servicefusion.com/v1/estimates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify(estimate),
        });
        const resData = await handleApiResponse(res);
        if (resData) {
            return {
                success: true,
                message: "A new estimate has been created.",
            };
        }
    } catch (error) {
        // console.log(error.message);
        return {
            success: false,
            message: `Error: Failed to create estimate - ${error.message}`,
        };
    }
};