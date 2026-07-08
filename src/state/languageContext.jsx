import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
    es: {
        // Header
        navInicio: "Inicio",
        navMenu: "Menú",
        navUnamonos: "Unámonos",
        navCarrito: "Carrito",
        btnIngresar: "Ingresar",
        btnSalir: "Salir",
        hola: "Hola",
        // Home
        homeWelcome: "¡Bienvenido a Alocados!",
        homeSubWelcome: "Tu sabor favorito, al instante. Delivery y recojo en tienda disponibles.",
        homeCraving: "¿De qué te antojaste hoy?",
        homeVideoTitle: "Conócenos y Únete a la causa",
        homeVideoDesc: "En Alocados Restobar, no solo nos dedicamos a ofrecerte los mejores platillos, sino que también te invitamos a ser parte de un movimiento solidario. Nos hemos unido a Unámonos, una organización dedicada a apoyar a niños con discapacidades, para que cada compra que realices sea una contribución directa a una causa noble. Durante el Mes de la Solidaridad, diversas empresas del sector de la alimentación están tomando la iniciativa de apoyar a los pequeños con habilidades especiales, trabajando para crear un futuro mejor para ellos. Por cada plato que compres, se donará S/. 1 a Unámonos, una asociación comprometida con el desarrollo y bienestar de la comunidad en Arequipa. ¡Juntos, podemos hacer una gran diferencia. Únete a nosotros y sé parte de este hermoso cambio!",
        // About (Unámonos)
        aboutDesc: "En Alocados Restobar nos enorgullece apoyar la causa de la Asociación Unámonos, una organización dedicada a mejorar la vida de los niños y jóvenes con discapacidad. Gracias a esta colaboración, cada plato que compras en nuestro local contribuye a un futuro mejor para estos niños. ¡Tu ayuda es invaluable!",
        aboutQueEs: "¿Qué es Unámonos?",
        aboutQueEsDesc: "Unámonos es una organización sin fines de lucro dedicada a mejorar la calidad de vida de los niños y jóvenes con discapacidad en nuestra comunidad. Su misión es brindarles herramientas educativas, emocionales y físicas para mejorar su integración social y su bienestar general. Trabajamos con dedicación para crear un espacio donde los niños puedan desarrollarse plenamente, aprender nuevas habilidades y alcanzar su maximo potencial.",
        aboutTalleres: "Nuestros Talleres",
        aboutTalleresDesc: "Los talleres son una parte fundamental del desarrollo de los niños y jóvenes en Unámonos. Cada taller está diseñado para fomentar habilidades prácticas, educativas y sociales, brindando a los participantes las herramientas necesarias para crecer y prosperar en la sociedad.",
        aboutLogros: "Logros",
        aboutLogrosDesc: "Los logros alcanzados por los niños y jóvenes con discapacidad en Unámonos son verdaderamente inspiradores. Gracias al apoyo de todos, estos logros continúan impulsando el desarrollo y la integración de los pequeños en la sociedad.",
        aboutInspiran: "Números que nos inspiran",
        aboutStat1: "Niños beneficiados",
        aboutStat2: "Talleres impartidos",
        aboutStat3: "Familias apoyadas",
        aboutStat4: "Años de experiencia",
        // Menu - Categorías
        "Salchipapas Combinadas": "Salchipapas Combinadas",
        "Alitas": "Alitas",
        "Posha Broaster": "Posha Broaster",
        "Hamburguesas": "Hamburguesas",
        "Combos Alocados": "Combos Alocados",
        "Bebidas": "Bebidas",
        "Cocteles": "Cocteles",
        "Menú Completo": "Menú Completo",
        "Agregar al carrito": "Agregar al carrito",
        // Carrito
        tituloCarrito: "Tu Orden - Alocados Restobar",
        carroVacio: "Tu carrito está vacío en este momento.",
        verMenu: "Ver el Menú Completo",
        productosSel: "Productos Seleccionados",
        cantidad: "Cantidad",
        totalNeto: "Total Neto",
        pagoExpress: "Pago Express vía Yape",
        escaneaQr: "Escanea el Código QR para pagar",
        transferenciaDirecta: "O realiza la transferencia directa al número telefónico:",
        titular: "Titular: Alocados Restobar S.A.C.",
        numOperacion: "Número de Operación / Código de Referencia",
        btnConfirmarPedido: "Confirmar y Finalizar Pedido",
        validandoTransaccion: "Verificando Código...",
        errorLogin: "⚠️ Acceso Denegado: Debes iniciar sesión o vincular tu cuenta de Gmail en la barra superior para proceder al pago.",
        errorOtp: "⚠️ Por favor, ingresa un número de operación válido de Yape (mínimo 6 dígitos).",
        procesandoPago: "Validando comprobante y registrando transacción atómica...",
        pagoExitoso: "¡Pago enviado con éxito! Pedido registrado. Tu recibo digital se está enviando a tu correo electrónico.",
        // Login Modal
        loginIniciar: "Iniciar Sesión",
        loginCrear: "Crear Cuenta",
        loginCorreo: "Correo Electrónico",
        loginClave: "Contraseña",
        loginBtnIngresar: "Ingresar",
        loginBtnRegistrar: "Registrar Cuenta",
        loginO: "O",
        loginGoogle: "Continuar con Google",
        loginNoCuenta: "¿No tienes cuenta? Regístrate aquí",
        loginSiCuenta: "¿Ya tienes cuenta? Inicia sesión",
        verificarTitulo: "Verifica tu Cuenta",
        verificarSub: "Ingresar el código que enviamos a",
        verificarCodigo: "Código de 6 dígitos",
        verificarBtn: "Confirmar Código",
        // Mis Pedidos
        navMisPedidos: "Mis Pedidos",
        historialTitulo: "Mi Historial de Pedidos",
        historialVacio: "Aún no has realizado ninguna compra.",
        historialCargando: "Cargando tu historial...",
        historialErrorLogin: "Debes iniciar sesión para ver tus pedidos.",
        historialErrorServer: "No pudimos conectar con el servidor.",
        pedidoId: "Pedido",
        fecha: "Fecha",
        estado: "Estado",
        procesado: "PROCESADO",
        total: "Total",
        soporte: "Soporte"
    },
    en: {
        // Header
        navInicio: "Home",
        navMenu: "Menu",
        navUnamonos: "Join Us",
        navCarrito: "Cart",
        btnIngresar: "Sign In",
        btnSalir: "Logout",
        hola: "Hello",
        // Home
        homeWelcome: "Welcome to Alocados!",
        homeSubWelcome: "Your favorite flavor, instantly. Delivery and pickup available.",
        homeCraving: "What are you craving today?",
        homeVideoTitle: "Get to know us and Join the cause",
        homeVideoDesc: "At Alocados Restobar, we are not only dedicated to offering you the best dishes, but we also invite you to be part of a solidarity movement. We have joined Unámonos, an organization dedicated to supporting children with disabilities, so that every purchase you make is a direct contribution to a noble cause. During Solidarity Month, various companies in the food sector are taking the initiative to support little ones with special abilities, working to create a better future for them. For every dish you buy, S/. 1 will be donated to Unámonos, an association committed to the development and well-being of the community in Arequipa. Together, we can make a big difference. Join us and be part of this beautiful change!",
        // About (Unámonos)
        aboutDesc: "At Alocados Restobar, we are proud to support the cause of the Unámonos Association, an organization dedicated to improving the lives of children and young people with disabilities. Thanks to this collaboration, every dish you buy at our establishment contributes to a better future for these children. Your help is invaluable!",
        aboutQueEs: "What is Unámonos?",
        aboutQueEsDesc: "Unámonos is a non-profit organization dedicated to improving the quality of life of children and young people with disabilities in our community. Its mission is to provide them with educational, emotional, and physical tools to improve their social integration and general well-being. We work with dedication to create a space where children can fully develop, learn new skills, and reach their full potential.",
        aboutTalleres: "Our Workshops",
        aboutTalleresDesc: "Workshops are a fundamental part of the development of children and young people at Unámonos. Each workshop is designed to promote practical, educational, and social skills, providing participants with the tools necessary to grow and prosper in society.",
        aboutLogros: "Achievements",
        aboutLogrosDesc: "The achievements reached by children and young people with disabilities at Unámonos are truly inspiring. Thanks to everyone's support, these achievements continue to drive the development and integration of the little ones into society.",
        aboutInspiran: "Numbers that inspire us",
        aboutStat1: "Children benefited",
        aboutStat2: "Workshops taught",
        aboutStat3: "Families supported",
        aboutStat4: "Years of experience",
        // Menu - Categorías
        "Salchipapas Combinadas": "Combined Salchipapas",
        "Alitas": "Chicken Wings",
        "Posha Broaster": "Broaster Chicken",
        "Hamburguesas": "Burgers",
        "Combos Alocados": "Alocados Combos",
        "Bebidas": "Drinks",
        "Cocteles": "Cocktails",
        "Menú Completo": "Full Menu",
        "Agregar al carrito": "Add to cart",
        // Carrito
        tituloCarrito: "Your Order - Alocados Restobar",
        carroVacio: "Your cart is currently empty.",
        verMenu: "View Full Menu",
        productosSel: "Selected Products",
        cantidad: "Quantity",
        totalNeto: "Net Total",
        pagoExpress: "Express Payment via Yape",
        escaneaQr: "Scan the QR Code to pay",
        transferenciaDirecta: "Or make a direct transfer to the phone number:",
        titular: "Holder: Alocados Restobar S.A.C.",
        numOperacion: "Operation Number / Reference Code",
        btnConfirmarPedido: "Confirm and Finish Order",
        validandoTransaccion: "Verifying Code...",
        errorLogin: "⚠️ Access Denied: You must log in or link your Gmail account in the top bar to proceed with the payment.",
        errorOtp: "⚠️ Please enter a valid Yape operation number (minimum 6 digits).",
        procesandoPago: "Validating receipt and registering atomic transaction...",
        pagoExitoso: "Payment sent successfully! Order registered. Your digital receipt is being sent to your email.",
        // Login Modal
        loginIniciar: "Login",
        loginCrear: "Create Account",
        loginCorreo: "Email Address",
        loginClave: "Password",
        loginBtnIngresar: "Sign In",
        loginBtnRegistrar: "Register Account",
        loginO: "OR",
        loginGoogle: "Continue with Google",
        loginNoCuenta: "Don't have an account? Register here",
        loginSiCuenta: "Already have an account? Log in",
        verificarTitulo: "Verify your Account",
        verificarSub: "Enter the code we sent to",
        verificarCodigo: "6-digit Code",
        verificarBtn: "Confirm Code",
        // Mis Pedidos
        navMisPedidos: "My Orders",
        historialTitulo: "My Order History",
        historialVacio: "You haven't made any purchases yet.",
        historialCargando: "Loading your history...",
        historialErrorLogin: "You must log in to see your orders.",
        historialErrorServer: "Could not connect to the server.",
        pedidoId: "Order",
        fecha: "Date",
        estado: "Status",
        procesado: "PROCESSED",
        total: "Total",
        soporte: "Support"
    },
    pt: {
        // Header
        navInicio: "Início",
        navMenu: "Cardápio",
        navUnamonos: "Junte-se",
        navCarrito: "Carrinho",
        btnIngresar: "Entrar",
        btnSalir: "Sair",
        hola: "Olá",
        // Home
        homeWelcome: "Bem-vindo ao Alocados!",
        homeSubWelcome: "Seu sabor favorito, instantaneamente. Delivery e retirada disponíveis.",
        homeCraving: "O que você está com vontade de comer hoje?",
        homeVideoTitle: "Conheça-nos e Junte-se à causa",
        homeVideoDesc: "No Alocados Restobar, não apenas nos dedicamos a oferecer os melhores pratos, mas também convidamos você a fazer parte de un movimento solidário. Nos juntamos à Unámonos, uma organização dedicada a apoiar crianças com deficiências, para que cada compra realizada seja uma contribuição direta a uma causa nobre. Durante o Mês da Solidariedade, várias empresas do setor de alimentação estão tomando a iniciativa de apoiar os pequenos com habilidades especiais, trabalhando para criar um futuro melhor para eles. Para cada prato que você comprar, S/. 1 será doado à Unámonos, uma associação comprometida com o desenvolvimento e bem-estar da comunidade em Arequipa. Juntos, podemos fazer uma grande diferença. Junte-se a nós e faça parte desta linda mudança!",
        // About (Unámonos)
        aboutDesc: "No Alocados Restobar nos orgulhamos de apoiar a causa da Associação Unámonos, uma organização dedicada a melhorar a vida de crianças e jovens com deficiência. Graças a esta colaboração, cada prato que você compra em nosso local contribui para um futuro melhor para estas crianças. Sua ajuda é valiosa!",
        aboutQueEs: "O que é o Unámonos?",
        aboutQueEsDesc: "O Unámonos é uma organização sem fins lucrativos dedicada a melhorar a qualidade de vida das crianças e jovens com deficiência em nossa comunidade. Sua missão é fornecer-lhes ferramentas educacionais, emocionais e físicas para melhorar sua integração social e bem-estar geral. Trabalhamos com dedicação para criar um espaço onde as crianças possam se desenvolver plenamente, aprender novas habilidades e alcançar seu potencial máximo.",
        aboutTalleres: "Nossas Oficinas",
        aboutTalleresDesc: "As oficinas são uma parte fundamental do desenvolvimento das crianças e jovens no Unámonos. Cada oficina é projetada para promover habilidades práticas, educacionais e sociais, proporcionando aos participantes as ferramentas necessárias para crescer e prosperar na sociedade.",
        aboutLogros: "Conquistas",
        aboutLogrosDesc: "As conquistas alcançadas pelas crianças e jovens com deficiência no Unámonos são verdadeiramente inspiradoras. Graças ao apoio de todos, essas conquistas continuam impulsionando o desenvolvimento e a integração dos pequenos na sociedade.",
        aboutInspiran: "Números que nos inspiram",
        aboutStat1: "Crianças beneficiadas",
        aboutStat2: "Oficinas ministradas",
        aboutStat3: "Famílias apoiadas",
        aboutStat4: "Anos de experiência",
        // Menu - Categorías
        "Salchipapas Combinadas": "Salchipapas Combinadas",
        "Alitas": "Asas de Frango",
        "Posha Broaster": "Frango Broaster",
        "Hamburguesas": "Hambúrgueres",
        "Combos Alocados": "Combos Alocados",
        "Bebidas": "Bebidas",
        "Cocteles": "Coquetéis",
        "Menú Completo": "Cardápio Completo",
        "Agregar al carrito": "Adicionar ao carrinho",
        // Carrito
        tituloCarrito: "Seu Pedido - Alocados Restobar",
        carroVacio: "Seu carrinho está vazio no momento.",
        verMenu: "Ver Cardápio Completo",
        productosSel: "Produtos Selecionados",
        cantidad: "Quantidade",
        totalNeto: "Total Líquido",
        pagoExpress: "Pagamento Expresso via Yape",
        escaneaQr: "Escaneie o Código QR para pagar",
        transferenciaDirecta: "Ou faça uma transferência direta para o número de telefone:",
        titular: "Titular: Alocados Restobar S.A.C.",
        numOperacion: "Número de Operação / Código de Referência",
        btnConfirmarPedido: "Confirmar e Finalizar Pedido",
        validandoTransaccion: "Verificando Código...",
        errorLogin: "⚠️ Acesso Negado: Você deve fazer o login ou vincular sua conta do Gmail na barra superior para prosseguir com o pagamento.",
        errorOtp: "⚠️ Por favor, insira um número de operação Yape válido (mínimo 6 dígitos).",
        procesandoPago: "Validando o recibo e registrando a transação atômica...",
        pagoExitoso: "Pagamento enviado com sucesso! Pedido registrado. Seu recibo digital está sendo enviado para o seu e-mail.",
        // Login Modal
        loginIniciar: "Iniciar Sessão",
        loginCrear: "Criar Conta",
        loginCorreo: "E-mail",
        loginClave: "Senha",
        loginBtnIngresar: "Entrar",
        loginBtnRegistrar: "Registrar Conta",
        loginO: "OU",
        loginGoogle: "Continuar com o Google",
        loginNoCuenta: "Não tem uma conta? Registre-se aqui",
        loginSiCuenta: "Já tem uma conta? Faça o login",
        verificarTitulo: "Verifique sua Conta",
        verificarSub: "Insira o código que enviamos para",
        verificarCodigo: "Código de 6 dígitos",
        verificarBtn: "Confirmar Código",
        // Mis Pedidos
        navMisPedidos: "Meus Pedidos",
        historialTitulo: "Meu Histórico de Pedidos",
        historialVacio: "Você ainda não fez nenhuma compra.",
        historialCargando: "Carregando seu histórico...",
        historialErrorLogin: "Você deve entrar para ver seus pedidos.",
        historialErrorServer: "Não foi possível conectar ao servidor.",
        pedidoId: "Pedido",
        fecha: "Data",
        estado: "Status",
        procesado: "PROCESSADO",
        total: "Total",
        soporte: "Suporte"
    }
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('alocados_lang') || 'es';
    });

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('alocados_lang', lang);
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}