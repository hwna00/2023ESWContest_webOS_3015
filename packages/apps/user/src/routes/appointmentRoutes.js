import Appointment from '../views/Appointment';
import AppointmentList from '../views/Appointment/AppointmentList';
import AppointmentHistory from '../views/AppointmentHistory';
import AppointmentHistoryDetail from '../views/AppointmentHistory/AppointmentHistoryDetail';

const appointmentRoutes = [
  {
    path: 'appointment',
    element: <Appointment />,
  },
  {
    path: 'appointment/doctors',
    element: <AppointmentList />,
  },
  {
    path: 'appointment/hospitals',
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
