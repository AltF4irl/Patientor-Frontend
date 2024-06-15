import { Entry, HealthCheckRating } from '../../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red, yellow, orange } from '@mui/material/colors';

interface EntryInfoProps {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HealthRating = (healthCheckRating: HealthCheckRating) => {
  switch (healthCheckRating) {
    case 3:
      return <FavoriteIcon sx={{ color: red[500] }} />;
    case 2:
      return <FavoriteIcon sx={{ color: orange[500] }} />;
    case 1:
      return <FavoriteIcon sx={{ color: yellow[500] }} />;
    case 0:
      return <FavoriteIcon color="success" />;
  }
};

const EntryInfo = ({ entry }: EntryInfoProps) => {
  switch (entry.type) {
    case 'HealthCheck':
      return (
        <div>
          <p>
            {entry.date} <MedicalServicesIcon />
          </p>
          <p>{entry.description}</p>
          <p>{HealthRating(entry.healthCheckRating)}</p>
          <p>diagnosed by {entry.specialist}</p>
        </div>
      );
    case 'Hospital':
      return (
        <div>
          <p>
            {entry.date} <LocalHospitalIcon />
          </p>
          <p>{entry.description}</p>
          <p>diagnosed by {entry.specialist}</p>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div>
          <p>
            {entry.date} <WorkIcon /> {entry.employerName}
          </p>
          <p>{entry.description}</p>
          <p>diagnosed by {entry.specialist}</p>
        </div>
      );
    default:
      assertNever(entry);
  }
};

export default EntryInfo;
