import { FC } from 'react';
import Title from '../../shared/title/title';
import s from './CoverLetterExplanations.module.scss';

interface CoverLetterExplanationsProps {
  cantAccess : boolean
}

export const CoverLetterExplanations : FC<CoverLetterExplanationsProps> = ({cantAccess}) => (
  <div className={s.explanations}>
    <span>
      <Title title="Génerez votre lettre facilement !"/>
      <p>Entrez vos informations, générez une lettre de motivation, modifiez-la et enregistrez la pour la réutiliser à votre guise ! </p>
      <p>Attention : Vous n'avez le droit qu'a 3 essais par mois !</p>
    </span>
    {cantAccess && <p className={s.cantAccess}>Vous devez vous abonner pour accéder à cette fonctionnalité.</p>}
  </div>
)