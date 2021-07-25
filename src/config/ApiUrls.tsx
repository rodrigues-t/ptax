const isProd = process.env.NODE_ENV === 'production';

const devApiConfig = {
  baseUrl: 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata',
};

const prodApiConfig = {
  baseUrl: 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata',
};

const apiConfig = isProd ? prodApiConfig : devApiConfig;

export {
  apiConfig,
};
