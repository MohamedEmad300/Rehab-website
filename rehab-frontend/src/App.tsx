import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Consultants from './pages/Consultants';
import GroupTherapy from './pages/GroupTherapy';
import DayCare from './pages/DayCare';
import Events from './pages/Events';
import Contact from './pages/Contact';
import BookConsultant from './pages/booking/BookConsultant';
import BookGroupTherapy from './pages/booking/BookGroupTherapy';
import BookDayCare from './pages/booking/BookDayCare';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="consultants" element={<Consultants />} />
          <Route path="group-therapy" element={<GroupTherapy />} />
          <Route path="daycare" element={<DayCare />} />
          <Route path="events" element={<Events />} />
          <Route path="contact" element={<Contact />} />
          <Route path="booking/consultant" element={<BookConsultant />} />
          <Route path="booking/group-therapy" element={<BookGroupTherapy />} />
          <Route path="booking/daycare" element={<BookDayCare />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
