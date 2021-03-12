import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';

enum IOError {
  ENOENT = 'ENOENT',
}

enum CellType {
  CODE = 'code',
  MARKDOWN = 'markdown',
}

interface Cell {
  id: string;
  content: string;
  type: CellType;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (_request, response) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
      response.send(JSON.parse(result));
    } catch (error) {
      if (error.code === IOError.ENOENT) {
        // Create empty file
        await fs.writeFile(fullPath, '[]', 'utf-8');
        response.send([]);
      } else {
        throw error;
      }
    }

    // Parse a list of cells
    // Send list of cells and render it
  });

  router.post('/cells', async (request, response) => {
    // take the list of cells from the request
    // serialize them
    const { cells }: { cells: Cell[] } = request.body;

    // write the cells to the file
    await fs.writeFile(fullPath, JSON.stringify(cells, null, 2), 'utf-8');
    response.send({ status: 'ok' });
  });

  return router;
};
