const axios = require('axios');
const qs = require('qs');

export async function GET (req) {

    const code =  req.nextUrl.searchParams.get('code');
    if (code) {
        const data = qs.stringify({
            'client_secret': 'XBwNT1qrUz2ls12hSlLq4CnF0c3Q0Brh',
            "grant_type": "authorization_code",
            'client_id': 'zI1mK1mtureNyvoHkP',
            'code': code,
            'redirect_uri': 'https://susyq.vercel.app/api/oauth/callback'
        });
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.servicefusion.com/oauth/access_token',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data : data
        };

        const response = await axios.request(config).catch(err => {});
        return Response.json({ data: response?.data });
    }
    return new Response("no code")
}