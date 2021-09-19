
import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/client'


// POST /api/apps
// Required fields in body: stack
// Optional fields in body: stackName
// Optional fields in body: StackDomaineName
// Optional fields in body: StackPlan
export default async function handle(req, res) {
    const { stack, stackName, StackDomaineName, StackPlan } = req.body;

    const session = await getSession({ req });
    const result = await prisma.app.create({

    
        data: {
            stack: stack,
            stackName: stackName,
            StackDomaineName: StackDomaineName,
            StackPlan: StackPlan,
            User: { connect: { email: session?.user?.email  || session?.user?.name } },
        },
    });
    res.json(result);
}