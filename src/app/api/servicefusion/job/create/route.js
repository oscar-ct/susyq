import connectDB from "@/lib/connectDB";

import Test from "@/models/test";

export async function POST(req) {
    await connectDB();
    const triggerData = await req.json();
    await Test.create(triggerData);
    return new Response("cool", {status: 200})
}

