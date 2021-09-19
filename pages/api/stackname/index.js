import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/client'


// DELETE /api/post/:id
export default async function handle(req, res) {
    const session = await getSession({ req });
    const {stackName} = req.body;
    const post = await prisma.app.findMany({
        where: {
            stackName,
            User: {
                email: session?.user?.email
            },
        },

    });
    return post;
}