const clients = [
    {
        id : 1,
        client_name : 'Husky'
    }
]

const plants = [
    {
        id : 1,
        client_id : 1,
        name : 'Lima',

    },
    {
        id : 2,
        client_id : 1,
        name : 'Martinez',

    }
]

const flares = [
    {
        id : 1,
        plant_id : 1,
        name : "FCC",
    },
    {
        id : 2,
        plant_id : 1,
        name : "LIU",
    },
    {
        id : 3,
        plant_id : 2,
        name : "Some Other Flare",
    },
]

const headers = [
    {
        id : 1,
        flare_id : 1,
        name : 'header 1'
    },
    {
        id : 2,
        flare_id : 2,
        name : 'Sweet A'
    },
    {
        id : 3,
        flare_id : 2,
        name : 'Sweet B'
    },
    {
        id : 4,
        flare_id : 2,
        name : 'Aromatics'
    },
]

const processes = [
    {
        id : 1,
        header_id : 1,
        name: 'FCC'
    },
    {
        id : 2,
        header_id : 1,
        name: 'Coker'
    },
    {
        id : 3,
        header_id : 1,
        name: 'Gasoline Desulfurization'
    },
    {
        id : 4,
        header_id : 2,
        name: 'Ultraformer'
    },
    {
        id : 5,
        header_id : 2,
        name: 'Isocracker'
    },
]

const instruments = [
    {
        id : 1,
        parent_id : 1,
        parent_type : 'header',
        name : 'New Instrument 1',
        instrument_description : 'some description',
    },
    {
        id : 2,
        parent_id : 1,
        parent_type : 'flare',
        name : 'New Instrument 2',
        instrument_description : 'some description',
    },
    {
        id : 3,
        parent_id : 3,
        parent_type : 'header',
        name : 'New Instrument 3',
        instrument_description : 'some description',
    },
]

const instrument_data = [
    {
        id : 1,
        instrument_id : 1,
        data_desription : 'Some description of the data it is collecting',
        paramater : 'Ammonia',
        uom : 'mol%',
        pi_tag : 'AI6262W',
        min : 100,
        max : 1000
    },
    {
        id : 2,
        instrument_id : 1,
        data_desription : 'Some description of the data it is collecting',
        paramater : 'H2S',
        uom : 'ppm',
        pi_tag : 'AI6262B',
        min : 100,
        max : 1000
    },
]