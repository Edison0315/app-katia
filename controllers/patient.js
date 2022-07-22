const { request, response } = require('express')
const axios                 = require('axios').default;

/**
 * 
 * @param Request req
 * @param Response res
 * @returns JSON json
 */
const getMetrics = async(req = request, res = response) => {

    let titles      = [
        'Presion Arterial',
        'Azucar en la Sangre',
        'Colesterol',
        'Peso',
        'Habitos Alimenticios',
        'Actividad Fisica',
        'Consume Tabaco',
        'Es saludable'
    ]

    let metrics_bag = []

    const url = `${process.env.DEMO_PERFIL_KH}/patient/11391/metrics`

    const metrics = await axios.get(url).then((response) => { return response.data.patient_metrics })

    const quantitative_keys = Object.keys(metrics.quantitative)
    const qualitative_keys  = Object.keys(metrics.qualitative)

    quantitative_keys.map((element) => {
        metrics_bag.push(metrics.quantitative[element])
    })

    qualitative_keys.map((element) => {
        metrics_bag.push(metrics.qualitative[element])
    })

    // Transform data!

    metrics_bag.forEach((e, index) => {

        e.title = titles[index]

        if(Number(e.goal)){
            e.goal = parseInt(e.goal)
        }
        
        if(Number(e.value)){
            e.value = parseInt(e.value)
        }

    })

    return res.json(metrics_bag)

}

module.exports = {
    getMetrics 
}