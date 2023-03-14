import { NextPage } from 'next';
import Button from '../../shared/button/button';
import s from './CoverLetterExport.module.scss';

interface CoverLetterExportProps {
    saveAs : (letterName : string, type : string) => void
    disabledField : boolean
}

export const CoverLetterExport : NextPage<CoverLetterExportProps> = ({saveAs, disabledField}) => {
  const fileType = ['txt', 'doc']

  return (
    <div className={s.export}>
      <p className={s.subtitle}>Enregistrez votre lettre</p>
      <div className={s.export__buttons}>
        {
          fileType.map((type) => {
            return <Button 
              key={type} 
              title={`Exporter en .${type}`} 
              type={disabledField ? "disabled" : "primary"} 
              onButtonClick={() => saveAs(`Lettremotivation`, type)}/>
          })
        }
      </div>             
    </div>

  )



}