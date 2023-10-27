import type { flashCard } from 'src/models/flashCardsModel';
import { useStoreState } from '../../../store/store';

const numberItemsToGenerate = 20;

const generateTrainingData = () => {
  const activeTrainingSet: flashCard[] = [
    {
      image: false,
      question: 'hi',
      answer: 'hi',
      url: '',
      tags: [],
      ebbinghausValue: 0,
      lastReinforcement: new Date(),
    },
    {
      image: false,
      question: 'hello',
      answer: 'hello',
      url: '',
      tags: [],
      ebbinghausValue: 0,
      lastReinforcement: new Date(),
    },
    {
      image: false,
      question: 'chicken',
      answer: 'chicken',
      url: '',
      tags: [],
      ebbinghausValue: 0,
      lastReinforcement: new Date(),
    },
    {
      image: true,
      question: '',
      answer: 'apple',
      url: 'https://t4.ftcdn.net/jpg/00/59/96/75/360_F_59967553_9g2bvhTZf18zCmEVWcKigEoevGzFqXzq.jpg',
      tags: [],
      ebbinghausValue: 0,
      lastReinforcement: new Date(),
    },
  ];

  const generatedData: flashCard[] = [];

  for (let i = 0; i < numberItemsToGenerate; i++) {
    generatedData.push(
      activeTrainingSet[Math.floor(Math.random() * activeTrainingSet.length)],
    );
  }

  return generatedData;
};

export default generateTrainingData;
