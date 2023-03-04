export interface Nomination {
  "id": number,
  "date": string,
  "author-first": string,
  "author-last": string,
  "author-email": string,
  "nom-first": string,
  "nom-last": string,
  "nom-yob": string,
  "nom-contrib-area": string,
  "nom-contrib-area-description": string | undefined,
  "nom-contrib-area-sub": string,
  "nom-q1": string,
  "nom-q1-description": string,
  "nom-q2": string,
  "nom-q2-description": string,
  "nom-q3": string,
  "nom-q3-description": string,
  "nom-deceased": string,
  "nom-alive-achieve": string | undefined,
  "nom-deceased-achieve": string | undefined,
  "nom-additional-info-description": string
}