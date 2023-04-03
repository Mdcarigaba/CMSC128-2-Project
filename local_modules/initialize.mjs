import { python } from "pythonia";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __root = __dirname.replace('\\local_modules', '')
const lr_model = '/py/ml-model.py'
    
const initialize = async (db) => {
    const py_file = path.join(__root, lr_model)
    const lr = await python(py_file)
    const arr = await lr.unique
    
    python.exit(); 
}

export default initialize