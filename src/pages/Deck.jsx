import React, { memo } from 'react';
import DeckContent from '../components/deck/DeckContent';
import { DECK_CONTENT } from '../components/deck/deckCopy';
import { useSEO } from '../hooks/useSEO';

const Deck = memo(() => {
  useSEO(DECK_CONTENT.seo);

  return <DeckContent />;
});

Deck.displayName = 'Deck';

export default Deck;
