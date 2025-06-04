// src/pages/Home.tsx
const Home = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#1b2427] dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1">
            {/* Título principal */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <h1 className="text-white tracking-light text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold leading-tight w-full sm:w-auto">
                Documentación FaceFeel AI
              </h1>
            </div>

            {/* Navegación por pestañas */}
            <div className="pb-3 overflow-x-auto">
              <nav className="flex border-b border-[#366348] px-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8 min-w-max">
                {[
                  "Introducción",
                  "Funcionalidades",
                  "API",
                  "Ejemplos",
                  "Preguntas Frecuentes",
                ].map((tab) => (
                  <a
                    key={tab}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-3 sm:pb-[13px] sm:pt-4 ${
                      tab === "Introducción"
                        ? "border-b-[#38e07b] text-white"
                        : "border-b-transparent text-[#96c5a9]"
                    }`}
                    href={`#${tab.toLowerCase().replace(" ", "-")}`}
                  >
                    <p className="text-xs sm:text-sm font-bold leading-normal tracking-[0.015em] hover:text-[#edfff4] transition-colors duration-300 whitespace-nowrap">
                      {tab}
                    </p>
                  </a>
                ))}
              </nav>
            </div>

            {/* Contenido de documentación */}
            <div className="p-4 space-y-8 text-white">
              {/* Sección de Introducción */}
              <section id="introducción" className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-[#38e07b]">
                  Introducción
                </h2>
                <p className="text-sm sm:text-base">
                  Bienvenido a la documentación del sistema de Análisis de
                  Emociones en Tiempo Real. Esta herramienta utiliza un modelo de inteligencia artificial basado en ResNet50v2 para detectar y analizar emociones
                  humanas a través de imágenes o flujo de video en tiempo real.
                </p>

                <div className="bg-[#2a363b] p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">
                    Características principales:
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                    <li>Detección de emociones en tiempo real</li>
                    <li>Análisis de imágenes estáticas</li>
                    <li>Historial de análisis</li>
                    <li>API para integraciones</li>
                  </ul>
                </div>
              </section>

              {/* Sección de Funcionalidades */}
              <section id="funcionalidades" className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-[#38e07b]">
                  Funcionalidades
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    {
                      title: "Cámara en Vivo",
                      description:
                        "Permite el análisis de emociones en tiempo real utilizando la cámara de tu dispositivo.",
                    },
                    {
                      title: "Subir Imagen",
                      description:
                        "Analiza emociones en imágenes estáticas que subas desde tu dispositivo.",
                    },
                    {
                      title: "Historial",
                      description:
                        "Revisa todos tus análisis previos organizados por fecha y resultados.",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="bg-[#2a363b] p-3 sm:p-4 rounded-lg"
                    >
                      <h3 className="font-semibold mb-2 text-sm sm:text-base">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Sección de API */}
              <section id="api" className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-[#38e07b]">
                  Documentación de la API
                </h2>
                <p className="text-sm sm:text-base">
                  Nuestra API RESTful permite integrar el análisis de emociones
                  en tus propias aplicaciones.
                </p>

                <div className="bg-[#1e272e] p-3 sm:p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs sm:text-sm text-[#38e07b]">
                    {`POST /api/v1/detection/process-image
Content-Type: application/json
Authorization: Bearer your_api_key

{
  "image": "base64_encoded_image",
  "options": {
    "detailed": true
  }
}`}
                  </pre>
                </div>
              </section>

              {/* Sección de Ejemplos */}
              <section id="ejemplos" className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-[#38e07b]">
                  Ejemplos
                </h2>

                <div className="aspect-video rounded-lg overflow-hidden bg-[#2a363b] flex items-center justify-center">
                  <button className="flex items-center justify-center rounded-full size-12 sm:size-16 bg-black/40 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path>
                    </svg>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-[#96c5a9]">
                  Haz clic en el botón de reproducción para ver un tutorial en
                  video sobre cómo usar la plataforma.
                </p>
              </section>

              {/* Sección de Preguntas Frecuentes */}
              <section id="preguntas-frecuentes" className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-[#38e07b]">
                  Preguntas Frecuentes
                </h2>

                <div className="space-y-3">
                  {[
                    {
                      question: "¿Qué emociones puede detectar el sistema?",
                      answer:
                        "Actualmente detectamos 7 emociones básicas: felicidad, tristeza, enojo, sorpresa, miedo, disgusto y neutral.",
                    },
                    {
                      question: "¿Cómo se procesan los datos de imagen?",
                      answer:
                        "Todas las imágenes se procesan en el servidor de pruebas y se visualizan tu dispositivo. Actualmente el sistema no cuenta con almacenamiento de datos en nuestros servidores.",
                    },
                  ].map((faq, index) => (
                    <div key={index} className="bg-[#2a363b] p-3 sm:p-4 rounded-lg">
                      <h3 className="font-semibold text-[#38e07b] text-sm sm:text-base">
                        {faq.question}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;