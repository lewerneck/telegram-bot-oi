const express = require('express'); // ou o framework que você está usando
const app = express();
const PORT = process.env.PORT || 10000; // Usa a porta do ambiente ou 10000 como padrão


const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const bot = new Telegraf('7886636657:AAFq1ogAzjhFpfiJMue-Lwp9lsm_3XZqpjM');

// Inicia o servidor
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Ajuste os timeouts conforme necessário
server.keepAliveTimeout = 120000; // 120 segundos
server.headersTimeout = 120000; // 120 segundos

// URL base da API
const API_BASE_URL = 'https://api.pushinpay.com.br/api';

// Define a chave da API do Pushin Pay
const PUSHIN_PAY_API_KEY = '1720|hZ42SlgkeM27SP6J1oJWR5I3hgmqKg988TtQtJsE5f93fe73';

// URL do webhook do Google Apps Script
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwrLb9oaQIKfLYXmamgIfWcvdbyZzFXNl-Kd_MfHIsPb8reF6XEx-13XDHNhJnJsHx_/exec';

// ID do administrador (substitua pelo ID do seu administrador)
const ADMIN_ID = '5308694170';

// Variável para armazenar o nome do bot
let botName = '';

// Armazenar IDs de mensagens
	const messageIds = {};
	const verificationMessageIds = {};
	const generatingPaymentMessageIds = {};
	const generatingMessageIds = {};
	const successPaymentMessageIds = {};
	const qrCodeMessageIds = {};
	const verificarNovamenteMessageIds = {};
	const jaPagouMessageIds = {};
	const vique1MessageIds = {};
	const vique2MessageIds = {};
	const desc1MessageIds = {};
	const desc2MessageIds = {};
	const generatingCheckoutMessageIds = {};
	const paymentChoiceMessageIds = {};
	

// Objeto para armazenar os valores dos pacotes
const precosPacotes = {
    Morango: 1990,  
    Pessego: 3700,  
    Cereja: 5700,   
};

// Função para obter o nome do bot
async function obterNomeBot() {
    const me = await bot.telegram.getMe();
    botName = me.first_name; 
}

// Iniciar o bot e chamar a função de boas-vindas
bot.start(async (ctx) => {
 await iniciarFluxoDeConteudo(ctx);
 });

// Função para i niciar o fluxo de conteúdo
async function iniciarFluxoDeConteudo(ctx) {
	
    // Obtendo o primeiro nome do usuário
    const primeiroNome = ctx.from.first_name;

    // Enviando mensagem inicial
    await ctx.reply(`Oiie ${primeiroNome} ❤️ Você finalmente encontrou meu chat secreto 😈`);

    // MENSAGEM 1 - PACOTE CEREJA
    const videoUrlCereja = 'https://video.gumlet.io/66180b4d8ec2efeb9164568c/671bc33038a902e47566e3d1/download.mp4';
    const captionCereja = `Nesse dia eu tava com muita vontade de transar, uma vontade de ficar de quatro pra qualquer homem que me olhasse\\.\\.\\. Então fui pedir açúcar pro meu vizinho e ele me deu pau \n\n` +
                          `***Pacote Cereja 🍒*** \n` +
						  `25 Vídeos e 20 Fotos \n\n` +
						  `São vários vídeos chupando, gozando de quatro, sozinha, com clientes\\.\\.\\. \n` +
                          `Quer ver me ver de todos os jeitinho e me macetando gostoso\\? Hahaha`;

    const inlineKeyboardCereja = Markup.inlineKeyboard([
        [Markup.button.callback('Comprar por R$ 57', 'Cereja')]
    ]);

    // Delay de 5 segundos antes de enviar MENSAGEM 1
    setTimeout(() => {
        ctx.replyWithVideo(videoUrlCereja, { caption: captionCereja, parse_mode: 'MarkdownV2', reply_markup: inlineKeyboardCereja.reply_markup });
    }, 5000); // 5 segundos

    // MENSAGEM 2 - PACOTE PÊSSEGO
    const videoUrlPessego = 'https://video.gumlet.io/66180b4d8ec2efeb9164568c/671bc33062fc4203b2e25318/download.mp4';
    const captionPessego = `***Pacote Pêssego 🍑*** \n`+
						   `20 Vídeos e 15 Fotos \n\n` +
						   `Nesse pack estão os videozinhos chupando meu tio e brincando com a minha bucetinha até ela ficar toda melada do meu gozo, além dos vídeos socando bem forte no meu cuzinho \n\n` +
                           `Quer me ver toda molhadinha\\? 🙈`;

    const inlineKeyboardPessego = Markup.inlineKeyboard([
        [Markup.button.callback('Comprar por R$ 37', 'Pessego')]
    ]);

    // Delay de 10 segundos antes de enviar MENSAGEM 2 (total de 15 segundos após a primeira)
    setTimeout(() => {
        ctx.replyWithVideo(videoUrlPessego, { caption: captionPessego, parse_mode: 'MarkdownV2', reply_markup: inlineKeyboardPessego.reply_markup });
    }, 7000); // 15 segundos (5s + 10s)

    // MENSAGEM 3 - PACOTE MORANGO
    const videoUrlMorango = 'https://video.gumlet.io/66180b4d8ec2efeb9164568c/671bc33038a902e47566e3d3/download.mp4';
    const captionMorango = `***Pacote Morango 🍓*** \n` + 
						   `13 Vídeos e 10 Fotos \n\n` +
						   `Nesse pack você vai encontrar meus melhores videozinhos gozando muito e gemendo gostoso \n\n` +
                           `Tem vídeo meladinha, me masturbando, com plugzinho no meu cu, e dos melhores jeitos pra você\\!`;

    const inlineKeyboardMorango = Markup.inlineKeyboard([
        [Markup.button.callback('Comprar por R$ 19,90', 'Morango')]
    ]);

    // Delay de 15 segundos antes de enviar MENSAGEM 3 (total de 30 segundos após a primeira)
    setTimeout(() => {
        ctx.replyWithVideo(videoUrlMorango, { caption: captionMorango, parse_mode: 'MarkdownV2', reply_markup: inlineKeyboardMorango.reply_markup });
    }, 9000); // 30 segundos (5s + 10s + 15s)
	
	
 // Mensagem final "To te esperando..." após MENSAGEM 3
    setTimeout(() => {
        ctx.reply("To te esperando...");
    }, 10000); // 35 segundos (5s + 10s + 15s + 5s)
}

