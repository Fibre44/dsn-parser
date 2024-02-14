import exp from "node:constants"
import { DsnParser } from "../src/dsn"
import { expect, test } from 'vitest'

test('should make dynamic object', function () {
    const dsn = new DsnParser()
    dsn.date = '01012023'
    dsn.siren = '999999999'
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
    }

    ]
    const testDsnMakeDynamicObject = dsn.makeDynamicObject(testDatas)
    expect(testDsnMakeDynamicObject).toStrictEqual({
        date: '01012023',
        field_1: 'value_1',
        field_2: 'value_2',
        siren: '999999999',
    })
})

test('should make dynamic object', function () {
    const dsn = new DsnParser()
    dsn.date = '01012023'
    dsn.siren = '999999999'
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
    }

    ]
    const testDsnMakeDynamicObject = dsn.makeDynamicObject(testDatas)
    expect(testDsnMakeDynamicObject).toStrictEqual({
        date: '01012023',
        field_1: 'value_1',
        field_2: 'value_2',
        siren: '999999999',
    })
})

test('should get socialPaymentObject', function () {
    const dsn = new DsnParser()
    dsn.date = '01012023'
    dsn.siren = '999999999'
    dsn.socialPaymentList = {
        collection: 'SocialPayment',
        field: 'idSocialPayment',
        dsnStructure: 'S21.G00.20.001',
        value: 'URSSAF'
    }
    dsn.socialPaymentList = {
        collection: 'SocialPayment',
        field: 'operationsAssignmentEntity',
        dsnStructure: 'S21.G00.20.002',
        value: 'URSSAF'
    }
    dsn.socialPaymentList = {
        collection: 'SocialPayment',
        field: 'contributionFundBIC',
        dsnStructure: 'S21.G00.20.003',
        value: 'AGRXXXX'
    }
    dsn.socialPaymentList = {
        collection: 'SocialPayment',
        field: 'contributionFundIBAN',
        dsnStructure: 'S21.G00.20.004',
        value: 'FR7699999999'
    }
    dsn.socialPaymentList = {
        collection: 'SocialPayment',
        field: 'contributionFundAmount',
        dsnStructure: 'S21.G00.20.005',
        value: '200000'
    }
    dsn.socialPaymentList = {
        collection: 'SocialPayment',
        field: 'contributionFundStartDate',
        dsnStructure: 'S21.G00.20.006',
        value: '01011900'
    }
    dsn.socialPaymentList = {
        collection: 'SocialPayment',
        field: 'contributionFundEndDate',
        dsnStructure: 'S21.G00.20.007',
        value: '01014000'
    }
    dsn.socialPaymentList = {
        collection: 'SocialPayment',
        field: 'managementDelegateCode',
        dsnStructure: 'S21.G00.20.007',
        value: ''
    }
    dsn.socialPaymentList = {
        collection: 'SocialPayment',
        field: 'managementDelegateCode',
        dsnStructure: 'S21.G00.20.007',
        value: ''
    }
    dsn.socialPaymentList = {
        collection: 'SocialPayment',
        field: 'paymentMethod',
        dsnStructure: 'S21.G00.20.007',
        value: '05'
    }
    dsn.socialPaymentList = {
        collection: 'SocialPayment',
        field: 'paymentDate',
        dsnStructure: 'S21.G00.20.007',
        value: '01012023'
    }
    dsn.socialPaymentList = {
        collection: 'SocialPayment',
        field: 'contributionFundSIRET',
        dsnStructure: 'S21.G00.20.007',
        value: ''
    }
    expect(dsn.socialPayment).toStrictEqual({
        siren: '999999999',
        date: '01012023',
        idSocialPayment: 'URSSAF',
        operationsAssignmentEntity: 'URSSAF',
        contributionFundBIC: 'AGRXXXX',
        contributionFundIBAN: 'FR7699999999',
        contributionFundAmount: '200000',
        contributionFundStartDate: '01011900',
        contributionFundEndDate: '01014000',
        managementDelegateCode: '',
        paymentMethod: '05',
        paymentDate: '01012023',
        contributionFundSIRET: ''

    })
})

