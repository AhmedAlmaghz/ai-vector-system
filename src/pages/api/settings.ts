import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../config/config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(config);
  } else if (req.method === 'POST') {
    try {
      const newSettings = req.body;
      Object.assign(config, newSettings);
      res.status(200).json({ message: 'Settings updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update settings' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}