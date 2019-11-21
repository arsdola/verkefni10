/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'favourite_spacephotos';

/**
 * Sækir gögn úr localStorage. Skilað sem lista á forminu:
 * [{ type, mediaUrl, text, title },
 *  { type, mediaUrl, text, title },
 *  ...,
 *  { type, mediaUrl, text, title }]
 *
 * @returns {array} fylki af myndum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  const saved = window.localStorage.getItem(LOCALSTORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    return parsed;
  }
  const noImg = [];
  return noImg;
}

/**
 * Vistaðar myndir með texta.
 *
 * @param {string} type annað hvort image eða video
 * @param {string} mediaUrl URL á myndinni/myndbandinu.
 * @param {string} text texti fyrir myndina/myndbandið.
 * @param {string} title titill fyrir myndina/myndbandið.
 */
export function save(type, mediaUrl, text, title) {
  const saved = window.localStorage.getItem(LOCALSTORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    const newImg = {
      type,
      mediaUrl,
      text,
      title,
    };
    parsed.push(newImg);
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(parsed));
  } else {
    const newImg = [{
      type,
      mediaUrl,
      text,
      title,
    }];
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newImg));
  }
}


/**
 * Hreinsar allar myndir úr localStorage
 */
export function clear() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
