export interface Prestation {
  id_prestation: number;
  nom_prestation: string;
  description_presta: string;
  prix: number;
  id_type: number;
  nom_type: string;
  prestataire: Prestataire;
}

export interface Prestataire {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  note?: number;
  nombreAvis?: number;
}
