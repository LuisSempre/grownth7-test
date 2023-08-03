export interface Job {
  ID: number;
  Descrição: string;
  "Data Máxima de conclusão": string;
  "Tempo estimado": string;
}

export function organizarJobs(jobsArray: Job[]): Job[][] {
  jobsArray.sort((a, b) => new Date(a["Data Máxima de conclusão"]).getTime() - new Date(b["Data Máxima de conclusão"]).getTime());

  function horasParaMilissegundos(horas: string): number {
    return parseInt(horas) * 60 * 60 * 1000;
  }

  const conjuntoDeArrays: Job[][] = [];
  let arrayAtual: Job[] = [];
  let tempoTotalAtual = 0;

  for (const job of jobsArray) {
    const tempoExecucao = horasParaMilissegundos(job["Tempo estimado"]);
    const dataMaximaConclusao = new Date(job["Data Máxima de conclusão"]).getTime();
    const dataInicio = arrayAtual.length === 0 ? new Date().getTime() : new Date(arrayAtual[arrayAtual.length - 1]["Data Máxima de conclusão"]).getTime();

    if (tempoTotalAtual + tempoExecucao <= 8 * 60 * 60 * 1000 && dataMaximaConclusao >= dataInicio) {
      arrayAtual.push(job);
      tempoTotalAtual += tempoExecucao;
    } else {
      conjuntoDeArrays.push([...arrayAtual]);
      arrayAtual = [job];
      tempoTotalAtual = tempoExecucao;
    }
  }

  if (arrayAtual.length > 0) {
    conjuntoDeArrays.push([...arrayAtual]);
  }

  return conjuntoDeArrays;
}

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

console.log(organizarJobs(jobs));
