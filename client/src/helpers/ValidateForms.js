const ValidateForms = {
    email: email => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email),
    password: password => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?./&])[A-Za-z\d@/.$!%*#?&]{8,}$/g.test(password),
}

const messageValidationsError = {
    email: 'El email no es válido, Ej: test@test.com',
    password:'La contraseña no es válida, Ej: passW23#',
}

export {
    ValidateForms,
    messageValidationsError
}