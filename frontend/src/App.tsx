import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/AppTollBar.tsx';
import { Route, Routes } from 'react-router-dom';
import News from './features/container/News.tsx';
import NewNews from './features/container/NewNews.tsx';

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
          </Routes>
        </Container>
      </main>
    </>
    );
};

export default App
