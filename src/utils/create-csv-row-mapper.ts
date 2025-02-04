export const createCsvRowMapper = <T>(rows: string[]) => {

   const columns = rows
      .shift()
      ?.split(';')
      .map((column) => {
         return column.trim();
      });

   return {
      mapper: (strRow: string) => {
         const values = strRow.split(';');
         const plain = {};
         columns?.forEach((column, i) => {
            plain[column] = values[i];
         });
         return plain as T;
      },
      columns: columns
   };
}