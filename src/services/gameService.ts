import { GameRound, GameImage } from "../../types";
import childrenAI from "../images/childrenAI.jpeg";
import childrenREAL from "../images/childrenREAL.jpeg";
import trainAI from "../images/trainAI.jpeg";
import trainREAL from "../images/trainREAL.jpeg";
import dogFAKE from "../images/dogFAKE.jpeg";
import dogREAL from "../images/dogREAL.jpeg";
import snowREAL from "../images/snowREAL.jpeg";
import snowAI from "../images/snowAI.jpeg";
import parachuteAI from "../images/parachuteAI.jpeg";
import parachuteREAL from "../images/parachuteREAL.jpeg";
import droneREAL from "../images/droneREAL.jpeg";
import droneAI from "../images/droneAI.jpeg";


import cherryAI from "../images/cherryAI.jpeg?url";
import cherryREAL from "../images/cherryREAL.jpeg?url";
import dirtbikeAI from "../images/dirtbikeAI.jpeg?url";
import dirtbikeREAL from "../images/dirtbikeREAL.jpeg?url";
import iceballAI from "../images/iceballAI.jpeg?url";
import iceballREAL from "../images/iceballREAL.jpeg?url";
import muffinAI from "../images/muffinAI.jpeg?url";
import muffinREAL from "../images/muffinREAL.jpeg?url";
import smilingREAL from "../images/smilingREAL.jpeg?url";
import smilingAI from "../images/smilingAI.jpeg?url";
import storefrontAI from "../images/storefrontAI.jpeg?url";
import storefrontREAL from "../images/storefrontREAL.jpeg?url";
import urbanAI from "../images/urbanAI.jpeg?url";
import urbanREAL from "../images/urbanREAL.jpeg?url";

const STATIC_DATA = [
  {
    subject: "Children playing",
    images: [
      { url: childrenREAL, type: 'AI' },
      { url: childrenAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "Train station",
    images: [
      { url: trainREAL, type: 'AI' },
      { url: trainAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "Drone view",
    images: [
      { url: droneREAL, type: 'AI' },
      { url: droneAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "Dog portrait",
    images: [
      { url: dogREAL, type: 'AI' },
      { url: dogFAKE, type: 'DESIGN' }
    ]
  },
  {
    subject: "Parachute descent",
    images: [
      { url: parachuteREAL, type: 'AI' },
      { url: parachuteAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "Snowy landscape",
    images: [
      { url: snowREAL, type: 'AI' },
      { url: snowAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "Cherry river",
    images: [
      { url: cherryREAL, type: 'AI' },
      { url: cherryAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "Dirt Bike",
    images: [
      { url: dirtbikeREAL, type: 'AI' },
      { url: dirtbikeAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "iceball",
    images: [
      { url: iceballREAL, type: 'AI' },
      { url: iceballAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "muffin",
    images: [
      { url: muffinREAL, type: 'AI' },
      { url: muffinAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "smiling",
    images: [
      { url: smilingREAL, type: 'AI' },
      { url: smilingAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "Store Front",
    images: [
      { url: storefrontREAL, type: 'AI' },
      { url: storefrontAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "urban tower",
    images: [
      { url: urbanREAL, type: 'AI' },
      { url: urbanAI, type: 'DESIGN' }
    ]
  }

] as const;

/**
 * SHUFFLE HELPER: Fisher-Yates Algorithm
 * Ensures every permutation of the array is equally likely.
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function generateGameRounds(
  onProgress: (progress: number) => void
): Promise<GameRound[]> {
  const rounds: GameRound[] = [];
  
  // LOGIC: Randomize the order of the question set pool
  const randomizedDataPool = shuffleArray([...STATIC_DATA]);
  const totalSteps = randomizedDataPool.length;

  for (let i = 0; i < totalSteps; i++) {
    // Artificial delay for "neural link" loading feel
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const data = randomizedDataPool[i];
    
    const image1: GameImage = {
      id: `round-${i}-img1`,
      url: data.images[0].url,
      type: data.images[0].type as 'DESIGN' | 'AI'
    };

    const image2: GameImage = {
      id: `round-${i}-img2`,
      url: data.images[1].url,
      type: data.images[1].type as 'DESIGN' | 'AI'
    };

    // LOGIC: Randomize image position (Left vs Right)
    const isFirst = Math.random() > 0.5;
    
    rounds.push({
      id: i + 1, // Visual ID for the UI
      subject: data.subject,
      images: isFirst ? [image1, image2] : [image2, image1],
      userChoiceId: null,
      isCorrect: null
    });

    onProgress(((i + 1) / totalSteps) * 100);
  }

  return rounds;
}
