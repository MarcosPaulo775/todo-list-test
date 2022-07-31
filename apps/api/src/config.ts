const db_address = process?.env?.DB_ADDRESS;
const userdb = process?.env?.USERDB;
const passdb = process?.env?.PASSDB;
const mongoPort = process?.env?.MONGO_PORT;
const database = process?.env?.DATABASE;

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  authSource: 'admin',
};

const dbSystem = `mongodb://${userdb}:${passdb}@${db_address}:${mongoPort}/${database}`;

export default {
  dbSystem,
  dbOptions,
};
