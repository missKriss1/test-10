import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectNews, selectNewsFetch } from './newsSlice.ts';
import { useEffect } from 'react';
import { fetchAllNews } from './newsThunk.ts';
import Spinner from '../../../components/Spinner.tsx';
import { Box, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import NewsItem from '../../components/newsComponents/NewsItem.tsx';

const News = () => {
  const dispatch = useAppDispatch();
  const newsItem = useAppSelector(selectNews);
  const newsFetch = useAppSelector(selectNewsFetch);

  useEffect(() => {
    dispatch(fetchAllNews());
  }, [dispatch]);

  return (
    <div>
      {newsFetch ? (
        <Spinner />
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4" component="h1">
              Posts
            </Typography>
            <NavLink to="/add-new-news" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">
                Add new post
              </Button>
            </NavLink>
          </Box>

          <div>
            {newsItem.length > 0 ? (
              newsItem.map((n) => (
                <NewsItem
                  key={n.id}
                  id={n.id}
                  title={n.title}
                  image={n.image}
                  date={n.date}
                />
              ))
            ) : (
              <Typography variant="h6" component="h2">
                No posts available
              </Typography>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default News;
