// CARGA AUTOMÁTICA DEL HTML DEL CHATBOT
document.addEventListener('DOMContentLoaded', function() {
    const chatbotHTML = `
        <div class="chat-button" id="chatButton">
            <img src="../imagenes/Iconos/chat.png" alt="Chat" style="width: 30px; height: 30px;">
        </div>

        <div class="chat-container" id="chatContainer">
            <div class="chat-header">
                <div>
                    <h3>Galerías Ámbar</h3>
                    <p>En línea • Responde en minutos</p>
                </div>
                <div class="close-btn" id="closeBtn">×</div>
            </div>

            <div class="chat-messages" id="chatMessages">
                <!-- Los mensajes se cargan desde JS (historial o bienvenida) -->
            </div>

            <div class="quick-suggestions" id="suggestions">
                <button class="suggestion-btn" data-text="Horarios">Horarios</button>
                <button class="suggestion-btn" data-text="Tiendas">Tiendas</button>
                <button class="suggestion-btn" data-text="Estacionamiento">Parking</button>
                <button class="suggestion-btn" data-text="Eventos">Eventos</button>
                <button class="suggestion-btn" data-text="Ubicación">Ubicación</button>
                <button class="suggestion-btn" data-text="Contacto">Contacto</button>
                <button class="suggestion-btn" data-text="Servicios">Servicios</button>
            </div>

            <div class="chat-input">
                <input type="text" id="userInput" placeholder="Escribe tu mensaje...">
                <button class="send-btn" id="sendBtn">
                    <img src="../imagenes/Iconos/send.png" alt="Enviar" style="width: 20px; height: 20px;">
                </button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    inicializarChatbot();
});

function inicializarChatbot() {
    const chatButton = document.getElementById('chatButton');
    const chatContainer = document.getElementById('chatContainer');
    const closeBtn = document.getElementById('closeBtn');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const suggestions = document.getElementById('suggestions');

    // CLAVES PARA LOCALSTORAGE
    const STORAGE_KEY_MESSAGES = 'ambar_chat_messages';
    const STORAGE_KEY_OPEN = 'ambar_chat_open';

    // Historial en memoria
    let chatHistory = [];

    // BASE DE DATOS DE LOCALES
    const locales = [
        {
            nombre: "Nahue",
            categoria: "gastronomía",
            nivel: 2,
            descripcion: "Chocolatería artesanal con productos premium",
            url: "https://jujureggio.github.io/TPO_ChocolateriaNahue_Reggio_1170449/",
            keywords: ["chocolate", "dulce", "artesanal", "chocolates", "chocolateria", "café"]
        },
        {
            nombre: "NovaPC",
            categoria: "tecnología",
            nivel: 1,
            descripcion: "Equipos de computación y accesorios tecnológicos",
            url: "https://milej03.github.io/Janiot_NovaPC/",
            keywords: ["computadora", "pc", "gaming", "tecnologia", "componentes", "hardware"]
        },
        {
            nombre: "Morfeo",
            categoria: "hogar",
            nivel: 1,
            descripcion: "Muebles y decoración para el hogar",
            url: "https://orxone.github.io/MiLocal-SosaBarone-2025",
            keywords: ["muebles", "decoracion", "hogar", "casa", "deco"]
        },
        {
            nombre: "Aether",
            categoria: "hogar",
            nivel: 2,
            descripcion: "Artículos de decoración y diseño interior",
            url: "https://micasuarez915.github.io/TPO_Desarrollo_Web_UADE/",
            keywords: ["decoracion", "diseño", "hogar", "interior", "deco"]
        },
        {
            nombre: "Havanna",
            categoria: "gastronomía",
            nivel: 2,
            descripcion: "Alfajores y productos de confitería tradicional argentina",
            url: "https://www.havanna.com.ar/",
            keywords: ["alfajor", "dulce", "café", "confiteria", "tradicional"]
        },
        {
            nombre: "Landmark",
            categoria: "hogar",
            nivel: 2,
            descripcion: "Muebles y decoración de alta calidad",
            url: "https://www.tiendaslandmark.com.ar/",
            keywords: ["muebles", "decoracion", "hogar", "calidad"]
        },
        {
            nombre: "Nike",
            categoria: "indumentaria",
            nivel: 2,
            descripcion: "Ropa y calzado deportivo de primera línea",
            url: "https://www.nike.com.ar/",
            keywords: ["deportes", "zapatillas", "ropa", "deportiva", "running", "gym"]
        },
        {
            nombre: "Starbucks",
            categoria: "gastronomía",
            nivel: 2,
            descripcion: "Cafetería con variedad de bebidas y snacks",
            url: "https://www.starbucks.com.ar/",
            keywords: ["café", "cafeteria", "bebidas", "frappuccino", "coffee"]
        },
        {
            nombre: "Logitech",
            categoria: "tecnología",
            nivel: 2,
            descripcion: "Accesorios y periféricos para computadoras",
            url: "https://www.logitechg.com/",
            keywords: ["mouse", "teclado", "auriculares", "webcam", "gaming", "perifericos"]
        },
        {
            nombre: "Adidas",
            categoria: "indumentaria",
            nivel: 2,
            descripcion: "Ropa y calzado deportivo para toda la familia",
            url: "https://www.adidas.com.ar/",
            keywords: ["deportes", "zapatillas", "ropa", "deportiva", "futbol", "running"]
        },
        {
            nombre: "Samsung",
            categoria: "tecnología",
            nivel: 2,
            descripcion: "Smartphones, tablets y electrónica de consumo",
            url: "https://empresas.samsung.com.ar/",
            keywords: ["celular", "telefono", "tablet", "tv", "electronica", "smartphone"]
        },
        {
            nombre: "Zara",
            categoria: "indumentaria",
            nivel: 2,
            descripcion: "Moda contemporánea para hombre, mujer y niños",
            url: "https://www.zara.com/",
            keywords: ["ropa", "moda", "vestimenta", "fashion", "estilo"]
        },
        {
            nombre: "Ray-Ban",
            categoria: "accesorios",
            nivel: 2,
            descripcion: "Lentes de sol y accesorios de moda",
            url: "https://www.ray-ban.com/",
            keywords: ["lentes", "anteojos", "sol", "gafas", "sunglasses"]
        },
        {
            nombre: "Pandora",
            categoria: "accesorios",
            nivel: 2,
            descripcion: "Joyería y accesorios personalizables",
            url: "https://www.pandoraoficial.com.ar/",
            keywords: ["joyas", "joyeria", "pulseras", "anillos", "collares", "accesorios"]
        }
    ];

    // SISTEMA DE CONTEXTO
    let contexto = {
        estado: 'inicial', // inicial, buscando, preguntando, despidiendose, finalizado
        ultimaTienda: null,
        ultimaCategoria: null,
        esperandoRespuesta: false,
        tipoRespuestaEsperada: null,
        intentosBusqueda: 0,
        conversacionFinalizada: false
    };

    // INFORMACIÓN BASE
    const infoBase = {
        horarios: {
            texto: '🕐 <strong>Horarios del Centro Comercial:</strong><br><br>' +
                   'Lunes a Sábado: 09:00 - 22:00 <br>' +
                   'Domingos y Feriados: 10:00 - 21:00 <br><br>' +
                   '<em>Algunos locales pueden tener horarios especiales</em>',
            preguntaSeguimiento: '¿Te gustaría saber el horario de algún local específico?'
        },
        estacionamiento: {
            texto: '🚗 <strong>Información de Estacionamiento:</strong><br><br>' +
                   '• 3,000 espacios disponibles<br>' +
                   '• Primeras 2 horas: <strong>GRATIS</strong><br>' +
                   '• Tarifa adicional: $2500 por hora<br>' +
                   '• Estacionamiento preferencial disponible<br>' +
                   '• Acceso por Calle Soler y Calle Guise',
            preguntaSeguimiento: '¿Necesitas indicaciones para llegar al estacionamiento?'
        },
        eventos: {
            texto: '🎉 <strong>Eventos Próximos:</strong><br><br>' +
                   '• <strong>25 de Noviembre 19hs:</strong> Muestra de Arte Contemporáneo<br>' +
                   '• <strong>03 de Diciembre todo el día:</strong> Festival Gastronómico "Sabores del Mundo"<br>' +
                   '• <strong>15 de Diciembre 15hs:</strong> Taller de Arte para Niños: Pintura Creativa<br><br>' +
                   '<em>¡No te los pierdas!</em>',
            preguntaSeguimiento: '¿Te gustaría más detalles sobre algún evento?'
        },
        ubicacion: {
            texto: '📍 <strong>Ubicación:</strong><br><br>' +
                   'Soler 3700<br>' +
                   'CABA, Buenos Aires<br><br>' +
                   '🚇 Subte: Estación Agüero (5 min a pie)<br>' +
                   '🚌 Colectivos: Líneas 10, 25, 40, 55',
            preguntaSeguimiento: '¿Quieres verlo en un mapa?'
        },
        contacto: {
            texto: '📞 <strong>Contacto:</strong><br><br>' +
                   '• Teléfono: (123)456–7890<br>' +
                   '• Email: info@galeamber.com<br>' +
                   '• WhatsApp: (555) 987-6543<br>' +
                   '• Atención: Lunes a Sábado 10:00 - 20:00',
            preguntaSeguimiento: null
        },
        servicios: {
            texto: '🛎️ <strong>Servicios Disponibles:</strong><br><br>' +
                   '• WiFi gratuito en todo el centro<br>' +
                   '• Carritos y sillas para bebés<br>' +
                   '• Sillas de ruedas<br>' +
                   '• Cajeros automáticos<br>' +
                   '• Área de lactancia<br>' +
                   '• Punto de información',
            preguntaSeguimiento: '¿Necesitas ubicar alguno de estos servicios?'
        }
    };

    // ---------- FUNCIONES DE BÚSQUEDA ----------

    function normalizarTexto(texto) {
        return texto.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    function buscarLocal(termino) {
        const terminoNormalizado = normalizarTexto(termino);
        const resultados = [];

        locales.forEach(local => {
            let puntuacion = 0;
            const nombreNormalizado = normalizarTexto(local.nombre);
            const categoriaNormalizada = normalizarTexto(local.categoria);

            if (nombreNormalizado === terminoNormalizado) {
                puntuacion += 100;
            } else if (nombreNormalizado.includes(terminoNormalizado)) {
                puntuacion += 80;
            } else if (terminoNormalizado.includes(nombreNormalizado)) {
                puntuacion += 70;
            }

            if (categoriaNormalizada === terminoNormalizado || 
                terminoNormalizado.includes(categoriaNormalizada)) {
                puntuacion += 40;
            }

            local.keywords.forEach(keyword => {
                const keywordNormalizada = normalizarTexto(keyword);
                if (terminoNormalizado.includes(keywordNormalizada) || 
                    keywordNormalizada.includes(terminoNormalizado)) {
                    puntuacion += 20;
                }
            });

            if (puntuacion > 0) {
                resultados.push({ local, puntuacion });
            }
        });

        resultados.sort((a, b) => b.puntuacion - a.puntuacion);
        return resultados.map(r => r.local);
    }

    function listarPorCategoria(categoria) {
        const categoriaNormalizada = normalizarTexto(categoria);
        
        const mapeoCategoria = {
            'comida': 'gastronomía',
            'gastronomia': 'gastronomía',
            'restaurant': 'gastronomía',
            'comer': 'gastronomía',
            'cafe': 'gastronomía',
            'ropa': 'indumentaria',
            'vestimenta': 'indumentaria',
            'moda': 'indumentaria',
            'tecnologia': 'tecnología',
            'tech': 'tecnología',
            'electronica': 'tecnología',
            'deco': 'hogar',
            'decoracion': 'hogar',
            'muebles': 'hogar'
        };

        const categoriaReal = mapeoCategoria[categoriaNormalizada] || categoriaNormalizada;
        return locales.filter(l => normalizarTexto(l.categoria) === categoriaReal);
    }

    function formatearLocal(local, incluirLink = true) {
        let info = `🏬 <strong>${local.nombre}</strong><br>` +
                   `📍 Nivel ${local.nivel}<br>` +
                   `📂 Categoría: ${local.categoria}<br>` +
                   `ℹ️ ${local.descripcion}`;
        
        if (incluirLink) {
            info += `<br><br><a href="${local.url}" target="_blank" style="color: #815B5B; text-decoration: underline;">🌐 Visitar sitio web</a>`;
        }
        
        return info;
    }

    // ---------- DETECCIÓN DE INTENCIONES ----------

    function detectarIntencion(mensaje) {
        const msg = normalizarTexto(mensaje);

        const patrones = {
            saludo: /\b(hola|buenos dias|buenas|hey|hi|saludos|que tal|holi)\b/,
            despedida: /\b(adios|chau|chao|hasta luego|bye|nos vemos|gracias por todo|ya me voy)\b/,
            agradecimiento: /\b(gracias|grax|thanks|thx|te agradezco)\b/,
            afirmacion: /\b(si|sí|see|sep|claro|ok|vale|dale|por favor|exacto|correcto|eso|si por favor)\b/,
            negacion: /\b(no|nop|nope|no gracias|na|para nada|no no|nada|ninguno|ninguna)\b/,
            busquedaLocal: /(busco|quiero|donde esta|donde hay|necesito|me interesa|estoy buscando)/,
            listadoCategoria: /(que|qué|cuales|cuáles|cuantos|cuántos|todos los|lista|mostrar|ver).*(tienda|local|negocio)/,
            horarios: /(horario|hora|abre|abren|cierra|cierran|cuando abre|cuando cierra|abierto|abiertos)/,
            ubicacion: /(donde|dónde|ubicacion|ubicación|como llego|cómo llego|direccion|dirección|mapa)/,
            ayuda: /(ayuda|help|que puedes|qué puedes|que ofreces|qué ofreces|opciones|menu|menú)/
        };

        for (let [intencion, patron] of Object.entries(patrones)) {
            if (patron.test(msg)) {
                return intencion;
            }
        }
        return 'desconocido';
    }

    // ---------- LÓGICA PRINCIPAL DE RESPUESTA ----------

    function getBotResponse(userMessage) {
        const mensaje = userMessage.trim();
        const intencion = detectarIntencion(mensaje);

        // Si la conversación está finalizada
        if (contexto.conversacionFinalizada) {
            if (intencion === 'saludo') {
                contexto.conversacionFinalizada = false;
                contexto.estado = 'inicial';
                contexto.intentosBusqueda = 0;
                return '¡Hola de nuevo! 😊 Volvemos a empezar. ¿En qué puedo ayudarte ahora?';
            }
            return 'La conversación anterior ya fue cerrada 😊<br>' +
                   'Si querés empezar otra, saludame con un "hola" o hacé una nueva pregunta.';
        }

        // Manejo de respuestas en contexto (sí/no)
        if (contexto.esperandoRespuesta) {
            if (intencion === 'negacion') {
                contexto.esperandoRespuesta = false;
                contexto.tipoRespuestaEsperada = null;
                contexto.estado = 'finalizado';
                contexto.conversacionFinalizada = true;
                contexto.intentosBusqueda = 0;
                return '¡Perfecto! 😊 Que tengas un excelente día. ¡Volvé cuando quieras!';
            }
            
            if (intencion === 'afirmacion') {
                contexto.intentosBusqueda = 0;
                return manejarRespuestaAfirmativa();
            }
        }

        // Saludos
        if (intencion === 'saludo') {
            contexto.estado = 'inicial';
            contexto.intentosBusqueda = 0;
            return '¡Hola! 😊 Bienvenido/a a Galerías Ámbar. Puedo ayudarte con:<br><br>' +
                   '• Buscar locales específicos<br>' +
                   '• Información sobre horarios<br>' +
                   '• Estacionamiento y servicios<br>' +
                   '• Eventos y promociones<br><br>' +
                   '¿Qué necesitás?';
        }

        // Despedidas
        if (intencion === 'despedida') {
            contexto.estado = 'despidiendose';
            contexto.conversacionFinalizada = true;
            contexto.esperandoRespuesta = false;
            contexto.tipoRespuestaEsperada = null;
            contexto.intentosBusqueda = 0;
            return '¡Hasta pronto! 👋 Fue un placer ayudarte. Que tengas un excelente día.';
        }

        // Agradecimientos
        if (intencion === 'agradecimiento') {
            contexto.estado = 'inicial';
            contexto.esperandoRespuesta = true;
            contexto.tipoRespuestaEsperada = 'ayuda_adicional';
            contexto.intentosBusqueda = 0;
            return '¡De nada! 😊 Estoy acá para ayudarte.<br><br>¿Hay algo más en lo que pueda asistirte?';
        }

        // Búsqueda de locales
        const resultados = buscarLocal(mensaje);
        if (resultados.length > 0) {
            contexto.estado = 'buscando';
            contexto.intentosBusqueda = 0;
            
            if (resultados.length === 1) {
                const local = resultados[0];
                contexto.ultimaTienda = local;
                contexto.esperandoRespuesta = true;
                contexto.tipoRespuestaEsperada = 'mas_info_local';
                
                return formatearLocal(local) + 
                       '<br><br>¿Necesitás direcciones o más información sobre este local?';
            } else if (resultados.length <= 5) {
                let respuesta = '¡Encontré estos locales que podrían interesarte! 🔍<br><br>';
                resultados.forEach((local, index) => {
                    respuesta += `${index + 1}. <strong>${local.nombre}</strong> - Nivel ${local.nivel} (${local.categoria})<br>`;
                });
                respuesta += '<br>¿Sobre cuál te gustaría saber más? Escribí el nombre.';
                contexto.esperandoRespuesta = false;
                return respuesta;
            }
        }

        // Categorías (ropa, tecnología, etc.)
        const categorias = listarPorCategoria(mensaje);
        if (categorias.length > 0) {
            contexto.estado = 'buscando';
            contexto.ultimaCategoria = categorias[0].categoria;
            contexto.intentosBusqueda = 0;
            
            let respuesta = `Locales de <strong>${categorias[0].categoria}</strong>:<br><br>`;
            categorias.forEach((local, index) => {
                respuesta += `${index + 1}. <strong>${local.nombre}</strong> - Nivel ${local.nivel}<br>`;
            });
            respuesta += '<br>¿Te gustaría información detallada de alguno?';
            contexto.esperandoRespuesta = false;
            return respuesta;
        }

        // Información base (horarios, estacionamiento, etc.)
        const msgNormalizado = normalizarTexto(mensaje);
        for (let [clave, info] of Object.entries(infoBase)) {
            if (msgNormalizado.includes(clave)) {
                let respuesta = info.texto;
                contexto.intentosBusqueda = 0;
                if (info.preguntaSeguimiento) {
                    respuesta += '<br><br>' + info.preguntaSeguimiento;
                    contexto.esperandoRespuesta = true;
                    contexto.tipoRespuestaEsperada = clave;
                }
                return respuesta;
            }
        }

        // Listado general de tiendas
        if (mensaje.match(/(tienda|tiendas|local|locales|negocio|negocios|hay|tienen|que tienen|qué tienen)/i)) {
            contexto.intentosBusqueda = 0;
            return '🏬 <strong>Categorías disponibles:</strong><br><br>' +
                   '• Gastronomía (cafeterías y dulces)<br>' +
                   '• Tecnología (computación y electrónica)<br>' +
                   '• Indumentaria (ropa y deportes)<br>' +
                   '• Hogar (muebles y decoración)<br>' +
                   '• Accesorios (joyería y lentes)<br><br>' +
                   '¿Qué categoría te interesa o buscás algún local específico?';
        }

        // Respuesta por defecto
        contexto.intentosBusqueda++;
        
        if (contexto.intentosBusqueda === 1) {
            return 'Hmm, no estoy segura de entender. 🤔<br><br>' +
                   'Puedo ayudarte a:<br>' +
                   '• Buscar un local específico (ej: "Nike", "Starbucks")<br>' +
                   '• Ver locales por categoría (ej: "tecnología", "ropa")<br>' +
                   '• Información de horarios y servicios<br><br>' +
                   '¿Qué estás buscando?';
        } else {
            return 'Disculpame, pero no logro entender qué necesitás. 😅<br><br>' +
                   'Probá con algo como:<br>' +
                   '• "Busco una cafetería"<br>' +
                   '• "¿Dónde está Nike?"<br>' +
                   '• "Locales de tecnología"<br>' +
                   '• "Horarios del centro comercial"';
        }
    }

    // ---------- RESPUESTAS AFIRMATIVAS ----------

    function manejarRespuestaAfirmativa() {
        contexto.esperandoRespuesta = false;
        contexto.intentosBusqueda = 0;
        
        if (contexto.tipoRespuestaEsperada === 'mas_info_local' && contexto.ultimaTienda) {
            const local = contexto.ultimaTienda;
            contexto.ultimaTienda = null;
            contexto.tipoRespuestaEsperada = null;
            contexto.esperandoRespuesta = true;
            contexto.tipoRespuestaEsperada = 'ayuda_adicional';
            
            return `📍 <strong>Cómo llegar a ${local.nombre}:</strong><br><br>` +
                   `1. Dirigite al Nivel ${local.nivel}<br>` +
                   `2. Buscá la sección de ${local.categoria}<br>` +
                   `3. También podés consultar los directorios interactivos en cada piso<br><br>` +
                   `¿Necesitás ayuda con algo más?`;
        }
        
        if (contexto.tipoRespuestaEsperada === 'estacionamiento') {
            contexto.tipoRespuestaEsperada = null;
            contexto.esperandoRespuesta = true;
            contexto.tipoRespuestaEsperada = 'ayuda_adicional';
            
            return '🚗 <strong>Indicaciones al Estacionamiento:</strong><br><br>' +
                   '• <strong>Entrada Principal:</strong> Soler (señalización azul)<br>' +
                   '• <strong>Entrada Secundaria:</strong> Calle Bulnes (señalización verde)<br>' +
                   '• Una vez dentro, seguí las señales amarillas<br>' +
                   '• Espacios preferenciales cerca de los ascensores<br><br>' +
                   '¿Hay algo más en lo que pueda ayudarte?';
        }

        if (contexto.tipoRespuestaEsperada === 'ubicacion') {
            contexto.tipoRespuestaEsperada = null;
            contexto.esperandoRespuesta = true;
            contexto.tipoRespuestaEsperada = 'ayuda_adicional';
            
            return '🚗 <strong>Cómo llegar:</strong><br><br>' +
                   '• Dirigete a nuestra sección: <strong>Ubicación</strong><br>' +
                   '• Haz click en <strong>"Cómo llegar"</strong><br>' +
                   '• Usá las indicaciones de Google Maps para llegar fácilmente<br><br>' +
                   '¿Hay algo más en lo que pueda ayudarte?';
        }
        
        if (contexto.tipoRespuestaEsperada === 'eventos') {
            contexto.tipoRespuestaEsperada = null;
            contexto.esperandoRespuesta = true;
            contexto.tipoRespuestaEsperada = 'ayuda_adicional';
            
            return '🎉 <strong>Más información sobre eventos:</strong><br><br>' +
                   '• Consultá nuestra sección entretenimientos<br>' +
                   '• Ingresá a nuestra web > Menú > Entretenimientos<br>' +
                   '• Seguinos en redes sociales para actualizaciones<br><br>' +
                   '¿Te puedo ayudar con algo más?';
        }
        
        if (contexto.tipoRespuestaEsperada === 'servicios') {
            contexto.tipoRespuestaEsperada = null;
            contexto.esperandoRespuesta = true;
            contexto.tipoRespuestaEsperada = 'ayuda_adicional';
            
            return 'Todos nuestros servicios están señalizados con íconos verdes. También podés:<br><br>' +
                   '• Consultar los mapas interactivos en cada piso<br>' +
                   '• Preguntar en el punto de información (Nivel 1)<br>' +
                   '• Descargar nuestro mapa digital<br><br>' +
                   '¿Necesitás algo más?';
        }

        if (contexto.tipoRespuestaEsperada === 'ayuda_adicional') {
            contexto.tipoRespuestaEsperada = null;
            return '¡Claro! 😊 Contame, ¿sobre qué te gustaría saber? Puedo ayudarte con locales, horarios, servicios y más.';
        }
        
        contexto.tipoRespuestaEsperada = null;
        return '¡Perfecto! ¿En qué más puedo ayudarte?';
    }

    // ---------- UI: MENSAJES Y TYPING ----------

    function addMessage(content, type, save = true) {
        if (!content) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (save) {
            chatHistory.push({ content, type });
            localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(chatHistory));
        }
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot';
        typingDiv.innerHTML = `
            <div class="typing-indicator active">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        typingDiv.id = 'typingIndicator';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }

    // ---------- CARGAR HISTORIAL ----------

    function cargarHistorial() {
        const stored = localStorage.getItem(STORAGE_KEY_MESSAGES);
        const isOpen = localStorage.getItem(STORAGE_KEY_OPEN);

        if (stored) {
            try {
                chatHistory = JSON.parse(stored);
                chatHistory.forEach(msg => {
                    addMessage(msg.content, msg.type, false); // no volver a guardar
                });
            } catch (e) {
                chatHistory = [];
            }
        } else {
            // Sin historial → mensaje de bienvenida
            addMessage('¡Hola! 👋 Bienvenido/a a Galerías Ámbar. ¿En qué puedo ayudarte hoy?', 'bot');
        }

        if (isOpen === 'true') {
            chatContainer.classList.add('active');
        }
    }

    // ---------- ENVÍO DE MENSAJES ----------

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        addMessage(message, 'user');
        userInput.value = '';
        
        showTypingIndicator();
        
        setTimeout(() => {
            removeTypingIndicator();
            const botResponse = getBotResponse(message);
            if (botResponse) {
                addMessage(botResponse, 'bot');
            }
        }, 600 + Math.random() * 600);
    }

    // ---------- EVENT LISTENERS ----------

    // Abrir/cerrar con la burbuja
    chatButton.addEventListener('click', () => {
        const isActive = chatContainer.classList.toggle('active');
        localStorage.setItem(STORAGE_KEY_OPEN, isActive ? 'true' : 'false');
    });

    // Cerrar con la X
    closeBtn.addEventListener('click', () => {
        chatContainer.classList.remove('active');
        localStorage.setItem(STORAGE_KEY_OPEN, 'false');
    });

    sendBtn.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    suggestions.addEventListener('click', (e) => {
        if (e.target.classList.contains('suggestion-btn')) {
            userInput.value = e.target.getAttribute('data-text');
            sendMessage();
        }
    });

    // Cargar historial al iniciar
    cargarHistorial();
}
