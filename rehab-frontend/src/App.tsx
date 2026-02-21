import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import GroupTherapy from './pages/GroupTherapy';
import DayCare from './pages/DayCare';
import Events from './pages/Events';
import Contact from './pages/Contact';
import BookDoctor from './pages/booking/BookDoctor';
import BookGroupTherapy from './pages/booking/BookGroupTherapy';
import BookDayCare from './pages/booking/BookDayCare';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="group-therapy" element={<GroupTherapy />} />
          <Route path="daycare" element={<DayCare />} />
          <Route path="events" element={<Events />} />
          <Route path="contact" element={<Contact />} />
          <Route path="booking/doctor" element={<BookDoctor />} />
          <Route path="booking/group-therapy" element={<BookGroupTherapy />} />
          <Route path="booking/daycare" element={<BookDayCare />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
