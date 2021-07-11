const prompts = require('prompts');
const nunjucks = require("nunjucks");
const fs = require('fs')
const path = require("path");

const basePath = path.join("src")

const capitalize = s => s && s[0].toUpperCase() + s.slice(1)
const lowercase = s => s && s[0].toLowerCase() + s.slice(1)

const modelSchema = []

const schemaValue = async () => {
    const modelValue = await prompts(
        {
            type: 'text',
            name: 'value',
            message: 'Value name (enter to finish)'
        });

    if (!modelValue.value) {
        return
    }

    const modelType = await prompts([
        {
            type: 'autocomplete',
            name: 'type',
            message: 'Value type',
            choices: [
                {title: 'Array'},
                {title: 'Boolean'},
                {title: 'Buffer'},
                {title: 'Date'},
                {title: 'Decimal128'},
                {title: 'Map'},
                {title: 'Mixed'},
                {title: 'Number'},
                {title: 'ObjectId'},
                {title: 'Schema'},
                {title: 'String'},
            ]
        },
        {
            type: 'text',
            name: 'default',
            message: 'Default value (empty for not default)'
        },
        {
            type: 'confirm',
            name: 'required',
            message: 'Is required'
        }
    ])

    modelSchema.push({...modelValue, ...modelType})
    await schemaValue()
}

let modelName
const model = async () => {
    const response = await prompts({
        type: 'text',
        name: 'model',
        message: 'Model name'
    });
    if (!response.model.length) {
        console.log("Model name is required, exiting...")
        process.exit(1);
    }
    modelName = {
        uc: capitalize(response.model),
        lc: lowercase(response.model)
    }
};

(async () => {
    await model()
    await schemaValue()

    const modelFilePath = path.join(basePath, 'models', `${modelName.uc}Model.ts`)
    if (!fs.existsSync(modelFilePath)) {
        const modelRes = nunjucks.render('./builder/model.j2', {
            model: modelName,
            schema: modelSchema
        })
        fs.writeFile(modelFilePath, modelRes, err => {
            if (err) {
                console.error(err)
            }
            console.log(`${modelName.uc}Model.ts generated correctly`)
        })
    }

    const routerFilePath = path.join(basePath, 'routers', `${modelName.lc}Router.ts`)
    if (!fs.existsSync(routerFilePath)) {
        const modelRes = nunjucks.render('./builder/router.j2', {
            model: modelName,
            schema: modelSchema
        })
        fs.writeFile(routerFilePath, modelRes, err => {
            if (err) {
                console.error(err)
            }
            console.log(`${modelName.uc}Router.ts generated correctly`)
        })
    }

    const controllerFilePath = path.join(basePath, 'controllers', `${modelName.lc}Controller.ts`)
    if (!fs.existsSync(controllerFilePath)) {
        const modelRes = nunjucks.render('./builder/controller.j2', {
            model: modelName,
            schema: modelSchema
        })
        fs.writeFile(controllerFilePath, modelRes, err => {
            if (err) {
                console.error(err)
            }
            console.log(`${modelName.uc}Controller.ts generated correctly`)
        })
    }

    console.log("Remember to go to ./src/router.ts and add the route import")
})();
