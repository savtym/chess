const PORT = process.env.PORT || '8080';
const __PROD__ = process.env.NODE_ENV === 'production';

const config = {

};

const configProd = {
  apiDomain: '',
};

const configDev = {
  apiDomain: `http://0.0.0.0:${PORT}`,
};

if (__PROD__) {
  Object.assign(config, configProd);
} else {
  Object.assign(config, configDev);
}

export default config;