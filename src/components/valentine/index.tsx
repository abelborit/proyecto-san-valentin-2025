import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  pregunta_inicial,
  respuesta_si,
  respuesta_no_1,
  respuesta_no_2,
  respuesta_no_3,
  respuesta_no_4,
  respuesta_no_5,
  respuesta_no_6,
} from "../../assets/gif";

const noMessages = [
  { id: 1, text: "¡Vamos, será bonito!", gif: pregunta_inicial },
  { id: 2, text: "¡Atrévete, confía en mi!", gif: respuesta_no_1 },
  { id: 3, text: "¡Un sí a la vida y a la risa!", gif: respuesta_no_2 },
  { id: 4, text: "¡Un poco de amor nunca sobra!", gif: respuesta_no_3 },
  { id: 5, text: "¡No te quedes con la duda!", gif: respuesta_no_4 },
  { id: 6, text: "¡Eres la chispa de mi corazón!", gif: respuesta_no_5 },
  { id: 7, text: "¡Por un mejor futuro juntos!", gif: respuesta_no_6 },
];

const confettiColors = [
  "#FFC700",
  "#FF0000",
  "#2E3192",
  "#41BBC7",
  "#00FF00",
  "#FF69B4",
];

export const Valentine = () => {
  const [step, setStep] = useState(0);
  const [noIndex, setNoIndex] = useState(0);

  useEffect(() => {
    const showTitle = setTimeout(() => setStep(1), 1000); // Mostrar título tras 1s
    const showInteraction = setTimeout(() => setStep(2), 4000); // Luego de 3s más

    return () => {
      clearTimeout(showTitle);
      clearTimeout(showInteraction);
    };
  }, []);

  // Función auxiliar para generar un número aleatorio entre min y max
  const randomBetween = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200 text-center relative overflow-hidden">
      {/* Fondo: Corazones flotantes */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        {[...Array(120)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-500 text-3xl"
            initial={{
              x: Math.random() * window.innerWidth - 50,
              y: Math.random() * window.innerHeight - 50,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * window.innerWidth - 50,
              y: Math.random() * window.innerHeight - 50,
              opacity: 1,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Contenedor principal */}
      <div className="z-50 w-[100vw] h-[100vh] flex justify-center items-center relative">
        {/* Título con fade-in y fade-out */}
        {step === 1 && (
          <div className="flex flex-col gap-6 w-full h-full justify-center items-center relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="text-7xl md:text-4xl lg:text-7xl font-bold text-red-600 drop-shadow-lg text-center font-script"
            >
              Feliz
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="text-6xl md:text-4xl lg:text-7xl font-bold text-red-600 drop-shadow-lg text-center font-script"
            >
              San Valentín
            </motion.div>
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="text-4xl md:text-4xl lg:text-7xl font-bold text-red-600 drop-shadow-lg text-center"
            >
              🌹🌹🌹
            </motion.div> */}
          </div>
        )}

        {/* Pregunta y botones */}
        {step >= 2 && step !== 3 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl font-bold text-red-600 font-cursive tracking-[0.1rem] leading-[3.85rem]">
              ¿Quieres ser mi San Valentín?
            </h1>
            <img
              src={noMessages[noIndex].gif}
              alt="Gatos"
              className="w-60 h-60 my-3 object-contain"
            />
            <p className="text-2xl text-gray-700 font-bold italic text-center h-[60px] font-cursive1">
              {noMessages[noIndex].text}
            </p>
            <div className="flex flex-col sm:flex-row mt-5 gap-4">
              {/* Botón Sí */}
              <button
                className="w-[180px] py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 font-cursive1"
                onClick={() => setStep(3)}
              >
                Sí
              </button>
              {/* Botón No (mensajes cíclicos) */}
              <button
                className="w-[180px] py-3 bg-red-400 text-white font-bold rounded-lg shadow-lg hover:bg-red-600 font-cursive1"
                onClick={() =>
                  setNoIndex((prev) => (prev + 1) % noMessages.length)
                }
              >
                No
              </button>
            </div>
          </motion.div>
        )}

        {/* Respuesta Sí: mensaje de aceptación y confeti */}
        {step === 3 && (
          <>
            {/* Confeti: elementos de confeti cayendo desde arriba */}
            <div className="absolute inset-0 pointer-events-none z-40 opacity-60">
              {[...Array(120)].map((_, i) => {
                // Genera parámetros aleatorios para cada pieza
                const size = randomBetween(8, 15);
                const left = randomBetween(0, 100);
                const duration = randomBetween(2, 3.5);
                const rotateInitial = randomBetween(0, 360);
                const rotateFinal = rotateInitial + randomBetween(90, 360);
                const color =
                  confettiColors[
                    Math.floor(Math.random() * confettiColors.length)
                  ];

                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      width: size,
                      height: size * 1.5,
                      backgroundColor: color,
                      borderRadius: "20%",
                      left: `${left}%`,
                    }}
                    initial={{
                      y: -10,
                      opacity: 0,
                      rotate: rotateInitial,
                    }}
                    animate={{
                      y: window.innerHeight + 50,
                      opacity: [0, 1, 0],
                      rotate: rotateFinal,
                    }}
                    transition={{
                      duration: duration,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                );
              })}
            </div>

            {/* Mensaje de aceptación */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center relative z-50"
            >
              <h2 className="text-5xl font-bold text-red-600 font-cursive tracking-[0.075rem]">
                ¡Sabía que dirías que sí!
              </h2>
              <p className="text-2xl text-gray-700 font-bold italic mt-4 font-cursive1">
                ¡Te amo, mi niña!
              </p>
              <img
                src={respuesta_si}
                alt="Gatos enamorados felices"
                className="w-64 h-64 -mt-[30px] mb-4"
              />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};
