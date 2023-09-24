function formatPostRegisterVeterinario({
    email,
    name,
    tokenConfirmAccount
}) {

    return {
        from: 'APV - Administrador de Pacientes de Veterinaria',
        to: email,
        subject: 'Comprueba tu cuenta en APV',
        text: 'Comprueba tu cuenta en APV',
        html: `
        <!DOCTYPE html>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        </head>
        <body>
            <div class="content_mail">
                <div class="title" style="font-weight: bold">
                    <p>Bienvenido <span class="title_span">${name}</span>, gracias por registrarte en APV - Administrador de Pacientes</p>
                </div>
                <div>
                    <p>Tu cuenta está lista</p>
                    <p>¡ solo debes de <b>confirmarla</b> y comenzar a gestionar tus pacientes !</p>
                </div>
                <div>
                    <a
                        href="${process.env.CLIENT_URL_DEPLOY}/confirmaccount/${tokenConfirmAccount}"
                        rel="noopener noreferrer"
                        class="btn_confirm"
                        style="font-weight: bold"
                    >
                        <button>Ir a Confirmar</button>
                    </a>
                </div>
                <div>
                    <p>Si no hiciste el registro, Ignora este mensaje</p>
                </div>
            </div>
        </body>
        </html>
        <style>
            *{
                font-family: 'Montserrat', sans-serif;
            }
            .title{
                text-align: center;
                background: #4f46e5;
                color: #bebddb;
                font-size: 1.8rem;
            }
            .title .title_span{
                color: white;
            }
            .content_mail{
                max-width: 720px;
                margin: 0 auto;
                box-shadow: 0 1px 15px rgba(0,0,0,0.1);
                border-radius: 15px;
                background: white;
                overflow: hidden;
                text-align: center;
            }
            .content_mail > div{
                padding: 10px;
            }
            .btn_confirm > button{
                border: none;
                padding: 10px 15px;
                
                border-radius: 10px;
                box-shadow: 0 1px 15px rgba(0,0,0,0.1);
                background: #4f46e5;
                color: white;
                
                cursor: pointer;
                font-size: 1.3rem
            }
        </style>
        `
    }
}

module.exports = formatPostRegisterVeterinario;