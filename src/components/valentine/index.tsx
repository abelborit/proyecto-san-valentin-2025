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
  { id: 2, text: "¡Atrévete, confía en mí!", gif: respuesta_no_1 },
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

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const Valentine = () => {
  const [step, setStep] = useState(0);
  const [noIndex, setNoIndex] = useState(0);

  // Estados para la escala de los botones Sí y No.
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);

  // Constantes para ajustar el incremento y decremento
  const YES_SCALE_INCREMENT = 0.06; // Incrementa un 6%
  const NO_SCALE_DECREMENT = 0.1; // Disminuye un 10%
  const MAX_YES_SCALE = 1.65; // Límite máximo para el botón Sí
  const MIN_NO_SCALE = 0.25; // Límite mínimo para el botón No

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200 text-center relative overflow-hidden px-4">
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
          <motion.div
            key="title"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col gap-6 w-full h-full justify-center items-center relative"
          >
            <div className="text-7xl font-bold text-red-600 drop-shadow-lg text-center font-script">
              Feliz
            </div>

            <div className="text-6xl font-bold text-red-600 drop-shadow-lg text-center font-script">
              San Valentín
            </div>
          </motion.div>
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
              className="w-52 h-52 my-3 object-contain"
            />
            <p className="text-2xl text-gray-700 font-bold text-center h-[60px] font-cursive1 italic">
              {noMessages[noIndex].text}
            </p>
            <div className="flex flex-col sm:flex-row mt-5 gap-4">
              {/* Botón Sí: se escala según el estado yesScale */}
              <button
                style={{ transform: `scale(${yesScale})` }}
                className="w-[180px] py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 font-cursive1 italic transition-transform duration-200"
                onClick={() => setStep(3)}
              >
                Sí
              </button>

              {/* Botón No (mensajes cíclicos): se escala según el estado noScale */}
              <button
                style={{ transform: `scale(${noScale})` }}
                className="w-[180px] py-3 bg-red-400 text-white font-bold rounded-lg shadow-lg hover:bg-red-600 font-cursive1 italic transition-transform duration-200"
                onClick={() => {
                  setNoIndex((prev) => (prev + 1) % noMessages.length);
                  // Incrementa la escala del botón Sí, pero sin exceder el máximo.
                  setYesScale((prev) =>
                    Math.min(prev + YES_SCALE_INCREMENT, MAX_YES_SCALE)
                  );
                  // Disminuye la escala del botón No, pero sin bajar del mínimo.
                  setNoScale((prev) =>
                    Math.max(prev - NO_SCALE_DECREMENT, MIN_NO_SCALE)
                  );
                }}
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
              <h2 className="text-5xl font-bold text-red-600 font-cursive tracking-[0.075rem] px-2">
                ¡Sabía que dirías que sí!
              </h2>
              <p className="text-2xl text-gray-700 font-bold italic mt-4 font-cursive1">
                ¡Te amo, mi niña!
              </p>
              <img
                src={respuesta_si}
                alt="Gatos enamorados felices"
                className="w-64 h-64 -mt-[30px]"
              />
              <p className="text-lg text-gray-700 font-bold font-script tracking-wider">
                VSCM - AEBG
              </p>
              <p className="text-sm text-gray-700 font-bold font-script mt-[1px]">
                14 - 02 - 2025
              </p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};