test('shoud get societyObject', function () {
    const dsn = new DsnParser()
    dsn.date = '01012023'
    dsn.siren = '999999999'
    dsn.societyList = {
        collection: 'Society',
        field: 'siren',
        dsnStructure: 'S21.G00.06.001',
        value: '999999999'
    }
    dsn.societyList = {
        collection: 'Society',
        field: 'nic',
        dsnStructure: 'S21.G00.06.002',
        value: '00010'
    }
    dsn.societyList = {
        collection: 'Society',
        field: 'apen',
        dsnStructure: 'S21.G00.06.003',
        value: 'AGRPP'
    }
    dsn.societyList = {
        collection: 'Society',
        field: 'adress1',
        dsnStructure: 'S21.G00.06.004',
        value: '1 rue du test'
    }
    dsn.societyList = {
        collection: 'Society',
        field: 'adress2',
        dsnStructure: 'S21.G00.06.007',
        value: 'Batiment 1'
    }
    dsn.societyList = {
        collection: 'Society',
        field: 'adress3',
        dsnStructure: 'S21.G00.06.008',
        value: 'Porte 2'
    }
    dsn.societyList = {
        collection: 'Society',
        field: 'zipCode',
        dsnStructure: 'S21.G00.06.005',
        value: '75000'
    }
    dsn.societyList = {
        collection: 'Society',
        field: 'city',
        dsnStructure: 'S21.G00.06.006',
        value: 'Paris'
    }
    dsn.societyList = {
        collection: 'Society',
        field: 'idcc',
        dsnStructure: 'S21.G00.06.015',
        value: '9999'
    }
    dsn.societyList = {
        collection: 'Society',
        field: 'averageWorkForce31DecemberSociety',
        dsnStructure: 'S21.G00.06.009',
        value: '500'
    }
    dsn.societyList = {
        collection: 'Society',
        field: 'countrySociety',
        dsnStructure: 'S21.G00.06.010',
        value: 'FRA'
    }
    dsn.societyList = {
        collection: 'Society',
        field: 'foreignDistributionCode',
        dsnStructure: 'S21.G00.06.011',
        value: ''
    }
    dsn.societyList = {
        collection: 'Society',
        field: 'establishmentOfTheCompany',
        dsnStructure: 'S21.G00.06.012',
        value: ''
    }

    expect(dsn.society).toStrictEqual({
        siren: '999999999',
        nic: '00010',
        apen: 'AGRPP',
        adress1: '1 rue du test',
        adress2: 'Batiment 1',
        adress3: 'Porte 2',
        zipCode: '75000',
        city: 'Paris',
        date: '01012023',
        idcc: '9999',
        averageWorkForce31DecemberSociety: '500',
        countrySociety: 'FRA',
        foreignDistributionCode: '',
        establishmentOfTheCompany: ''
    })
})
test('should get contributionSlip', function () {
    const dsn = new DsnParser()
    dsn.date = '01012023'
    dsn.siren = '999999999'
    dsn.contributionSlip = {
        collection: 'contributionSlip',
        field: 'socialProtectionOrganizationId',
        dsnStructure: 'S21.G00.22.001',
        value: '1',
        siret: '99999999999999'
    }
    dsn.contributionSlip = {
        collection: 'contributionSlip',
        field: 'operationEntity',
        dsnStructure: 'S21.G00.22.002',
        value: '99999999999999',
        siret: '99999999999999'
    }
    dsn.contributionSlip = {
        collection: 'contributionSlip',
        field: 'startDateContributionSlip',
        dsnStructure: 'S21.G00.22.003',
        value: '01012023',
        siret: '99999999999999'
    }
    dsn.contributionSlip = {
        collection: 'contributionSlip',
        field: 'endDateContributionSlip',
        dsnStructure: 'S21.G00.22.005',
        value: '31012023',
        siret: '99999999999999'
    }
    dsn.contributionSlip = {
        collection: 'contributionSlip',
        field: 'amountContributionSlip',
        dsnStructure: 'S21.G00.22.005',
        value: '10000',
        siret: '99999999999999'
    }
    dsn.contributionSlip = {
        collection: 'contributionSlip',
        field: 'crmContributionSlip',
        dsnStructure: 'S21.G00.22.005',
        value: 'CRM',
        siret: '99999999999999'
    }


    expect(dsn.contributionSlip).toStrictEqual([{
        siret: '99999999999999',
        date: '01012023',
        socialProtectionOrganizationId: '1',
        operationEntity: '99999999999999',
        startDateContributionSlip: '01012023',
        endDateContributionSlip: '31012023',
        amountContributionSlip: '10000',
        crmContributionSlip: 'CRM'
    }])

})
test('should get dsnObject', function () {
    const dsn = new DsnParser()
    dsn.date = '01012023'
    dsn.siren = '999999999'
    dsn.dsnList = {
        collection: 'Dsn',
        field: 'softwareName',
        dsnStructure: 'S10.G00.00.001',
        value: 'Logiciel'
    }
    dsn.dsnList = {
        collection: 'Dsn',
        field: 'provider',
        dsnStructure: 'S10.G00.00.002',
        value: 'Mon fournisseur de paie'
    }
    dsn.dsnList = {
        collection: 'Dsn',
        field: 'softwareVersion',
        dsnStructure: 'S10.G00.00.003',
        value: '1'
    }
    dsn.dsnList = {
        collection: 'Dsn',
        field: 'dsnVersion',
        dsnStructure: 'S10.G00.00.006',
        value: '2023'
    }
    dsn.dsnList = {
        collection: 'Dsn',
        field: 'type',
        dsnStructure: 'S10.G00.00.008',
        value: 'Normal'
    }
    dsn.dsnList = {
        collection: 'Dsn',
        field: 'totalRows',
        dsnStructure: 'S90.G00.90.001',
        value: '99999'
    }

    expect(dsn.dsn).toStrictEqual({
        date: '01012023',
        siren: '999999999',
        softwareName: 'Logiciel',
        provider: 'Mon fournisseur de paie',
        softwareVersion: '1',
        dsnVersion: '2023',
        type: 'Normal',
        totalRows: '99999',
    })
})

