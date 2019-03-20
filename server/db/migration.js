
import { tables } from './database';

tables();

const migrate = async () => tables();

migrate();
