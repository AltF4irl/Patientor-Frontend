import { useEffect, useState } from 'react';
import diagnosisService from '../../services/diagnosis';
import { Diagnosis } from '../../types';

interface DiagnosisProps {
    code: string
}

const DiagnosisEntry = ({code}: DiagnosisProps) => {
    const [diagnosis, setDiagnosis] = useState<Diagnosis>();

    useEffect(() => {
      diagnosisService.getOne(code).then(diag => setDiagnosis(diag)); 
    }, [code]);

    console.log(diagnosis, "diag");

    return (
      <>{diagnosis?.code} {diagnosis?.name}</>
    );
  };

export default DiagnosisEntry;