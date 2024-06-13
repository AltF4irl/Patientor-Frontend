import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useParams } from 'react-router-dom';
import patients from '../../services/patients';
import { Patient } from '../../types';
import { useState } from 'react';

const IndividualPatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id;
  if (id) {
    patients.getOne(id).then((res) => setPatient(res));
  }
  if (patient) {
    return (
      <div>
        <h2>
          {patient.name}{' '}
          {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
      </div>
    );
  } else {
    return <p>User you are looking for does not exist</p>;
  }
};

export default IndividualPatientPage;
