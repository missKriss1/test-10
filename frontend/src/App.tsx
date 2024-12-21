import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/AppTollBar.tsx';
import { Route, Routes } from 'react-router-dom';
import News from './features/container/news/News.tsx';
import NewNews from './features/container/news/NewNews.tsx';
import FullNews from './features/container/news/FullNews.tsx';

const App = () => {
  return (
    <>
      <CssBaseline/>
      <header>
        <Container>
          <AppToolbar/>
        </Container>
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<News/>} />
            <Route path="add-new-news" element={<NewNews/>} />
            <Route path="/news/:id" element={<FullNews />} />
          </Routes>
        </Container>
      </main>
    </>
    );
};

export default App
