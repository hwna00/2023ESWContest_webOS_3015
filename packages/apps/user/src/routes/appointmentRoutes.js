import AppointmentHistoryDetail from '../views/AppointmentHistory/AppointmentHistoryDetail';
import AppointmentHistory from '../views/AppointmentHistory';
import AppointmentList from '../views/Appointment/AppointmentList';
import Appointment from '../views/Appointment';

const appointmentRoutes = [
  {
    path: 'appointment',
    element: <Appointment />,
  },
  {
    path: 'appointment/:category',
    element: <AppointmentList />,
  },
  {
    path: 'appointment-history',
    element: <AppointmentHistory />,
  },
  {
    path: 'appointment-history/:id',
    element: <AppointmentHistoryDetail />,
  },
];

export default appointmentRoutes;
