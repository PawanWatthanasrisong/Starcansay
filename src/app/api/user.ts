import { getSession } from "next-auth/react";

export default async (req: any,res: any) => {
    const session = await getSession({req});

    if(!session) {
        res.status(401).json({ error: "Unauthenticated user"})
        return;
    }

    res.json({
        user: session.user
    })
}

