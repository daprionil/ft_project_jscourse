function formatResetPasswordVeterinario({
    email,
    name,
    tokenResetPassword
}) {

    return {
        from: 'APV - Administrador de Pacientes de Veterinaria',
        to: email,
        subject: 'Reestablece la contraseña de tu cuenta en APV',
        text: 'Reestablece la contraseña de tu cuenta en APV',
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
                    <p><span class="title_span">${name}</span> has olvidado la contraseña de cuenta</p>
                </div>
                <div>
                    <p>Reestablece tu contraseña</p>
                    <p>¡ solo debes de <b>ir al enlace</b> y pensar una contraseña que puedas recordar !</p>
                </div>
                <div>
                    <a
                        href="${process.env.CLIENT_URL_DEPLOY}/resetpassword/${tokenResetPassword}"
                        rel="noopener noreferrer"
                        class="btn_confirm"
                        style="font-weight: bold"
                    >
                        <button>Cambiar Contraseña</button>
                    </a>
                </div>
                <div>
                    <p>Si no hiciste la solicitud, Ignora este mensaje</p>
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

module.exports = formatResetPasswordVeterinario;