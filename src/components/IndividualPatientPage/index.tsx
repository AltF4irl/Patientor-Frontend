import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useParams } from 'react-router-dom';
import patients from '../../services/patients';
import { Patient } from '../../types';
import { useEffect, useState } from 'react';

const IndividualPatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id;
  useEffect(() => {
    if (id) {
      patients.getOne(id).then((res) => setPatient(res));
    }
  }, [id]);
  
  if (patient) {
    return (
      <div>
        <h2>
          {patient.name}{' '}
          {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        
        <h3>Entries</h3>
        {patient.entries.map(entry => {
          return (
            <div key={entry.id}>
              <p>{entry.date} {entry.description}</p>
              <ul>
                {entry.diagnosisCodes?.map(diagnosisCode => <li key={diagnosisCode}>{diagnosisCode}</li>)}
              </ul>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <p>User you are looking for does not exist</p>;
  }
};

export default IndividualPatientPage;
