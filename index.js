const { Telegraf, Markup } = require('telegraf'); // Importa o Telegraf e o Markup
const axios = require('axios'); // Importa o Axios para requisições HTTP
const bot = new Telegraf('7853185177:AAFcV7e8auo_QxMPHaE9_CYJ0O3LgbOm50E'); // Token do seu bot

// Define a chave da API do Pushin Pay
const PUSHIN_PAY_API_KEY = '1720|hZ42SlgkeM27SP6J1oJWR5I3hgmqKg988TtQtJsE5f93fe73';

// URL base da API
const API_BASE_URL = 'https://api.pushinpay.com.br/api'; // Use a URL de produção

// ID do administrador (substitua pelo ID do seu administrador)
const ADMIN_ID = '5308694170';

// Função para enviar a mensagem inicial
bot.start((ctx) => {
    const videoUrl = 'https://video.gumlet.io/66180b4d8ec2efeb9164568c/66180b9c8ec2efeb916458ec/download.mp4'; // URL do vídeo

    // Mensagem a ser enviada
    const caption = `🔥 SOMENTE HOJE METADE DO PREÇO 🔥\n\n` +
                    `• Pacote MORANGO 🍓 \n` +
                    `10 Fotos + 13 Vídeos de nudes e masturbação\n` +
                    `🔥 De R$ 39,90 por R$ 19,90\n\n` +
                    `• Pacote PÊSSEGO 🍑\n` +
                    `15 Fotos + 20 Vídeos de masturbação e sexo oral\n` +
                    `🔥 De R$ 74,00 por R$ 37\n\n` +
                    `• Pacote CEREJA 🍒\n` +
                    `20 Fotos + 25 Vídeos de nudes, masturbação, oral e transando\n` +
                    `🔥 De R$ 114,00 por R$ 57\n\n` +
                    `Tô esperando por você 💖\nQual pacote você vai querer? 🔞👇🏻`;

    // Definindo os botões inline
    const inlineKeyboard = Markup.inlineKeyboard([
        [Markup.button.callback('MORANGO • R$19,90', 'pixmorango')],
        [Markup.button.callback('PÊSSEGO • R$37', 'pixpessego')],
        [Markup.button.callback('CEREJA • R$57', 'pixcereja')]
    ]);

    // Enviando o vídeo e a mensagem com os botões
    ctx.replyWithVideo(videoUrl, { caption, reply_markup: inlineKeyboard.reply_markup });
});

// Função genérica para gerar pagamento
async function gerarPagamento(ctx, valor, descricao) {
    await ctx.reply('Gerando Pagamento\\.\\.\\.', { parse_mode: 'MarkdownV2' });

    try {
        const response = await axios.post(`${API_BASE_URL}/pix/cashIn`, { 
            value: valor,
            webhook_url: 'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZjMDYzNjA0MzI1MjZmNTUzMTUxMzEi_pc',
        }, {
            headers: {
                'Authorization': `Bearer ${PUSHIN_PAY_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        // Verifica se a resposta contém o QR code
        if (response.data && response.data.qr_code) {
            const qrCode = response.data.qr_code; // Obtém o QR code
            const transactionId = response.data.id; // Armazena o ID da transação

            await ctx.reply(
                `✅ ***Pagamento Gerado com Sucesso\\! *** ✅ \n\n` +
                `Seu pagamento foi gerado e é válido por 30 minutos\\. \n\n` +
                `ℹ️ Para efetuar o pagamento, utilize a opção ***"Pagar" \\-\\> "PIX Copia e Cola"*** no aplicativo do seu banco\\. \\(Não usar a opção chave aleatória\\) \n\n` +
                `Agora, é só realizar o pagamento e aguardar a aprovação\\. Assim que for aprovado, você receberá o acesso imediatamente\\.\n\n` +
                `> ${descricao} \n\n` +
                `***Copie o código abaixo:*** 👇🏻`,
                { parse_mode: 'MarkdownV2' }
            );

            // Mensagem com a chave PIX
            await ctx.reply(
                `\`\`\`${qrCode}\`\`\``, // QR Code em monoespaço
                {
                    parse_mode: 'MarkdownV2',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: '⏳ VERIFICAR NOVAMENTE ⏳', callback_data: `verificar_pagamento:${transactionId}` } // Botão para verificar pagamento
                            ]
                        ]
                    }
                }
            );

            // Notificação ao administrador sobre o novo pagamento gerado
