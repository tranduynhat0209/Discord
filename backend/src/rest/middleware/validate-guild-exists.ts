import { NextFunction, Request, Response } from 'express';
import { Guild } from '../../data/entity/Guild';

export default async (req: Request, res: Response, next: NextFunction) => {
  const exists = await deps.dataSource.getRepository(Guild).exist({
    where: {id: req.params.id}
  });
  return (exists)
    ? next()
    : res.status(404).json({ message: 'Guild does not exist' });
}