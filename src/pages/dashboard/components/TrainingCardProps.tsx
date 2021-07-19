import type { TierCardProps } from './TrainingTierCard';

const cardProps: TierCardProps[] = [
  {
    bodyText:
      'Purpose: Familiarize yourself with your CharaChorder layout. \nGoal: Surpass average human writing speed (13 words per minute)',
    tierTitle: 'Alphabetic',
    orientationLink: 'https://www.youtube.com/watch?v=Vq8NJd3J0Ag',
    minWPM: 0,
    maxWPM: 13,
    scenario: 'ALPHABET',
  },
  {
    bodyText:
      'Purpose: Practice common letter groupings. \nGoal: Surpass average speed of "Hunt & Peck" typists (27 words per minute)',
    tierTitle: 'Amalgamate',
    orientationLink: 'https://www.youtube.com/watch?v=IiuEYX7QFjA',
    minWPM: 13,
    maxWPM: 27,
    scenario: 'TRIGRAM',
    previousScenario: 'ALPHABET',
  },
  {
    bodyText:
      'Purpose: Practice common words in character entry mode. \nGoal: Surpass average speed of a keyboard user (40 words per minute)',
    tierTitle: 'Lexical',
    orientationLink: 'https://www.youtube.com/watch?v=HvVvxD48cDI',
    minWPM: 27,
    maxWPM: 40,
    scenario: 'LEXICAL',
    previousScenario: 'TRIGRAM',
  },
  {
    bodyText:
      'The average speed of a professional typist is 75 words per minute. \nProgress past 75 words per minute to move onto the next training section.',
    tierTitle: 'Chording',
    orientationLink: 'https://www.youtube.com/watch?v=-4QuWCf8PKM',
    minWPM: 40,
    maxWPM: 75,
    scenario: 'CHORDING',
    previousScenario: 'LEXICAL',
  },
  {
    bodyText:
      'The average speed of human speech is 120 words per minute. \nProgress past 120 words per minute to move onto the next training section.',
    tierTitle: 'Lexicographic',
    minWPM: 75,
    maxWPM: 120,
    scenario: 'LEXICOGRAPHIC',
    previousScenario: 'CHORDING',
  },
  {
    bodyText:
      'The speed of USCRA Federal Certified Realtime Reporter is 200 words per minute. \nProgress past 200 words per minute to move onto the next training section.',
    tierTitle: 'SuperSonic',
    minWPM: 120,
    maxWPM: 200,
    scenario: 'SUPERSONIC',
    previousScenario: 'LEXICOGRAPHIC',
  },
];

export default cardProps;
