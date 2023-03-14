import Title from '../../shared/title/title';
import s from './CoverLetterExplanations.module.scss';


export const CoverLetterExplanations = () => (
  <div className={s.explanations}>
    <Title title="Génerez votre lettre facilement !"/>
    <p>Entrez vos informations, générez une lettre de motivation, modifiez-la et enregistrez la pour la réutiliser à votre guise ! </p>
    <p>Attention : Vous n'avez le droit qu'a 3 essais par mois !</p>
  </div>
)