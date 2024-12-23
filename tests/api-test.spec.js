const { test, expect } = require("@playwright/test");
const { Ajv } = require("ajv");

const ajv = new Ajv()

test

test('TC-1 GET List Users', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2');
    expect(response.status()).toBe(200)

    const responseData = await response.json()

    expect(responseData.id).toBe("9")
    expect(responseData.first_name).toBe("Tobias")
    expect(responseData.last_name).toBe("Funke")

    const valid = ajv.validate(require('./jsonschema/get-list-users-schema.json'), responseData)

    if (!valid) {
        console.error("Ajv Validation Error:", ajv.errorsText());
    }

    expect(valid).toBe(true);
});

test('TC-2 POST Create Users', async ({ request }) => {
    
    const bodyData = {
        "name": "Ramdhan",
        "job": "musician"
        }
        
    const headerData = {
        Accept: 'application/json'
    }
    
    const response = await request.post('https://reqres.in/api/users', {
        headers: headerData,
        data: bodyData
    })
    
    expect(response.status()).toEqual(201)
    expect(response.ok()).toBeTruthy()

    const resBody = await response.json()
    expect(resBody.name).toEqual("Ramdhan")
    expect(resBody.job).toEqual("musician")

    const valid = ajv.validate(require('./jsonschema/post-create-users-schema.json'), resBody)

    if (!valid) {
        console.error("Ajv Validation Error:", ajv.errorsText());
    }

    expect(valid).toBe(true);
});

test('TC-3 DELETE Users', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/2');
    expect(response.status()).toBe(204)

    const responseData = await response.json()

    expect(responseData.name).toBe()
    expect(responseData.job).toBe()

    const valid = ajv.validate(require('./jsonschema/delete-users-schema.json'), responseData)

    if (!valid) {
        console.error("Ajv Validation Error:", ajv.errorsText());
    }

    expect(valid).toBe(true);
});

test('TC-4 PUT Update Users', async ({ request }) => {
    
    const bodyData = {
        "name": "Ramdhan",
        "job": "artist"
        }
        
    const headerData = {
        Accept: 'application/json'
    }
    
    const response = await request.put('https://reqres.in/api/users/2', {
        headers: headerData,
        data: bodyData
    })
    
    expect(response.status()).toEqual(200)
    expect(response.ok()).toBeTruthy()

    const resBody = await response.json()
    expect(resBody.name).toEqual("Ramdhan")
    expect(resBody.job).toEqual("artist")

    const valid = ajv.validate(require('./jsonschema/put-update-users-schema.json'), resBody)

    if (!valid) {
        console.error("Ajv Validation Error:", ajv.errorsText());
    }

    expect(valid).toBe(true);
});