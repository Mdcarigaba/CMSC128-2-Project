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

    const uni = await lr.unique
    const uni_length = await lr.uni_length
    const len_list = await lr.len_list

     await db.schema.hasTable('conversions').then(async (e) => {
        if (!e) {
            await db.schema.createTable('conversions', (t) => {
                t.increments('conversion_code').primary().unique()
                t.integer('column_index')
                t.float('standard_value')
                t.string('common_value')
            })
            .then(async () => {
                for (let i = 0; i < uni_length; i++){
                    const j = await len_list[i]
                    for (let k = 0; k < j; k++){
                        const sv = await uni[i][0][k]
                        const cv = await uni[i][1][k]
                        await db('conversions').insert([{
                            column_index: i,
                            standard_value: sv,
                            common_value: cv
                        }])
                    }
                }
            })
        }
        else {
            console.log('already exists')
        }
    })
    python.exit(); 
}

export default initialize