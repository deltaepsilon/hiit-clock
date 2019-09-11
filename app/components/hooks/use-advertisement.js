import { useEffect, useState } from 'react';
import effects from '../../effects';
import { DEFAULT_ADVERTISEMENT } from '../../effects/get-advertisement';

export default function useAdvertisement() {
  const [advertisement, setAdvertisement] = useState(DEFAULT_ADVERTISEMENT);

  useEffect(() => {
    const advertisement = effects.getAdvertisement();

    setAdvertisement(advertisement);
  }, []);

  return advertisement;
}
