const db_address = process?.env?.DB_ADDRESS;
const userdb = process?.env?.MONGO_INITDB_ROOT_USERNAME;
const passdb = process?.env?.MONGO_INITDB_ROOT_PASSWORD;
const mongoPort = process?.env?.MONGO_PORT;
const database = process?.env?.DATABASE;

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin',
};

const dbSystem = `mongodb://${userdb}:${passdb}@${db_address}:${mongoPort}/${database}`;

export default {
  dbSystem,
  dbOptions,
};
