const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.CHATGPT_APIKEY,
});

// Create a cover letter
exports.askSomething = async (form) => {
    try {
        const openai = new OpenAIApi(configuration);
        return openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Rédige une lettre de motivation dont mon nom est ${form.firstname} ${form.lastname}, mon métier est ${form.job} et mes forces sont ${form.strenght}. Fais attention à ne pas trop mettre le mots "très" partout`,
            temperature: 0,
            max_tokens: 700,
        }).then((response) => { return ({ success: true, data: response.data.choices[0].text }) })

    } catch (error) {
        console.error(error);
    }
};


