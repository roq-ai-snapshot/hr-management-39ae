import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { thirdPartyUserValidationSchema } from 'validationSchema/third-party-users';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.third_party_user
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getThirdPartyUserById();
    case 'PUT':
      return updateThirdPartyUserById();
    case 'DELETE':
      return deleteThirdPartyUserById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getThirdPartyUserById() {
    const data = await prisma.third_party_user.findFirst(convertQueryToPrismaUtil(req.query, 'third_party_user'));
    return res.status(200).json(data);
  }

  async function updateThirdPartyUserById() {
    await thirdPartyUserValidationSchema.validate(req.body);
    const data = await prisma.third_party_user.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteThirdPartyUserById() {
    const data = await prisma.third_party_user.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
