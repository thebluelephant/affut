import ChipInput from 'material-ui-chip-input';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Button from '../../shared/button/button';
import s from './coverLetterForm.module.scss';

interface CoverLetterFormProps {
    generateLetter : (form : {firstname : string | null, lastname : string | null, job : string | null, strenght : string[] | null}) => void
    disabledField : boolean
}

export const CoverLetterForm : NextPage<CoverLetterFormProps> = ({generateLetter, disabledField}) => {
  const [form, setForm] = useState<{firstname : string | null, lastname : string | null, job : string | null, strenght : string[] | null}>({firstname : null, lastname : null, job : null, strenght : null})
  const [isEmpty, setIsEmpty] = useState<boolean>(true)

  useEffect(() => {
    setIsEmpty(Object.values(form).some(e => Boolean(!e)))
  }, [form, isEmpty]);

  const onFormChange = (inputName : string, value : string | string[]) => {
    setForm({...form, [inputName] : value})
  }
  return (
    <>    
      <div className={s.form}>
        <div className={s.form__fields}>
          <p className={s.subtitle}>Vos informations</p>
          <div className={`${s.field}`}>
            <div>             
              <label htmlFor="firstname">Votre prénom</label>
              <input id="firstname" type="text" onChange={(e) => onFormChange('firstname', e.target.value)}/>
            </div>
            <div>   
              <label htmlFor="lastname">Votre nom</label>
              <input id="lastname" type="text" onChange={(e) => onFormChange('lastname', e.target.value)}/>
            </div>
            <div>
              <label htmlFor="job">Votre métier</label>
              <input id="job" type="text" onChange={(e) => onFormChange('job', e.target.value)}/>
            </div>
          </div>
          <div className={s.field}>
            <label htmlFor="strenght">Nommez les points forts que vous souhaiteriez mettre en avant dans votre lettre <span className={`${s['field--italic']}`}>(Appuyez sur Entrée pour valider chaque mot)</span> </label>
            <ChipInput
              onChange={(chips) => onFormChange('strenght', chips)}
              classes={{
                root: s.chipInput,
                chip: s.chip
              }}
            />
          </div>
        </div>
        <div className={s.form__buttons}>
          {disabledField && <p className={s.disabledFields}>Vous ne pouvez plus générer de lettre ce mois ci, rendez-vous dans quelques temps !</p>}
          <Button title="Generer" type={isEmpty || disabledField ? "disabled" : "primary"} onButtonClick={() => generateLetter(form)}  />
        </div>
        
      </div>
    </>
  )



}