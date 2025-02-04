import { readdirSync } from 'fs';
import { prompt } from 'enquirer';
import { config } from '../config';

export const selectFileToImport = async (first = false) => {
   const files = readdirSync(process.cwd())
      .filter((file) => {
         return file.endsWith('.csv');
      });

   if (files.length === 0) {
      throw new Error(`CSV for import not found in root directory: ${process.cwd()}`);
   }

   if (files.length === 1 || first) {
      config.importFile = files[0];
   } else {
      const response = await prompt<{ file: string }>({
         type: 'select',
         name: 'file',
         message: 'Select the file you want to import',
         choices: files
      });
      config.importFile = response.file;
   }
}