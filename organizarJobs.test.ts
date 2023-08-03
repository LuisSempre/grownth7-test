import { Job, organizarJobs } from './index';

test('Teste com jobs que precisam ser divididos em mais de um array', () => {
   const jobs: Job[] = [
      {
         "ID": 1,
         "Descrição": "Importação de arquivos de fundos",
         "Data Máxima de conclusão": '2021-02-04 12:00:00',
         "Tempo estimado": '8 horas'
      },
      {
         "ID": 2,
         "Descrição": 'Importação de dados da Base Legada',
         "Data Máxima de conclusão": '2021-02-04 12:00:00',
         "Tempo estimado": '4 horas'
      },
      {
         "ID": 3,
         "Descrição": 'Importação de dados',
         "Data Máxima de conclusão": '2021-02-02 12:00:00',
         "Tempo estimado": '6 horas'
      },
      {
         "ID": 4,
         "Descrição": 'Desenvolver historia 745',
         "Data Máxima de conclusão": '2021-02-02 12:00:00',
         "Tempo estimado": '2 horas'
      },
      {
         "ID": 5,
         "Descrição": 'Gerar QRCode',
         "Data Máxima de conclusão": '2020-02-15 12:00:00',
         "Tempo estimado": '6 horas'
      },
      {
         "ID": 6,
         "Descrição": 'Importação de dados de integração',
         "Data Máxima de conclusão": '2020-02-15 12:00:00',
         "Tempo estimado": '8 horas'
      },
   ];

   const resultado = organizarJobs(jobs);

   // Test the length of the resulting array
   expect(resultado.length).toBe(2);
 
   // Test the total number of jobs in the resulting arrays
   const totalJobsInResultado = resultado.reduce((acc, array) => acc + array.length, 0);
   expect(totalJobsInResultado).toBe(jobs.length);
 
   // Test the total time of jobs in each array
   const totalTimeArray1 = resultado[0].reduce((acc, job) => acc + new Date(job["Tempo estimado"]).getTime(), 0);
   const totalTimeArray2 = resultado[1].reduce((acc, job) => acc + new Date(job["Tempo estimado"]).getTime(), 0);
   expect(totalTimeArray1).toBeLessThanOrEqual(8 * 60 * 60 * 1000);
   expect(totalTimeArray2).toBeLessThanOrEqual(8 * 60 * 60 * 1000);
 
   // Test the order of jobs in each array based on "Data Máxima de conclusão"
   const dataArray1 = resultado[0].map(job => new Date(job["Data Máxima de conclusão"]).getTime());
   const dataArray2 = resultado[1].map(job => new Date(job["Data Máxima de conclusão"]).getTime());
   expect(dataArray1).toEqual(dataArray1.slice().sort((a, b) => a - b));
   expect(dataArray2).toEqual(dataArray2.slice().sort((a, b) => a - b));
});
