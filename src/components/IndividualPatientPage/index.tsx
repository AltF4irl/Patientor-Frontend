import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useParams } from 'react-router-dom';
import patients from '../../services/patients';
import { NewEntry, Patient } from '../../types';
import { useEffect, useState } from 'react';
import DiagnosisEntry from './DiagnosisEntry';
import EntryInfo from './EntryInfo';
import EntryForm from './EntryForm';
import './entryForm.css';

const IndividualPatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id;
  useEffect(() => {
    if (id) {
      patients.getOne(id).then((res) => setPatient(res));
    }
  }, [id]);

  const addEntry = async (id: string, entry: NewEntry) => {
      const p = await patients.createEntry(id, entry);
      setPatient(p);
  };

  if (patient) {
    return (
      <div>
        <h2>
          {patient.name}{' '}
          {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>

        <EntryForm
          addEntry={addEntry}
          patientId={id as string}
        />

        <h3>Entries</h3>
        {patient.entries.map((entry) => {
          return (
            <div
              key={entry.id}
              style={{
                border: 'solid 1px black',
                borderRadius: '5px',
                marginBottom: '5px',
                paddingLeft: '5px',
              }}
            >
              <EntryInfo entry={entry} />
            </div>
          );
        })}

        {patient.entries.map((entry) => {
          return (
            <ul key={entry.id}>
              {entry.diagnosisCodes?.map((diagnosisCode) => (
                <li key={diagnosisCode}>
                  <DiagnosisEntry code={diagnosisCode} />
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    );
  } else {
    return <p>User you are looking for does not exist</p>;
  }
};

export default IndividualPatientPage;