// Função genérica para gerar pagamento
async function gerarPagamento(ctx, valor, descricao) {
	// Chama diretamente a função limparMensagens
	await limparMensagens(ctx);
			
	try {
        const response = await axios.post(`${API_BASE_URL}/pix/cashIn`, { 
            value: valor, 
            webhook_url: GOOGLE_SHEETS_URL, 
        }, {
            headers: {
                'Authorization': `Bearer ${PUSHIN_PAY_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
		
            if (response.data && response.data.qr_code) {
            const qrCode = response.data.qr_code; 
            const transactionId = response.data.id; 
			
			// Envia a mensagem "Gerando Pagamento..." e armazena o ID da mensagem
			const generatingPaymentMessage = await ctx.reply(
			'Gerando Pagamento\\.\\.\\.',
			{ parse_mode: 'MarkdownV2' }
			);
	        await new Promise(resolve => setTimeout(resolve, 3000)); // Delay de 3 segundos
			
			// Calcular o horário de expiração (30 minutos)
            const expirationDate = new Date();
            expirationDate.setMinutes(expirationDate.getMinutes() + 30);
            const expirationTime = expirationDate.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
			
			// Envia a mensagem "Pagamento Gerado com Sucesso!" e armazena o ID da mensagem
			const successPaymentMessage = await ctx.reply(
			`✅ ***Pagamento Gerado com Sucesso\\!*** \n` +
			`válido até às ***${expirationTime}*** ⏰ \n\n` +
			`ℹ️ Para efetuar o pagamento, utilize a opção ***"Pagar" \\-\\> "PIX Copia e Cola"*** no aplicativo do seu banco\\. \n\n` +
			`Agora, é só realizar o pagamento e aguardar a aprovação\\. Assim que for aprovado, você receberá o acesso imediatamente\\.\n\n` +
			`***Copie o código da chave PIX abaixo:*** 👇🏻`,
			{ parse_mode: 'MarkdownV2' }
);
		   // Aguarda 3 segundos antes de enviar o QR Code
			await new Promise(resolve => setTimeout(resolve, 2000));
			
            // Envia a mensagem com o código QR e armazena o ID da mensagem
			const qrCodeMessage = await ctx.reply(
			`\`\`\`${qrCode}\`\`\``, 
			{ parse_mode: 'MarkdownV2' }
);

			// Armazena o ID da mensagem para deletar depois, usando `transactionId` como chave
			generatingPaymentMessageIds[`${ctx.chat.id}-generatingPayment`] = generatingPaymentMessage.message_id;
			successPaymentMessageIds[`${ctx.chat.id}-successPayment`] = successPaymentMessage.message_id;
			qrCodeMessageIds[`${ctx.chat.id}-qrcode`] = qrCodeMessage.message_id;
			
			const mensagemAdmin = `🔔 ***PIX Gerado\\!*** \n` +
                      `Valor: R\\$ ${(valor / 100).toFixed(2).replace('.', ',')}`; // Escapando o ponto

			await bot.telegram.sendMessage(ADMIN_ID, mensagemAdmin, {
				parse_mode: 'MarkdownV2'
			});

            const dadosParaGoogleSheets = {
                data_hora: new Date().toISOString(),
                id_chat_cliente: ctx.chat.id,
                nome_usuario: ctx.from.username || ctx.from.first_name,
                evento: ctx.from.first_name,
                id_transacao: transactionId,
                pacote: descricao, // Adicione o pacote correspondente
                valor: (valor / 100), 
                status: 'PIX Gerado', 
                nome_bot: botName 
            };
            await enviarDadosParaGoogleSheets(dadosParaGoogleSheets);
			
			// Delay de 1 minuto (60 segundos)
			await new Promise(resolve => setTimeout(resolve, 2000));
			
			
			// Envia a mensagem "Já pagou?" com o botão inline "✅ Já paguei ✅"
			const jaPagouMessage = await ctx.reply(
						"Já pagou\\?",
				{
					parse_mode: 'MarkdownV2',
					reply_markup: {
					inline_keyboard: [
                [
                    { text: '✅ Já paguei', callback_data: `verificar_pagamento:${transactionId}` }
                ]
            ]
        }
    }
);
			// Armazenar o ID da mensagem "Já pagou?" para deletar depois
			jaPagouMessageIds[`${ctx.chat.id}-jaPagou`] = jaPagouMessage.message_id;
		
			// Agendar a verificação para 10 minutos
            setTimeout(() => agendarLembreteDePagamento(ctx, transactionId, descricao), 600000); // 10 minutos
			setTimeout(() => consultarUsuario(ctx), 12 * 60 * 60 * 1000); // 12 horas em milissegundos
		
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
	
		// Quando necessário, apague a mensagem "Ja pagou?"
			if (jaPagouMessageIds[`${ctx.chat.id}-jaPagou`]) {
			await ctx.deleteMessage(jaPagouMessageIds[`${ctx.chat.id}-jaPagou`]);
			delete jaPagouMessageIds[`${ctx.chat.id}-jaPagou`]; // Remove o ID da mensagem após a exclusão
			}
	
		// Envia a mensagem "Verificando Pagamento..." e armazena o ID da mensagem
			const verificationMessage = await ctx.reply(
			'Verificando Pagamento\\.\\.\\.',
			{ parse_mode: 'MarkdownV2' }
);
		// Armazenar o ID da mensagem de verificação para deletar depois
			verificationMessageIds[`${ctx.chat.id}-verification`] = verificationMessage.message_id;
		    
    const url = `${API_BASE_URL}/transactions/${transactionId}`;
    
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${PUSHIN_PAY_API_KEY}`
            }
        });

        
        if (!response.data) {
            throw new Error('Sem dados retornados da API.');
        }

        const { status, value } = response.data;

        if (status === 'paid') {
            // O valor pago deve estar em centavos já
            const valorPagoNumerico = parseInt(value); // Convertendo o valor para inteiro (centavos)

            // Obter o pacote correspondente ao valor pago
            const pacoteEntregue = obterPacotePorValor(valorPagoNumerico); // Valor em centavos

            if (pacoteEntregue) {
				
				const mensagemAdmin = `🔔 ***Pagamento Aprovado\\! *** \n` +
                      `Valor: R\\$ ${(valorPagoNumerico / 100).toFixed(2).replace('.', ',')}`;

				await bot.telegram.sendMessage(ADMIN_ID, mensagemAdmin, {
					parse_mode: 'MarkdownV2'
				});
				
				
				// Chama diretamente a função limparMensagens
				await limparMensagens3(ctx);
				
							
                await ctx.reply(`✅ ***Pagamento Aprovado\\! *** \n\n` +
                                `Seja bem\\-vindo\\(a\\) ${ctx.from.first_name}\\! \n` +
								`Você já pode acessar o conteúdo do ${pacoteEntregue.nome}\\!`, {
                    parse_mode: 'MarkdownV2',
					reply_markup: {
					inline_keyboard: [
							[{ text: 'Acessar Conteúdo', url: pacoteEntregue.link }]
							]
							}
							});
				
				await enviarUpsell(ctx, pacoteEntregue.nome);
            } else {
                await ctx.reply('O valor pago não corresponde a nenhum pacote disponível.');
            }

            const dadosParaGoogleSheets = {
                data_hora: new Date().toISOString(),
                id_chat_cliente: ctx.chat.id,
                nome_usuario: ctx.from.username || ctx.from.first_name,
                evento: ctx.from.first_name,
                id_transacao: transactionId,
				pacote: pacoteEntregue.nome, // Adicione o pacote correspondente
                valor: (valorPagoNumerico / 100), // Mantendo em centavos
                status: 'Aprovado',
                nome_bot: botName 
            };
            await enviarDadosParaGoogleSheets(dadosParaGoogleSheets);
			} else {
			
			// Aguarda 6 segundos antes de enviar a mensagem
			await new Promise(resolve => setTimeout(resolve, 6000));
				
			// Quando necessário, apague a mensagem "Verificando Pagamento..."
			if (verificationMessageIds[`${ctx.chat.id}-verification`]) {
			await ctx.deleteMessage(verificationMessageIds[`${ctx.chat.id}-verification`]);
			delete verificationMessageIds[`${ctx.chat.id}-verification`]; // Remove o ID da mensagem após a exclusão
			}
			
			// Envia a mensagem com o botão inline "⏳ VERIFICAR NOVAMENTE ⏳" e armazena o ID da mensagem
			const verificarNovamenteMessage = await ctx.reply(
				'Ainda não identifiquei esse pagamento, aguarde e verifique novamente...', 
			{
			reply_markup: {
            inline_keyboard: [
                [
                    { text: '⏳ VERIFICAR NOVAMENTE ⏳', callback_data: `verificar_pagamento:${transactionId}` }
                ]
            ]
        }
    }

);
			// Armazena o ID da mensagem para deletar depois, usando `transactionId` como chave
			verificarNovamenteMessageIds[`${ctx.chat.id}-verificarNovamente`] = verificarNovamenteMessage.message_id;
		}

    } catch (error) {
        console.error('Erro ao verificar pagamento:', error.response ? error.response.data : error.message);
        await ctx.reply('Ocorreu um erro ao verificar o pagamento. Tente novamente mais tarde.');
    }
	}

// Função para enviar a mensagem de Upsell
async function enviarUpsell(ctx, pacoteEntregue) {
		const upsell = obterUpsell(pacoteEntregue);
    
		if (upsell) {
        await new Promise(resolve => setTimeout(resolve, 180000)); // Espera 3 minutos
        
        // Envia a mensagem de upsell com o pacote e valor diretamente no callback_data
        await ctx.reply(
            `🎉 ***Oferta Especial\\!***\n` +
            `Você acaba de receber o ${pacoteEntregue.replace(/([_*[\]()~>#+\-=|{}.!])/g, '\\$1')}\\. \n` +
            `Aproveite a oferta exclusiva para o ${upsell.nome.replace(/([_*[\]()~>#+\-=|{}.!])/g, '\\$1')} por apenas R\\$ ${(upsell.preco / 100).toFixed(2).replace('.', '\\.')}\\!`,
            {
                parse_mode: 'MarkdownV2',
                reply_markup: {
                    inline_keyboard: [
                        [{ 
                            text: 'Comprar Agora', 
                            callback_data: `${upsell.nome}-${upsell.preco}` // Passa nome e valor juntos
                        }]
                    ]
                }
            }
        );
    } else { }
}

// Função de lembrete de pagamento
async function agendarLembreteDePagamento(ctx, transactionId, descricao) {
    // Verifique o status do pagamento antes de enviar lembrete
    const response = await axios.get(`${API_BASE_URL}/transactions/${transactionId}`, {
        headers: { Authorization: `Bearer ${PUSHIN_PAY_API_KEY}` }
    });

    const { status, value } = response.data; // Inclui o valor da transação
    const valorOriginal = precosPacotes[descricao]; // Obtém o valor original com base no pacote

    // Verifica se o status não é "paid" e se o valor está dentro da margem de 50 centavos
    if (status !== 'paid' && Math.abs(value - valorOriginal) <= 50 && qrCodeMessageIds[`${ctx.chat.id}-qrcode`]) {
        // Primeira mensagem com `MarkdownV2`
        const primeiroNome = ctx.from.first_name.replace(/([_*[\]()~>#+\-=|{}.!])/g, '\\$1');
		
        const vique1Message = await ctx.reply(
		`Oiie ${primeiroNome}, eu vi que você gerou um PIX e por algum motivo ainda não pagou\\.\\.\\. 🥵`, {
            parse_mode: 'MarkdownV2'
        });

        // Segunda mensagem com botão inline usando `MarkdownV2`
        const vique2Message = await ctx.reply(`Você está a um passo de acessar meus conteúdos exclusivos\\! Vi aqui agora que liberei \\+1 vaga com um desconto especial\\. \n\n Você vem\\?`, {
            parse_mode: 'MarkdownV2',
            reply_markup: {
                inline_keyboard: [
                    [{ text: "🔒 Desbloquear conteúdo", callback_data: `oferecerDesconto:${descricao}` }]
                ]
            }
        });
		
// Armazena o ID da mensagem de "Gerando Pagamento..." usando `chat.id` como chave
		vique1MessageIds[`${ctx.chat.id}-vique1`] = vique1Message.message_id;
		vique2MessageIds[`${ctx.chat.id}-vique2`] = vique2Message.message_id;
		
    }
	 
}

// Função para oferecer desconto com base no pacote escolhido
async function oferecerDesconto(ctx, descricao) {
	// Chama diretamente a função limparMensagens
	await limparMensagens4(ctx);
	// Obtém o valor original com base no pacote
    const valorOriginal = precosPacotes[descricao];
    const valorComDesconto = Math.round(valorOriginal * 0.7); // 30% de desconto
		
	const desc1Message = await ctx.reply(
        'Olha amor se você quiser eu posso te dar\\.\\.\\.',
        { parse_mode: 'MarkdownV2' }
    );

    const desc2Message = await ctx.reply(
	   `um desconto de 30\\% para o Pacote ${descricao.replace(/([_*[\]()~>#+\-=|{}.!])/g, '\\$1')}\\. Ai em vez de você pagar R\\$ ${(precosPacotes[descricao] / 100).toFixed(2).replace(/([_*[\]()~>#+\-=|{}.!])/g, '\\$1')} eu faço pra você agora por R\\$ ${(valorComDesconto / 100).toFixed(2).replace(/([_*[\]()~>#+\-=|{}.!])/g, '\\$1')}, pode ser amor\\?`, 
			{
        parse_mode: 'MarkdownV2',
        reply_markup: {
            inline_keyboard: [
                [{ text: "Aceitar desconto", callback_data: `gerarPagamentoComDesconto:${descricao}-${valorComDesconto}` }]
            ]
        }
    });
	// Armazena o ID da mensagem de "Olha amor.. " usando `chat.id` como chave
    desc1MessageIds[`${ctx.chat.id}-desc1`] = desc1Message.message_id;
	// Armazena o ID da mensagem de "um desconto de... " usando `chat.id` como chave
    desc2MessageIds[`${ctx.chat.id}-desc2`] = desc2Message.message_id;
	
}

// Função para enviar dados para o Google Sheets
async function enviarDadosParaGoogleSheets(data) {
    try {
        await axios.post(GOOGLE_SHEETS_URL, data);
    } catch (error) {
        console.error('Erro ao enviar dados para o Google Sheets:', error.response ? error.response.data : error.message);
    }
}

// Função para obter a descrição do pacote com base na chave
function obterDescricaoPacote(pacote) {
    const descricoes = {
        Morango: 'MORANGO',
        Pessego: 'PÊSSEGO',
        Cereja: 'CEREJA'
    };
    return descricoes[pacote] || 'Pacote Desconhecido';
}

// Função para determinar o próximo pacote e o valor do upsell
function obterUpsell(pacoteAtual) {
    const pacotes = {
        'Pacote MORANGO 🍓': { nome: 'Pacote PÊSSEGO 🍑', preco: Math.round(precosPacotes['Pessego'] / 2) },
        'Pacote PÊSSEGO 🍑': { nome: 'Pacote CEREJA 🍒', preco: Math.round(precosPacotes['Cereja'] / 2) },
        'Pacote CEREJA 🍒': { nome: 'Pacote MORANGO 🍓', preco: Math.round(precosPacotes['Morango'] / 2) },
    };
    return pacotes[pacoteAtual] || null;
}

// Função para determinar o pacote com base no valor pago
function obterPacotePorValor(valorPago) {
    // O valor já deve estar em centavos
    const valorEmCentavos = valorPago; 

    // Definindo a margem de R$ 1,00 em centavos
    const margem = 100;

    // Verificando qual pacote corresponde ao valor pago
    if (
        (valorEmCentavos >= precosPacotes.Morango - margem && valorEmCentavos <= precosPacotes.Morango + margem) ||
        (valorEmCentavos >= (precosPacotes.Morango / 2) - margem && valorEmCentavos <= (precosPacotes.Morango / 2) + margem) ||
        (valorEmCentavos >= Math.round(precosPacotes.Morango * 0.7) - margem && valorEmCentavos <= Math.round(precosPacotes.Morango * 0.7) + margem) // Desconto de 30%
    ) {
        return { nome: 'Pacote MORANGO 🍓', link: 'https://lewerneck.github.io/a9fk-morango' };
    } else if (
        (valorEmCentavos >= precosPacotes.Pessego - margem && valorEmCentavos <= precosPacotes.Pessego + margem) ||
        (valorEmCentavos >= (precosPacotes.Pessego / 2) - margem && valorEmCentavos <= (precosPacotes.Pessego / 2) + margem) ||
        (valorEmCentavos >= Math.round(precosPacotes.Pessego * 0.7) - margem && valorEmCentavos <= Math.round(precosPacotes.Pessego * 0.7) + margem) // Desconto de 30%
    ) {
        return { nome: 'Pacote PÊSSEGO 🍑', link: 'https://lewerneck.github.io/b7lq-pessego' };
    } else if (
        (valorEmCentavos >= precosPacotes.Cereja - margem && valorEmCentavos <= precosPacotes.Cereja + margem) ||
        (valorEmCentavos >= (precosPacotes.Cereja / 2) - margem && valorEmCentavos <= (precosPacotes.Cereja / 2) + margem) ||
        (valorEmCentavos >= Math.round(precosPacotes.Cereja * 0.7) - margem && valorEmCentavos <= Math.round(precosPacotes.Cereja * 0.7) + margem) // Desconto de 30%
    ) {
        return { nome: 'Pacote CEREJA 🍒', link: 'https://lewerneck.github.io/x5pz-cereja' };
    } else {
        return null; // Nenhum pacote corresponde ao valor
    }
}

// Função pra verificar se o usuario ja é cliente
async function consultarUsuario(ctx) {
    // Defina a URL do Google Sheets para consultar os dados
    try {
        const response = await axios.get(GOOGLE_SHEETS_URL);
        console.log("Dados recebidos do Google Sheets:", response.data); // Verifique a estrutura da resposta

        // Verifique se a propriedade 'values' existe e é um array
        if (response.data.values && Array.isArray(response.data.values)) {
            const data = response.data.values; // Supondo que você receba os dados em um array de arrays
            const userId = ctx.chat.id.toString(); // ID do chat do usuário como string
            let isClient = false;

            // Itera sobre os registros para verificar se o usuário é cliente
            for (const row of data.slice(1)) { // Ignora a primeira linha (cabeçalhos)
                console.log(`Comparando userId: ${userId} com ID Cliente: ${row[1]}`); // Log de comparação
                if (row[1].toString() === userId && row[7] === 'PIX Gerado') { // Coluna B é o ID do chat e a coluna H é o status
                    isClient = true;
                    break;
                }
            }

            if (isClient) {
                console.log("Usuário encontrado. Enviando mensagem de boas-vindas."); // Log de sucesso
                await enviarMensagemDeBoasVindas(ctx);
            } else {
                console.log("Usuário não encontrado ou status não é 'PIX Gerado'."); // Log de erro
            }
        } else {
            console.error("Dados inesperados recebidos:", response.data);
        }
    } catch (error) {
        console.error("Erro ao consultar Google Sheets:", error);
        ctx.reply("Houve um erro ao processar sua solicitação."); // Mensagem de erro para o usuário
    }
}

// Enviar mensagem de boas vindas depois de 12 hrs
async function enviarMensagemDeBoasVindas(ctx) {
    const mensagem = `Bem-vindo ❤\n` +
        `Nos meus conteúdos eu passo meu Whats pra gente conversar e até trocar nudes de vez em quando (se você quiser)\n\n` +
        `Você vai ver todos meus vídeos transando, fazendo garganta profunda, me masturbando até gozar bem gostoso, além dos vídeos socando bem forte no meu cuzinho, TUDO o que você imaginar\n\n` +
        `Você vem? 😈👇🏻`;

    // Envia a mensagem de boas-vindas
    const welcomeMessage = await ctx.reply(mensagem, {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'EU QUERO', callback_data: 'iniciar_bot' }]
            ]
        }
    });

    // Armazenar o ID da mensagem para futuras referências, se necessário
}

// Tratar o callback do botão "EU QUERO"
bot.action('iniciar_bot', async (ctx) => {
    
    // Chamar o fluxo de conteúdo aqui
    await iniciarFluxoDeConteudo(ctx);
});

// Comando para escolher forma de pagamento AQUI TA OK **************************************************
bot.action(/^(Cereja|Pessego|Morango)$/, async (ctx) => {
	// Chama diretamente a função limparMensagens
	await limparMensagens2(ctx);
    
    // Deleta a mensagem "Escolha a forma de pagamento:"
	if (paymentChoiceMessageIds[`${ctx.chat.id}-paymentChoice`]) {
	await ctx.deleteMessage(paymentChoiceMessageIds[`${ctx.chat.id}-paymentChoice`]);
	delete paymentChoiceMessageIds[`${ctx.chat.id}-paymentChoice`]; // Remove o ID após deletar
	} else { }
			
	const pacoteEscolhido = ctx.match[0];
	
    // Envia a mensagem "Escolha a forma de pagamento:"
    const paymentChoiceMessage = await ctx.reply("Escolha a forma de pagamento:", 
        Markup.inlineKeyboard([ 
            [Markup.button.callback('PIX', `${pacoteEscolhido}-pix`), Markup.button.callback('Cartão de Crédito', `${pacoteEscolhido}-cartao`)]
        ])
    );

    // Armazena o ID da mensagem para deletar depois, usando `chat.id` como chave
    paymentChoiceMessageIds[`${ctx.chat.id}-paymentChoice`] = paymentChoiceMessage.message_id;
	
	// Delay de 30 minutos para exclusão das mensagens
    setTimeout(() => limparMensagens3(ctx), 1800000);
				
});

// Comando para gerar pagamento via PIX
bot.action(/(Cereja|Pessego|Morango)-pix/, async (ctx) => {
    const pacoteEscolhido = ctx.match[0].split('-')[0];
    const valor = precosPacotes[pacoteEscolhido];
    await gerarPagamento(ctx, valor, pacoteEscolhido);
});

// Comando para gerar pagamento via Cartão de Crédito
bot.action(/(Cereja|Pessego|Morango)-cartao/, async (ctx) => {
    const pacoteEscolhido = ctx.match[0].split('-')[0];
     // Envia a mensagem "Gerando Pagamento..." e armazena o ID da mensagem
    const generatingMessage = await ctx.reply(
        'Gerando Pagamento\\.\\.\\.',
        { parse_mode: 'MarkdownV2' }
    );

    // Armazena o ID da mensagem de "Gerando Pagamento..." usando `chat.id` como chave
    generatingMessageIds[`${ctx.chat.id}-generating`] = generatingMessage.message_id;

    // Delay de 5 segundos
    await new Promise(resolve => setTimeout(resolve, 3000));

    let checkoutLink = '';
    switch (pacoteEscolhido) {
        case 'Cereja':
            checkoutLink = 'https://pay.cakto.com.br/4VrpxFw';
            break;
        case 'Pessego':
            checkoutLink = 'https://pay.cakto.com.br/6j8hePu';
            break;
        case 'Morango':
            checkoutLink = 'https://pay.cakto.com.br/5BxgnJ8';
            break;
    }
    
	// Envia a mensagem "Clique no botão abaixo para ser redirecionado para a página de pagamentos."
    const generatingCheckoutMessage = await ctx.reply("Clique no botão abaixo para ser redirecionado para a página de pagamentos.", 
        Markup.inlineKeyboard([
            [Markup.button.url('Checkout', checkoutLink)]
        ])
    );

    // Armazena o ID da mensagem de checkout usando `chat.id` como chave
    generatingCheckoutMessageIds[`${ctx.chat.id}-generatingCheckout`] = generatingCheckoutMessage.message_id;
	
});

// Comando para gerar pagamento via PIX no upsell
bot.action(/(Pacote CEREJA 🍒|Pacote PÊSSEGO 🍑|Pacote MORANGO 🍓)-(\d+)/, async (ctx) => {
    const pacoteEscolhido = ctx.match[1]; // Pacote escolhido a partir do callback_data
    const valor = parseInt(ctx.match[2], 10); // Valor do upsell diretamente do callback_data

    if (valor) {
        // Gera o pagamento usando o valor e nome do pacote
        await gerarPagamento(ctx, valor, pacoteEscolhido);
    } else {
        await ctx.reply('Erro ao obter o valor. Tente novamente.');
    }
});

// Callback para oferecer desconto
bot.action(/oferecerDesconto:(.+)/, async (ctx) => {
    const descricao = ctx.match[1];
    await oferecerDesconto(ctx, descricao);
});

// Função para gerar pagamento com desconto usando callback com pacote e valor
bot.action(/gerarPagamentoComDesconto:(.+)-(\d+)/, async (ctx) => {
    const descricao = ctx.match[1];
    const valorComDesconto = parseInt(ctx.match[2], 10);
    await gerarPagamento(ctx, valorComDesconto, descricao);
});

// Configurando os manipuladores de callback
bot.action(/verificar_pagamento:(.+)/, (ctx) => {
    const transactionId = ctx.match[1]; 
    verificarPagamento(ctx, transactionId);
});

// Função para limpar todas as mensagens de Geração de Pix
async function limparMensagens(ctx) {
    const deleteMessages = async (ids) => {
        for (const id of ids) {
            if (id) {
                await ctx.deleteMessage(id);
            }
        }
    };

    await deleteMessages([
	 // paymentChoiceMessageIds[`${ctx.chat.id}-paymentChoice`], // Escolha a forma de pagamento ( FUNCIONA DENTRO DA FUNÇÃO SOMENTE)
		generatingPaymentMessageIds[`${ctx.chat.id}-generatingPayment`], // Gerando pagamento com Pix...
        generatingMessageIds[`${ctx.chat.id}-generating`], // Gerando pagamento com cartao...
	 // generatingCheckoutMessageIds[`${ctx.chat.id}-generatingCheckout`], // Chekout para cartao de credito
		successPaymentMessageIds[`${ctx.chat.id}-successPayment`], // Gerando pagamento gerado com sucesso
        qrCodeMessageIds[`${ctx.chat.id}-qrcode`], // qrcode pix
        jaPagouMessageIds[`${ctx.chat.id}-jaPagou`], // Já pagou?
		verificationMessageIds[`${ctx.chat.id}-verification`], // Verificando...
		verificarNovamenteMessageIds[`${ctx.chat.id}-verificarNovamente`]

    ]);

    // Limpar os IDs das mensagens
    //  delete paymentChoiceMessageIds[`${ctx.chat.id}-paymentChoice`];
		delete generatingPaymentMessageIds[`${ctx.chat.id}-generatingPayment`],
		delete generatingMessageIds[`${ctx.chat.id}-generating`];
	//  delete generatingCheckoutMessageIds[`${ctx.chat.id}-generatingCheckout`];
		delete successPaymentMessageIds[`${ctx.chat.id}-successPayment`];
		delete qrCodeMessageIds[`${ctx.chat.id}-qrcode`];
		delete jaPagouMessageIds[`${ctx.chat.id}-jaPagou`];
		delete verificationMessageIds[`${ctx.chat.id}-verification`];
		delete verificarNovamenteMessageIds[`${ctx.chat.id}-verificarNovamente`];
	
}

// Função para limpar todas as mensagens de Geração de Pix
async function limparMensagens2(ctx) {
    const deleteMessages = async (ids) => {
        for (const id of ids) {
            if (id) {
                await ctx.deleteMessage(id);
            }
        }
    };

    await deleteMessages([
	 // paymentChoiceMessageIds[`${ctx.chat.id}-paymentChoice`], // Escolha a forma de pagamento ( FUNCIONA DENTRO DA FUNÇÃO SOMENTE)
		generatingPaymentMessageIds[`${ctx.chat.id}-generatingPayment`], // Gerando pagamento com Pix...
        generatingMessageIds[`${ctx.chat.id}-generating`], // Gerando pagamento com cartao...
		generatingCheckoutMessageIds[`${ctx.chat.id}-generatingCheckout`], // Chekout para cartao de credito
		successPaymentMessageIds[`${ctx.chat.id}-successPayment`], // Gerando pagamento gerado com sucesso
        qrCodeMessageIds[`${ctx.chat.id}-qrcode`], // qrcode pix
        jaPagouMessageIds[`${ctx.chat.id}-jaPagou`], // Já pagou?
		verificationMessageIds[`${ctx.chat.id}-verification`], // Verificando...
		verificarNovamenteMessageIds[`${ctx.chat.id}-verificarNovamente`] // Verificar novamente
		
		
    ]);

    // Limpar os IDs das mensagens
	//  delete paymentChoiceMessageIds[`${ctx.chat.id}-paymentChoice`];
		delete generatingPaymentMessageIds[`${ctx.chat.id}-generatingPayment`],
		delete generatingMessageIds[`${ctx.chat.id}-generating`];
		delete generatingCheckoutMessageIds[`${ctx.chat.id}-generatingCheckout`];
		delete successPaymentMessageIds[`${ctx.chat.id}-successPayment`];
		delete qrCodeMessageIds[`${ctx.chat.id}-qrcode`];
		delete jaPagouMessageIds[`${ctx.chat.id}-jaPagou`];
		delete verificationMessageIds[`${ctx.chat.id}-verification`];
		delete verificarNovamenteMessageIds[`${ctx.chat.id}-verificarNovamente`];
	
}

// Função para limpar todas as mensagens de Geração de Pix
async function limparMensagens3(ctx) {
    const deleteMessages = async (ids) => {
        for (const id of ids) {
            if (id) {
                await ctx.deleteMessage(id);
            }
        }
    };

    await deleteMessages([
	    paymentChoiceMessageIds[`${ctx.chat.id}-paymentChoice`], // Escolha a forma de pagamento ( FUNCIONA DENTRO DA FUNÇÃO SOMENTE)
		generatingPaymentMessageIds[`${ctx.chat.id}-generatingPayment`], // Gerando pagamento com Pix...
        generatingMessageIds[`${ctx.chat.id}-generating`], // Gerando pagamento com cartao...
		generatingCheckoutMessageIds[`${ctx.chat.id}-generatingCheckout`], // Chekout para cartao de credito
		successPaymentMessageIds[`${ctx.chat.id}-successPayment`], // Gerando pagamento gerado com sucesso
        qrCodeMessageIds[`${ctx.chat.id}-qrcode`], // qrcode pix
        jaPagouMessageIds[`${ctx.chat.id}-jaPagou`], // Já pagou?
		verificationMessageIds[`${ctx.chat.id}-verification`], // Verificando...
		verificarNovamenteMessageIds[`${ctx.chat.id}-verificarNovamente`], // Verificar novamente
		vique1MessageIds[`${ctx.chat.id}-vique1`], // Vi que gerou um pix
		vique2MessageIds[`${ctx.chat.id}-vique2`], // Quer desconto?
		desc1MessageIds[`${ctx.chat.id}-desc1`], // intro
		desc2MessageIds[`${ctx.chat.id}-desc2`] // Desconto
		
    ]);

    // Limpar os IDs das mensagens
	    delete paymentChoiceMessageIds[`${ctx.chat.id}-paymentChoice`];
		delete generatingPaymentMessageIds[`${ctx.chat.id}-generatingPayment`],
		delete generatingMessageIds[`${ctx.chat.id}-generating`];
		delete generatingCheckoutMessageIds[`${ctx.chat.id}-generatingCheckout`];
		delete successPaymentMessageIds[`${ctx.chat.id}-successPayment`];
		delete qrCodeMessageIds[`${ctx.chat.id}-qrcode`];
		delete jaPagouMessageIds[`${ctx.chat.id}-jaPagou`];
		delete verificationMessageIds[`${ctx.chat.id}-verification`];
		delete verificarNovamenteMessageIds[`${ctx.chat.id}-verificarNovamente`];
		delete vique1MessageIds[`${ctx.chat.id}-vique1`]; // Vi que vc gerou um pix
		delete vique2MessageIds[`${ctx.chat.id}-vique2`];
		delete desc1MessageIds[`${ctx.chat.id}-desc1`];
		delete desc2MessageIds[`${ctx.chat.id}-desc2`]
}

// Função para limpar todas as mensagens de Geração de Pix
async function limparMensagens4(ctx) {
    const deleteMessages = async (ids) => {
        for (const id of ids) {
            if (id) {
                await ctx.deleteMessage(id);
            }
        }
    };

    await deleteMessages([
	    paymentChoiceMessageIds[`${ctx.chat.id}-paymentChoice`], // Escolha a forma de pagamento ( FUNCIONA DENTRO DA FUNÇÃO SOMENTE)
		generatingPaymentMessageIds[`${ctx.chat.id}-generatingPayment`], // Gerando pagamento com Pix...
        generatingMessageIds[`${ctx.chat.id}-generating`], // Gerando pagamento com cartao...
		generatingCheckoutMessageIds[`${ctx.chat.id}-generatingCheckout`], // Chekout para cartao de credito
		successPaymentMessageIds[`${ctx.chat.id}-successPayment`], // Gerando pagamento gerado com sucesso
        qrCodeMessageIds[`${ctx.chat.id}-qrcode`], // qrcode pix
        jaPagouMessageIds[`${ctx.chat.id}-jaPagou`], // Já pagou?
		verificationMessageIds[`${ctx.chat.id}-verification`], // Verificando...
		verificarNovamenteMessageIds[`${ctx.chat.id}-verificarNovamente`], // Verificar novamente
		vique1MessageIds[`${ctx.chat.id}-vique1`],
		vique2MessageIds[`${ctx.chat.id}-vique2`]
		
    ]);

    // Limpar os IDs das mensagens
	    delete paymentChoiceMessageIds[`${ctx.chat.id}-paymentChoice`];
		delete generatingPaymentMessageIds[`${ctx.chat.id}-generatingPayment`],
		delete generatingMessageIds[`${ctx.chat.id}-generating`];
		delete generatingCheckoutMessageIds[`${ctx.chat.id}-generatingCheckout`];
		delete successPaymentMessageIds[`${ctx.chat.id}-successPayment`];
		delete qrCodeMessageIds[`${ctx.chat.id}-qrcode`];
		delete jaPagouMessageIds[`${ctx.chat.id}-jaPagou`];
		delete verificationMessageIds[`${ctx.chat.id}-verification`];
		delete verificarNovamenteMessageIds[`${ctx.chat.id}-verificarNovamente`];
		delete vique1MessageIds[`${ctx.chat.id}-vique1`];
		delete vique2MessageIds[`${ctx.chat.id}-vique2`];
		
	
}

// Aguardando o nome do bot
obterNomeBot();
bot.launch();
console.log('Bot em execução...');
