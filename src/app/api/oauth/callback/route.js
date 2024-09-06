import axios from "axios";
import qs from "qs";

export async function GET (req) {

    const data = qs.stringify({
        'client_id': 'zI1mK1mtureNyvoHkP',
        'client_secret': 'XBwNT1qrUz2ls12hSlLq4CnF0c3Q0Brh',
        'grant_type': 'refresh_token',
        'code': req.query.code,
        'user_type': 'Location',
        'redirect_uri': 'https://susyq.vercel.app/api/oauth/callback'
    });
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.servicefusion.com/oauth/access_token',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };

    const response = await axios.request(config).catch(err => {});

    return Response.json({ data: response?.data });
}