const mensagemAdmin = `🔔 ***PIX gerado\\! *** \n` +
                      `Valor: R$ ***${(valor / 100).toFixed(2)}***`; // Usa a formatação Markdown V2 para negrito
await bot.telegram.sendMessage(ADMIN_ID, mensagemAdmin, { parse_mode: 'MarkdownV2' }); // Envia a mensagem ao administrador


        } else {
            console.error('Erro: QR Code não encontrado:', response.data);
            await ctx.reply('Ocorreu um erro ao gerar o pagamento: QR Code não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao gerar pagamento:', error.response ? error.response.data : error.message);
        await ctx.reply('Ocorreu um erro ao gerar o pagamento. Tente novamente mais tarde.');
    }
}

// Função para verificar o status do pagamento
async function verificarPagamento(ctx, transactionId) {
    await ctx.reply('Verificando Pagamento...');

    try {
        console.log('Verificando pagamento para a transação ID:', transactionId);
        
        const response = await axios.get(`${API_BASE_URL}/transactions/${transactionId}`, {
            headers: {
                'Authorization': `Bearer ${PUSHIN_PAY_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Resposta da API:', response.data); // Loga a resposta da API

        const status = response.data.status;
        const valor = response.data.value; // Captura o valor do pagamento

        // Captura o packageKey corretamente
        const packageKey = ctx.callbackData ? ctx.callbackData.split(':')[1] : null;

        if (status === 'approved' || status === 'paid') {
            let linkEntrega = '';
            switch (packageKey) {
                case 'pixmorango':
                    linkEntrega = 'https://lewerneck.github.io/a9fk-morango/';
                    break;
                case 'pixpessego':
                    linkEntrega = 'https://lewerneck.github.io/b7lq-pessego/';
                    break;
                case 'pixcereja':
                    linkEntrega = 'https://lewerneck.github.io/x5pz-cereja/';
                    break;
                }

            // Notificação ao usuário do pagamento aprovado e link
            await ctx.reply(`🎉 **Bem-vindo!** 🎉\n\nSeu pagamento foi aprovado! Aqui está o link do seu pacote: [Clique aqui](${linkEntrega})`);

            // Notificação ao administrador
const mensagemAdmin = `*** Venda Realizada\\! ***\nSua comissão: R$ ***${(valor / 100).toFixed(2)}***`; // Usa a formatação Markdown V2 para negrito
await bot.telegram.sendMessage(ADMIN_ID, mensagemAdmin, { parse_mode: 'MarkdownV2' }); // Envia a mensagem ao administrador


        } else {
            await ctx.reply('Ainda não identifiquei esse pagamento, aguarde e verifique novamente...', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '⏳ VERIFICAR PAGAMENTO ⏳', callback_data: `verificar_pagamento:${transactionId}` }
                        ]
                    ]
                }
            });
        }
    } catch (error) {
        console.error('Erro ao verificar pagamento:', error.response ? error.response.data : error.message);
        await ctx.reply('Ocorreu um erro ao verificar o pagamento. Tente novamente mais tarde.');
    }
}

// Comandos para gerar pagamento
bot.action('pixmorango', (ctx) => gerarPagamento(ctx, 1990, 'PACOTE MORANGO • R$19,90\n10 fotos e 13 vídeos'));
bot.action('pixpessego', (ctx) => gerarPagamento(ctx, 3700, 'PACOTE PÊSSEGO • R$37\n15 fotos e 20 vídeos'));
bot.action('pixcereja', (ctx) => gerarPagamento(ctx, 5700, 'PACOTE CEREJA • R$57\n20 fotos e 25 vídeos'));

// Ação para verificar pagamento
bot.action(/verificar_pagamento:(.+)/, (ctx) => {
    const transactionId = ctx.match[1]; // Captura o ID da transação
    verificarPagamento(ctx, transactionId);
});

// Lança o bot
bot.launch().then(() => {
    console.log('Bot está funcionando!');
});
