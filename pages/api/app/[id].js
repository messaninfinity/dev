import prisma from '../../../lib/prisma'


// DELETE /api/post/:id
export default async function handle(req, res) {
  const id = req.query.id;
  if (req.method === "DELETE") {
  console.log(id)

    const post = await prisma.post.delete({
      where: { id },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}