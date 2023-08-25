import { DsnParser } from "../src/dsn"

describe('DSN PARSER', function () {

    it.concurrent('should make dynamic object', function () {
        const dsn = new DsnParser()
        const testDatas = [{
            collection: 'test',
            field: 'field_1',
            dsnStructure: '',
            value: 'value_1'
        },
        {
            collection: 'test',
            field: 'field_2',
            dsnStructure: '',
            value: 'value_2'
        },
        ]
        const testDsnMakeDynamicObject = dsn.makeDynamicObject(testDatas)
        expect(testDsnMakeDynamicObject).toStrictEqual({
            date: '',
            field_1: 'value_1',
            field_2: 'value_2',
            siren: ''
        })
    })

})


