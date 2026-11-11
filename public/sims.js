// Peta simulasi: SIMS[mapel][kelas][indeks topik] = fungsi (el) -> pembersih
import { MAT } from './d-mat.js';
import { IPA } from './d-ipa.js';
import { IPS, INDO, ING } from './d-lang.js';

export var SIMS = { mat: MAT, ipa: IPA, ips: IPS, indo: INDO, ing: ING };

export function simFor(subj, grade, idx) {
  var s = SIMS[subj] && SIMS[subj][grade];
  return s && s[idx] ? s[idx] : null;
}
